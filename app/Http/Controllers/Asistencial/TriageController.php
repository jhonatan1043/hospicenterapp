<?php

namespace App\Http\Controllers\Asistencial;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class TriageController extends Controller
{

   public function listarTriage(){

      $data = DB::select('[Asistencial].[spTriageListar]');
      return  $data;
   }

   public function consultarPacienteIdent(Request $request)
   {
    $identificacion = $request->identificacion;
    $info = [$identificacion];
    return DB::select('Exec Asistencial.spPacienteIdentificacionConsultar ?',$info);
   }

   public function consultarTriage(Request $request)
   {
    $data = DB::select('Exec [Asistencial].[spTriageConsultar] ' . $request->id);
    return $data;
   }

   public function consultarRegistroTriage(Request $request)
   {
    $data = DB::select('Exec [Asistencial].[spTriageRegistroCargar] ' . $request->id);
    return $data;
   }

   public function consultarSintomas(Request $request)
   {
    $data = DB::select('SELECT idSintoma id,
                               Descripcion
                          FROM General.Sintoma WHERE activo = 1
                           AND  idCriterio = '. $request->id);
    return $data;
   }

   public function crearTriage(Request $request){  

    DB::beginTransaction();

      $pNombre =   is_null($request->pNombre) ? 'NUll' :$request->pNombre;
      $sNombre =   is_null($request->sNombre) ? 'NULL' :$request->sNombre;
      $pApellido = is_null($request->pApellido) ? 'NULL' :$request->pApellido;
      $sApellido = is_null($request->sApellido) ? 'NULL' :$request->sApellido;
      $alergia =   is_null($request->alergia) ? 'NULL' :$request->alergia;
      $idUsuario = $request->session()->get('sesionActual.idTercero');

      try{

      DB::insert('exec Asistencial.spTriageCrear '  .$request->idPaciente.','
                                                    .$request->idTIdenti.','
                                                    .$request->identificacion.','
                                                    .$pNombre.','
                                                    .$sNombre.','
                                                    .$pApellido.','
                                                    .$sApellido.','
                                                    .$request->idCriterio.','
                                                    .$request->idSintoma.','
                                                    .$request->idCausaExterna.','
                                                    .$request->idEstadoPaciente.','
                                                    .$alergia.','
                                                    .$request->idRespOcular.','
                                                    .$request->idRespVerbal.','
                                                    .$request->idRespMotora.','
                                                    .$request->peso.','
                                                    .$request->talla.','
                                                    .$request->frecCard.','
                                                    .$request->frecResp.','
                                                    .$request->temp.','
                                                    .$request->pulso.','
                                                    .$request->tasi.','
                                                    .$request->tadi.','
                                                    .$request->pulpils.','
                                                    .$request->perimAbdominal.','
                                                    .$request->perimCefalico.','
                                                    .$idUsuario);

         DB::commit();

       } catch (\Exception $e) {
         DB::rollback();
         throw $e;
       } catch (\Throwable $e) {
         DB::rollback();
         throw $e;
   }
 
}

public function actualizarTriage(Request $request){

  $alergia =   is_null($request->alergia) ? 'NULL' :$request->alergia;

  $idUsuario = $request->session()->get('sesionActual.idTercero');
  
  DB::update('exec Asistencial.spTriageActualizar '  .$request->idTriage.','
                                                     .$request->idCriterio.','
                                                     .$request->idSintoma.','
                                                     .$request->idCausaExterna.','
                                                     .$request->idEstadoPaciente.',"'
                                                     .$alergia.'",'
                                                     .$request->idRespOcular.','
                                                     .$request->idRespVerbal.','
                                                     .$request->idRespMotora.',"'
                                                     .$request->peso.'","'
                                                     .$request->talla.'","'
                                                     .$request->frecCard.'","'
                                                     .$request->frecResp.'","'
                                                     .$request->temp.'","'
                                                     .$request->pulso.'","'
                                                     .$request->tasi.'","'
                                                     .$request->tadi.'","'
                                                     .$request->pulpils.'",'
                                                     .$request->perimAbdominal.','
                                                     .$request->perimCefalico.','
                                                     .$idUsuario);

 }

 public function anularRegistro(Request $request){

  $idUsuario = $request->session()->get('sesionActual.idTercero');

  DB::update('exec Asistencial.[spTriageAnular] ' .$request->id.','
                                                  .$idUsuario);                                              
 }

}
