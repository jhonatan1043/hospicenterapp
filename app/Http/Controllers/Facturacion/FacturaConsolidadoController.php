<?php

namespace App\Http\Controllers\Facturacion;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class FacturaConsolidadoController extends Controller
{
   function cargarProcedimientos(Request $request){
     $parametro =[$request->idIngreso];  
     return DB::select("exec HistoriaClinica.spFacturaTiempoRealProcedimientos ?", $parametro);
   }
}
