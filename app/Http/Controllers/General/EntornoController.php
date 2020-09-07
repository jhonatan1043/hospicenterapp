<?php

namespace App\Http\Controllers\General;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Modelos\General\Entorno;

class EntornoController extends Controller
{
   public function index()
   {
      $entorno = Entorno::all()->where('activo',1);
      return $entorno;
   }
   public function consultarEntornos()
   {
      return Entorno::select('idEntorno AS id','descripcion')->where('activo',1)->get();
   }
   public function store(Request $request)
   {
      $idUsuario = $request->session()->get('sesionActual.idTercero');
      $entorno  = new Entorno();
      $entorno->descripcion  = $request->descripcion;
      $entorno->aplicaNeonatal  = $request->aplicaNeonato;
      $entorno->idUsuarioCreacion  = $idUsuario;
      $entorno->save();
   }
   public function update(Request $request)
   {
      $entorno  = Entorno::findOrFail($request->id);
      $entorno->descripcion  = $request->descripcion;
      $entorno->aplicaNeonatal  = $request->aplicaNeonato;
      $entorno->save();
   }
   public function anular(Request $request)
   {
      $entorno  = Entorno::findOrFail($request->id);
      $entorno->activo  = 0;
      $entorno->save();
   }
}
