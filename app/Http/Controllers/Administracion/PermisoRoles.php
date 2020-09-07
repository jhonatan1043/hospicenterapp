<?php

namespace App\Http\Controllers\Administracion;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class PermisoRoles extends Controller
{
    public function cargarModuloSinAsignar(Request $request){
        $idPuntoServ =  $request->idPunto == 0 ? $request->session()->get('sesionActual.idPuntoServicio') :$request->idPunto;
        $data = DB::select('Exec [Administracion].[spModuloSinAsignar] ' . $request->id . ','
                                                                         . $idPuntoServ);
        return $data;
    }

    public function cargarModuloAsignados(Request $request){
        $idPuntoServ = $request->idPunto == 0  ? $request->session()->get('sesionActual.idPuntoServicio'):$request->idPunto;
        $data = DB::select('Exec [Administracion].[spModuloAsignados] ' . $request->id . ','
                                                                        . $idPuntoServ);
        return $data;
    }

    public function cargarFormularioSinAsignar(Request $request){
        $idPuntoServ =  $request->idPunto == 0 ? $request->session()->get('sesionActual.idPuntoServicio') :$request->idPunto;
        $data = DB::select('Exec [Administracion].[spFormularioSinAsignar] ' . $request->id . ','
                                                                             . $idPuntoServ . ','
                                                                             . $request->idPadre);
        return $data;
    }

    public function cargarFormularioAsignado(Request $request){
        $idPuntoServ =  $request->idPunto == 0 ? $request->session()->get('sesionActual.idPuntoServicio') :$request->idPunto;

        $data = DB::select('Exec [Administracion].[spFormularioAsignado] ' . $request->id . ','
                                                                           . $idPuntoServ. ','
                                                                           . $request->idPadre);

        return $data;
    }

    public function crearPermisosAsignados(Request $request){   
      $idUsuario = $request->session()->get('sesionActual.idTercero');
      $idPuntoServ =  $request->idPuntoServ == 0  ? $request->session()->get('sesionActual.idPuntoServicio') :$request->idPuntoServ;
      if($request->bdraModulo == 0){
      DB::insert('Exec [Administracion].[spModuloAsignadoCrear]' . $request->idRol .","
                                                                 . $idPuntoServ . ","
                                                                 . $request->id . ","
                                                                 . $request->quitar . ","
                                                                 . $idUsuario);
       } else {
        DB::insert('Exec [Administracion].[spFormularioAsignadoCrear]' . $request->idRol .","
                                                                       . $request->id . ","
                                                                       . $request->quitar . ","
                                                                       . $request->idPadre . ","
                                                                       . $idUsuario);                                                           
       }
    }
    public function puntoEmpresaListar(Request $request){
        $data=DB::select("Exec [Administracion].[spPuntoServicioEmpresaListar] " . $request->id );
        return $data;
      }
}
