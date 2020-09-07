<?php

namespace App\Http\Controllers\HistoriaClinica;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class PacienteListadoController extends Controller
{
public function ingresoPacienteListar(Request $request){
 $buscar = $request->buscar;
 $criterio = $request->criterio;

 if($buscar == ''){
  $datos = DB::table("HistoriaClinica.pacienteIngresoListar(".$request->idEntorno .','. $request->idServicio .")")->paginate(15);
 }
 else{
  $datos = DB::table("HistoriaClinica.pacienteIngresoListar(".$request->idEntorno .','. $request->idServicio .")")->where($criterio,'like','%'. $buscar .'%')->paginate(15);
 }
 return ['pagination'     =>[
           'total'        =>$datos->total(),
           'current_page' =>$datos->currentPage(),
           'per_page'     =>$datos->perPage(),
           'last_page'    =>$datos->lastPage(),
           'from'         =>$datos->firstItem(),
           'to'           =>$datos->lastItem(),
       ],
           'pacienteListar' => $datos
      ];
}

public function ingresoPacienteCargar(Request $request){
  $datos = DB::select('[HistoriaClinica].[spPacienteIngresoCargar] ' . $request->id);
  return $datos;
}

}