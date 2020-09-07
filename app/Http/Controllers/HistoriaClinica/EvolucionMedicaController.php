<?php

namespace App\Http\Controllers\HistoriaClinica;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class EvolucionMedicaController extends Controller
{
    public function registrarEvolucionMedica(Request $request) 
    {
       $idUsuario  = $request->session()->get('sesionActual.idTercero');
       $parametros =[$request->codigoEvo,
                     $request->idIngreso,
                     $request->fechaEvo,
                     $request->horaEvo,
                     $request->aspecto,
                     $request->pielFanela,
                     $request->craneo,
                     $request->ojo,
                     $request->oido,
                     $request->nariz,
                     $request->boca,
                     $request->garganta,
                     $request->cuello,
                     $request->toraxPulmon,
                     $request->corazon,
                     $request->senos,
                     $request->abdomen,
                     $request->genitales,
                     $request->examenRectal,
                     $request->Extremidades,
                     $request->neuroMuscular,
                     $request->osteoArticular,
                     $request->neurologia,
                     $request->dorso,
                     $request->fCard,
                     $request->fResp,
                     $request->temp,
                     $request->pulso,
                     $request->tasi,
                     $request->tadi,
                     $request->pulpils,
                     $request->perimetroAbdom,
                     $request->perimetroCefal,
                     $request->objetiva,
                     $request->subjetiva,
                     $request->analisis,
                     $request->plan,
                     $request->jsonDiagnostico,
                     $idUsuario,
                    ];
       DB::insert('EXEC [HistoriaClinica].[spEvolucionMedicaCrear] ?,?,?,?,
                                                                   ?,?,?,?,
                                                                   ?,?,?,?,
                                                                   ?,?,?,?,
                                                                   ?,?,?,?,
                                                                   ?,?,?,?,
                                                                   ?,?,?,?,
                                                                   ?,?,?,?,
                                                                   ?,?,?,?,
                                                                   ?,?,?', $parametros);
    }

    public function anularEvolucionMedica(Request $request){
     /* $enfermeria = Enfermeria::findOrFail($request->idEvo);
        $enfermeria->activo = 1;
        $enfermeria->save();*/
    }

    function listarEvolucionMedica(Request $request){
        $parametros = [$request->idIngreso];
        return DB::select('[HistoriaClinica].[spEvolucionMedicaListar] ?',$parametros);
    }

    function cargarEvolucionMedica(Request $request){
        $parametros = [$request->idEvo];
        return DB::select('EXEC [HistoriaClinica].[spEvolucionMedicaCargar] ?', $parametros);
    }

    public function cargarEvolucionMedicaDiag(Request $request)
    {
        $parametros = [$request->idEvo];
        return DB::select(' Exec [HistoriaClinica].[spEvolucionMedicaDiagCargar] ?', $parametros);
    }
    public function cargarEvolucionMedicaUltimaDiag(Request $request)
    {
        $parametros = [$request->idIngreso];
        return DB::select(' Exec [HistoriaClinica].[spEvolucionMedicaUltimoDiagCargar] ?', $parametros);
    }
}