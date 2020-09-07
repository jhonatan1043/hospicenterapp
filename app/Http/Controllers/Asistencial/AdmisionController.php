<?php

namespace App\Http\Controllers\Asistencial;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class AdmisionController extends Controller
{
    public function verificarPaciente(Request $request){
        $documento = $request->documento;
        $parametros=[$documento];
        $datos = DB::select('exec Asistencial.spAdmisionPacienteCargar ?',$parametros);
       
        return  $datos;
    }
    public function consultarPaciente(){
        return DB::select('exec Asistencial.spAdmisionPacienteBuscar');     
    }
    public function admisionListar(Request $request){
        $nombreCampo = $request->nombreCampo;
        $texto = $request->texto;

        $datos = DB::select('exec Asistencial.spAdmisionListar '.$nombreCampo.','.$texto);
        return $datos;
            
    }
    public function cargarContrato(Request $request){
        $idEps = $request->idEps;
        $contrato = DB::select('exec Asistencial.spAdmisionContratoEps '. $idEps);
       
        return $contrato; 
    }
    public function cargarEspecialidad(Request $request){
        $especialidad = DB::select('exec Asistencial.spAdmisionMedico');
        return $especialidad;
    }
    public function consultarAdmision(Request $request){
        $idAdmision = $request->idAdmision;
        $parametros = [$idAdmision];
        $datosAdmision= DB::select('exec Asistencial.spAdmisionDatosCargar ?',$parametros);

        return $datosAdmision;
    }
    public function anularAdmision(Request $request){
        $idAdmision = $request->idAdmision;
        $parametros = [$idAdmision];
        $datosAdmision= DB::insert('exec Asistencial.spAdmisionAnular ?',$parametros);
    }
    public function consultaAcompañante(Request $request){
        $idAdmision = $request->idAdmision;
        $parametros = [$idAdmision];
        $datosAcompañante= DB::select('exec Asistencial.spAdmisionDatosCargarAcompañante ?',$parametros);

        return $datosAcompañante;
    }
    public function guardarAdmision(Request $request){  
        $idUsuario = $request->session()->get('sesionActual.idTercero');
        DB::insert('exec Asistencial.spAdmisionCrear '.$request->idAdmision.','
                                                      .$request->idPaciente.",'"
                                                      .$request->fechaAdmision."','"
                                                      .$request->horaAdmision."',"
                                                      .$request->idEspecialista.','
                                                      .$request->idContrato.','
                                                      .$request->idRegimen.','
                                                      .$request->idAfiliacion.','
                                                      .$request->idAdministradora.','
                                                      .$request->idEstadoCivil.','
                                                      .$idUsuario.",'"
                                                      .$request->json. "'");   
    }
    public function guardarPDF(Request $request){
       $pdf = $request->file('pdf');
       $archivo = base64_encode($pdf);
       $parametros = [$archivo];
       DB::insert('exec Asistencial.spAdmisionArchivos ?',$parametros);

    }
    public function cargarPDF(){
        
    }

}
