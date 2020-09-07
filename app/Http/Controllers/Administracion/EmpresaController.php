<?php

namespace App\Http\Controllers\Administracion;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Modelos\Administracion\Empresa;
use DB;

class EmpresaController extends Controller
{
    public function listaEmpresa(){
       
       return $datosEmpresa = Empresa::all();
    }

    public function comboPais(){
       $comboPais = DB::select('Select idPais,descripcion 
                                From General.pais');
       return $comboPais;                         
    }

    public function comboDepartamento(Request $request){
       $comboDepartamento = DB::select('Select idDepartamento,
                                               descripcion
                                        From General.departamento
                                        Where idPais='.$request->idPais);
        return $comboDepartamento;                               
    }

    public function comboMunicipio(Request $request){
        $comboMunicipio = DB::select('Select idMunicipio,
                                             descripcion
                                      From General.municipio
                                      Where idDepartamento='.$request->idDepartamento);
        return $comboMunicipio;                            
    }

    public function cargarResolucion(Request $request){

        $buscar = $request->buscar;
        $nombreCampo = $request->nombreCampo;
      if($buscar==''){
        $resolucion = DB::select('Select idResolucion,
                                         resolucion,
                                         prefijo,
                                         consecutivoInicial,
                                         consecutivoActual,
                                         consecutivoFinal,
                                         fechaExpedicion,
                                         fechaVencimiento
                                  From admin_empresaresolucion
                                  Where activo=1 and idEmpresa=1');
      }else{
        $resolucion = DB::select('Select a.idResolucion,
                                         a.resolucion,
                                         prefijo,
                                         consecutivoInicial,
                                         consecutivoActual,
                                         consecutivoFinal,
                                         fechaExpedicion,
                                         fechaVencimiento
                                         From admin_empresaresolucion as a
                                         Where activo=1 and idEmpresa=1 and a.'.$nombreCampo. ' like'.' '."'%".$buscar."%'");
      }
        
        return $resolucion;                          
    }
}
