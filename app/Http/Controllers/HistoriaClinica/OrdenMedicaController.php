<?php

namespace App\Http\Controllers\HistoriaClinica;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class OrdenMedicaController extends Controller {
   
    function paraclinicosConsultar(Request $request){
      return DB::select('EXEC [HistoriaClinica].[spParaclinicosConsultar] ?', [$request->id]);
    }

    public function MedicamentosConsultar(Request $request){
        return  DB::select('EXEC HistoriaClinica.spOrdenMedicaMedicamentosBuscar ?', [$request->id]);
      }

    public function ordenMedicaGuardar(Request $request){
        $idUsuario = $request->session()->get('sesionActual.idTercero'); 
        $parametros =[$request->id,
                      $request->idIngreso,
                      $request->fechaOrden,
                      $request->horaOrden,
                      $request->indicacion,
                      $request->jsonEstancia,
                      $request->jsonOxigeno,
                      $request->jsonMedicamento,
                      $request->jsonParaclinico,
                      $request->jsonInterconsulta,
                      $idUsuario
      ];
         DB::insert('[HistoriaClinica].[spOrdenMedicaCrear] ?,?,?,?,?,?,?,?,?,?,?', $parametros);
      }

   public function ordenMedicaListar(Request $request){
        return DB::select('[HistoriaClinica].[spOrdenMedicaListar] ?',[$request->idIngreso]);
     }

   public function ordenMedicaCargar(Request $request){
      return DB::select('EXEC [HistoriaClinica].[spOrdenMedicaCargar] ?', [$request->id]);
    }

    public function ordenMedicaEstanciaCargar(Request $request){
      return DB::select('EXEC [HistoriaClinica].[spOrdenMedicaEstanciasCargar] ?', [$request->id]);
    }

    public function ordenMedicaOxigenoCargar(Request $request){
      return DB::select('EXEC [HistoriaClinica].[spOrdenMedicaOxigenosCargar] ?', [$request->id]);
    }

    public function ordenMedicaParaclinicoCargar(Request $request){
      return DB::select('EXEC [HistoriaClinica].[spOrdenMedicaParaclinicosCargar] ?', [$request->id]);
    }

    public function ordenMedicaMedicamentoCargar(Request $request){
      return DB::select('EXEC [HistoriaClinica].[spOrdenMedicaMedicamentosCargar] ?', [$request->id]);
    }

    public function ordenMedicaInterconsultaCargar(Request $request){
      return DB::select('EXEC [HistoriaClinica].[spOrdenMedicaInterconsultasCargar] ?', [$request->id]);
    }
    
}