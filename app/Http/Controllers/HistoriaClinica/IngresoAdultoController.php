<?php

namespace App\Http\Controllers\HistoriaClinica;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class IngresoAdultoController extends Controller
{
    public function informacionIngresoRegistrar(Request $request)
    {
        $idUsuario = $request->session()->get('sesionActual.idTercero'); 

        DB::beginTransaction();
        try{
            DB::insert("Exec HistoriaClinica.spIngresoAdultoCrear ".$request->idIngreso.",".$request->idGenero.",'".$request->motivo."','" .$request->estadoGen."','"
                                                                   .$request->enfeActual."',".$request->idEstIngreso.",'" .$request->arrayAntFam. "','" .$request->arrayAntPers. "','" .$request->arryDiagIng."','"
                                                                   .$request->menarquia."','".$request->vidaSexual."',".$request->idPlanificar.",'".$request->menopausea."',".$request->idDesconoceF.",'"
                                                                   .$request->otroCaso."',".$request->idConfiable. "," .$request->idInternoExamFis. ",'" .$request->aspecto. "','" .$request->pielFanela."','"
                                                                   .$request->craneo. "','" .$request->ojo. "','" .$request->oido."','" .$request->nariz."','" .$request->boca."','"
                                                                   .$request->garganta. "','" .$request->cuello."','" .$request->toraxPulmon. "','" .$request->corazon."','" .$request->senos."','"
                                                                   .$request->abdomen. "','" .$request->genitales."','" .$request->examenRectal."','" .$request->Extremidades. "','" .$request->neuroMuscular."','"
                                                                   .$request->osteoArticular. "','" .$request->neurologia. "','" .$request->dorso. "','" .$request->origen."',".$idUsuario );
            DB::commit();
           } catch (\Exception $e) {
            DB::rollback();
            throw $e;
           } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
           }
    }
    
    public function informacionIngresoCargar(Request $request){
        return DB::select('EXEC HistoriaClinica.spIngresoAdultoCargar '.$request->id);
    }
    public function informacionIngresoAntFamCargar(Request $request){
        return DB::select('EXEC HistoriaClinica.spIngresoAdultoAntFamCargar '.$request->id);   
    }
    public function informacionIngresoAntPersCargar(Request $request){
        return DB::select('EXEC HistoriaClinica.spIngresoAdultoAntPersCargar '.$request->id); 
    }
    public function informacionIngresoDiagnosticoCargar(Request $request){
        return DB::select('EXEC HistoriaClinica.spIngresoAdultoDiagnosticoCargar '.$request->id);    
    }  
}
