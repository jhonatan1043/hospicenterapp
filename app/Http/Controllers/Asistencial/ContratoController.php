<?php

namespace App\Http\Controllers\Asistencial;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class ContratoController extends Controller
{
   public function crearContrato(Request $request)
   {

    DB::beginTransaction();
       
    try{

        $idUsuario = $request->session()->get('sesionActual.idTercero');

        DB::insert("Exec Asistencial.spContratoCrear "   .  $request->idCliente . 
                                                     ","   .  $request->idTipoContrato .
                                                     ","   .  $request->cantidadAfiliado .
                                                     ","   .  $request->valorContrato . 
                                                     ","   .  $request->idReferencia .
                                                     ","   .  $request->idManual . 
                                                     ","   .  $request->idListaPrecio .
                                                     ",'"  .  $request->fechaInicio .
                                                     "','" .  $request->fechaFin .
                                                     "',"  .  $request->valorOxigeno .
                                                     ","   .  $request->idTarifa .
                                                     ","   .  $request->estado .
                                                     ",'"  .  $request->jsoAreaServicio .
                                                     "','" .  $request->jsoEPS . 
                                                     "',"  .  $idUsuario );

        DB::commit();

    } catch (\Exception $e) {
      DB::rollback();
      throw $e;
    } catch (\Throwable $e) {
      DB::rollback();
      throw $e;
    }
   } 

   public function actualizarContrato(Request $request)
   {

    DB::beginTransaction();
       
    try{

        $idUsuario = $request->session()->get('sesionActual.idTercero');

        DB::insert("Exec Asistencial.spContratoActualizar "     .  $request->idContrato . 
                                                          ","   .  $request->idTipoContrato .
                                                          ","   .  $request->idTipoContrato .
                                                          ","   .  $request->cantidadAfiliado .
                                                          ","   .  $request->valorContrato . 
                                                          ","   .  $request->idReferencia .
                                                          ","   .  $request->idManual . 
                                                          ","   .  $request->idListaPrecio .
                                                          ",'"  .  $request->fechaInicio .
                                                          "','" .  $request->fechaFin .
                                                          "',"  .  $request->valorOxigeno .
                                                          ","   .  $request->idTarifa .
                                                          ","   .  $request->estado .
                                                          ",'"  .  $request->jsoAreaServicio .
                                                          "','" .  $request->jsoEPS . 
                                                          "',"  .  $idUsuario );

        DB::commit();

    } catch (\Exception $e) {
      DB::rollback();
      throw $e;
    } catch (\Throwable $e) {
      DB::rollback();
      throw $e;
    }
   } 
   
   public function listarContratos()
   {
       return DB::select('Exec Asistencial.spContratoListar ');
   }

   public function cargarContrato(Request $request){ 
       return DB::select('Exec Asistencial.spContratoCargar ' . $request->id);
   }

   public function cargarContratoAdministradora(Request $request){
       return DB::select('Exec Asistencial.spContratoAdministradoraCargar ' . $request->id);
  }

  public function cargarContratoAreaServicio(Request $request){
      return DB::select('Exec Asistencial.spContratoAreaServicioCargar ' . $request->id);
  }
}
