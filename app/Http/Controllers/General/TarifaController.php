<?php

namespace App\Http\Controllers\General;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Modelos\General\Tarifa;

class TarifaController extends Controller
{
    public function index()
    {
        return Tarifa::all()->where('activo',1);
    }
    
    public function store(Request $request)
    {
        $idUsuario = $request->session()->get('sesionActual.idTercero');   
        $data = new tarifa();
        $data->descripcion = $request->descripcion;
        $data->porcentaje = $request->porcentaje;
        $data->año = $request->año;
        $data->idUsuarioCreacion = $idUsuario;
        $data->save();
    }
    public function update(Request $request)
    { 
        $data = tarifa::findOrFail($request->id);  
        $data->descripcion = $request->descripcion;
        $data->porcentaje = $request->porcentaje;
        $data->año = $request->año;
        $data->save();
    }
    public function anular(Request $request)
    { 
        $data = tarifa::findOrFail($request->id);  
        $data->activo = 1;
        $data->save();
    }
}
