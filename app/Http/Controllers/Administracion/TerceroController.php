<?php

namespace App\Http\Controllers\Administracion;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class TerceroController extends Controller
{
    public function cargarTerceroListar()
    {
        $data = DB::select('EXEC [Administracion].[spTerceroListar]');
        return $data;
    }

     public function registroTerceroCargar(Request $request)
    {
        $data = DB::select('Exec [Administracion].[spTerceroCargar] ' . $request->id);
        return $data;
    }

    public function registroTerceroRut(Request $request)
    {
        $data = DB::select('Exec [Administracion].[spTerceroRutListar] ' . $request->id);
        return $data; 
    }

    function terceroCrear(Request $request){
        DB::beginTransaction();
        $idUsuario = $request->session()->get('sesionActual.idTercero');
    try {

        DB::insert("Exec [Administracion].[spTerceroCrear] ".$request->idTdentificacion. ",'"
                                                            .$request->identificacion. "',"
                                                            .$request->dv. ","
                                                            .$request->idRut. ","
                                                            .$request->idTpersona. ",'"
                                                            .$request->pNombre. "','"
                                                            .$request->sNombre. "','"
                                                            .$request->pApellido. "','"
                                                            .$request->sApellido. "','"
                                                            .$request->fechaNacimiento. "','"
                                                            .$request->idGenero. "','"
                                                            .$request->razonSocial. "','"
                                                            .$request->nComencial. "','"
                                                            .$request->representante. "','"
                                                            .$request->direccion. "','"
                                                            .$request->telefono. "','"
                                                            .$request->celular. "','"
                                                            .$request->email. "','"
                                                            .$request->idDepartamento. "','"
                                                            .$request->idMunicipio. "','"
                                                            .$request->jsonRut ."',"
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
function terceroActualizar(Request $request){
    DB::beginTransaction();
    $idUsuario = $request->session()->get('sesionActual.idTercero');   
try {

    DB::insert("Exec [Administracion].[spTerceroActualizar] ".$request->id. ","
                                                             .$request->idTdentificacion. ",'"
                                                             .$request->identificacion. "',"
                                                             .$request->dv. ","
                                                             .$request->idRut. ","
                                                             .$request->idTpersona. ",'"
                                                             .$request->pNombre. "','"
                                                             .$request->sNombre. "','"
                                                             .$request->pApellido. "','"
                                                             .$request->sApellido. "','"
                                                             .$request->fechaNacimiento. "','"
                                                             .$request->idGenero. "','"
                                                             .$request->razonSocial. "','"
                                                             .$request->nComencial. "','"
                                                             .$request->representante. "','"
                                                             .$request->direccion. "','"
                                                             .$request->telefono. "','"
                                                             .$request->celular. "','"
                                                             .$request->email. "','"
                                                             .$request->idDepartamento. "','"
                                                             .$request->idMunicipio. "','"
                                                             .$request->jsonRut ."',"
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
}
