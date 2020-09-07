<?php

namespace App\Http\Controllers\General;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Modelos\General\TipoIdentificacion;
use DB;

class TipoIdentificacionController extends Controller
{
    public function index()
    {
        $tipoIdentificacion = TipoIdentificacion::all()->where('activo',1);
        return $tipoIdentificacion;
    }

    public function listar()
    {
       $data = DB::select('select idTipoIdentificacion
                                  ,descripcion
                                  ,codigoDian
                                  ,codigoRips  from General.tipoIdentificacion where activo = 1'); 
       return $data;
    }   

    public function store(Request $request)
    { 
        $tipoIdentificacion = new TipoIdentificacion();
        $tipoIdentificacion->descripcion = $request->descripcion;
        $tipoIdentificacion->codigoDian  = $request->codigoDian;
        $tipoIdentificacion->codigoRips  = $request->codigoRips;
        $tipoIdentificacion->save();
    }
    public function update(Request $request)
    {
        $tipoIdentificacion =  TipoIdentificacion::findOrFail($request->id);
        $tipoIdentificacion->descripcion = $request->descripcion;
        $tipoIdentificacion->codigoDian  = $request->codigoDian;
        $tipoIdentificacion->codigoRips  = $request->codigoRips;
        $tipoIdentificacion->save();
    }
    public function anular(Request $request)
    {
        $descripcionGeneral = TipoIdentificacion::findOrFail($request->id);
        $descripcionGeneral->activo = 0;
        $descripcionGeneral->save();
    }
}
