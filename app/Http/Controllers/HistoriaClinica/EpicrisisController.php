<?php

namespace App\Http\Controllers\HistoriaClinica;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class EpicrisisController extends Controller
{
    function cargarDiagnosticoUltimaEvo(Request $request){
        $parametros = [$request->idIngreso];
       return DB::select("[HistoriaClinica].[spEvolucionMedicaUltimoDiagCargar] ?",$parametros);
    }

    function cargarDatosPaciente(Request $request){
        $parametros = [$request->idIngreso];
        return DB::select("[HistoriaClinica].[spEpicrisisPacienteCargar] ?",$parametros);
    }
    
    function cargarEstadoPaciente(){
        return DB::select("HistoriaClinica.spEpicrisisEstadoPacienteCargar");
    }

    function guardarEpicrisis(Request $request){

       $parametros = [$request->idEpicrisis,
                      $request->idIngreso,
                      $request->descripcion,
                      $request->fechaEpicrisis,
                      $request->horaEpicrisis,
                      $request->idEstado,
                      $request->session()->get('sesionActual.idTercero'),
                      $request->json];
       DB::insert("EXEC  HistoriaClinica.spEpicrisisCrear ?,?,?,?,?,?,?,?",$parametros);
    }
}