<?php

namespace App\Http\Controllers\Administracion;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Modelos\Administracion\PuntoServicio;
use DB;

class PuntoServicioController extends Controller
{
    public function cargarPuntoServicio(Request $request)
    {  
        $parametro = [$request->id]; 
        return DB::select('Exec [Administracion].[spPuntoServicioCargar] ? ', $parametro);
    }

    public function index()
    {
        return $puntoServicio = PuntoServicio::all()->where('activo',1);;
    }

    public function ConsultarTercero()
    {
        return DB::select('[Administracion].[spConsultarTercero]');
    }

    public function store(Request $request)
    {
       $puntoServicio = new PuntoServicio();
       $idUsuario = $request->session()->get('sesionActual.idTercero');
       $puntoServicio->idResponsable=$request->idTercero;
       $puntoServicio->razonSocial= $request->razonSocial;
       $puntoServicio->direccion= $request->direccion;
       $puntoServicio->telefono= $request->telefono;
       $puntoServicio->celular= $request->celular;
       $puntoServicio->email= $request->email;
       $puntoServicio->paginaWeb= $request->paginaWeb;
       $puntoServicio->idDepartamento = $request->idDepartamento;
       $puntoServicio->idMunicipio = $request->idMunicipio;
       $puntoServicio->administrativo= $request->administrativo;
       $puntoServicio->idUsuarioCreacion= $idUsuario;
       $puntoServicio->save();
    }
    public function actualizar(Request $request)
    {
        $puntoServicio = PuntoServicio::findOrFail($request->id);
        $puntoServicio->idResponsable=$request->idTercero;
        $puntoServicio->razonSocial= $request->razonSocial;
        $puntoServicio->direccion= $request->direccion;
        $puntoServicio->telefono= $request->telefono;
        $puntoServicio->celular= $request->celular;
        $puntoServicio->email= $request->email;
        $puntoServicio->paginaWeb= $request->paginaWeb;
        $puntoServicio->idDepartamento = $request->idDepartamento;
        $puntoServicio->idMunicipio = $request->idMunicipio;
        $puntoServicio->administrativo= $request->administrativo;
        $puntoServicio->save();   
    }
    public function anular(Request $request){
        $puntoServicio = PuntoServicio::findOrFail($request->id);
        $puntoServicio->activo = 0;
        $puntoServicio->save();
    }
}
