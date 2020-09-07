<?php

namespace App\Http\Controllers\General;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Modelos\General\EntornoServicioCama;
use DB;

class EntornoServicioCamaController extends Controller
{
    public function index(Request $request)
    {
     return  EntornoServicioCama::find($request->id);
    }

    public function entornoServicioCamaListar(){
     return DB::select('[General].[spEntornoServicioCamaListar]'); 
    }
    public function store(Request $request)
    {
       $idUsuario = $request->session()->get('sesionActual.idTercero');
       $data =  new EntornoServicioCama();
       $data->idCama            = $request->idCama;
       $data->idEntorno         = $request->idEntorno;
       $data->idServicio        = $request->idServicio;
       $data->idPiso            = $request->idPiso;
       $data->idHabitacion      = $request->idHabitacion;
       $data->observacion       = $request->observacion;
       $data->idUsuarioCreacion = $idUsuario;
       $data->save();    
    }
    public function update(Request $request)
    {
        $data =   EntornoServicioCama::findOrFail($request->id);
        $data->idCama  = $request->idCama;
        $data->idEntorno  = $request->idEntorno;
        $data->idServicio  = $request->idServicio;
        $data->idPiso  = $request->idPiso;
        $data->idHabitacion  = $request->idHabitacion;
        $data->observacion  = $request->observacion;
        $data->save();   
    }
    public function anular()
    {
        $data =   EntornoServicioCama::findOrFail($request->id);
        $data->activo  = 0; 
        $data->save();
    }
    public function entornoServicio(Request $request){
        $parametro = [$request->id];
       return DB::select('Exec [General].[spEntornoServicio] ? ',$parametro);
    }
}
