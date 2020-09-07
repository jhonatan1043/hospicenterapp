<?php

namespace App\Http\Controllers\Asistencial;
use App\Http\Controllers\Controller;
use App\Http\Modelos\Asistencial\Paciente;
use Illuminate\Http\Request;
use DB;

class PacienteController extends Controller
{

     public function Index(Request $request)
     {
        $paciente = Paciente::all();
        return $paciente;
     }
 
     public function cargarPacienteTriage(Request $request){
        $documento = $request->documento;
        $parametros=[$documento];

        return  DB::select('EXEC [Asistencial].[spPacienteVerificarTriage] ?',$parametros);

     }

    public function verificarPacienteTriage(Request $request){
        $documento = $request->documento;
        $parametros=[$documento];

        $datos = DB::select('Exec Asistencial.spPacienteVerificarTriage ?',$parametros);

        return $datos;
    }

    public function listarPaciente()
    {
        $data = DB::select('Exec Asistencial.spPacienteListar');
        return $data;
    }

    public function consultarPaciente(Request $request){
        $data = Paciente::find($request->id);
        return $data;   
    }

    public function consultarDescripciones(Request $request)
    {
        $data = DB::select('Exec General.spDescripcionesListar '.$request->id);
        return $data;
    }

    public function consultarTipoIdentificacion()
    {
        $data = DB::select('SELECT idTipoIdentificacion id,descripcion FROM General.tipoidentificacion where Activo = 1');
        return $data;
    }

    public function consultarAdministradora()
    {
        $data = DB::select('SELECT idAdministradora id,nombreEPS as Descripcion FROM General.Administradora');
        return $data;
    }

    public function consultarAfiliacion(Request $request)
    {
        $data = DB::select('Exec General.spAfiliacionListar '.$request->id);
        return $data;
    }

    public function crearPaciente(Request $request){
        $paciente = new Paciente();
        $idUsuario = $request->session()->get('sesionActual.idTercero');
        $paciente->idTipoIdentificacion = $request->idTipoIdentificacion;
        $paciente->identificacion       = $request->identificacion;
        $paciente->pNombre              = $request->pNombre; 
        $paciente->sNombre              = $request->sNombre;
        $paciente->pApellido            = $request->pApellido;
        $paciente->sApellido            = $request->sApellido;
        $paciente->idGenero             = $request->idGenero;
        $paciente->fechaNacimiento      = $request->fechaNacimiento;
        $paciente->idPais               = $request->idPais;
        $paciente->idDepartamento       = $request->idDepartamento;
        $paciente->idMunicipio          = $request->idMunicipio;
        $paciente->direccion            = $request->direccion;
        $paciente->telefono             = $request->telefono;
        $paciente->celular              = $request->celular;
        $paciente->email                = $request->email;
        $paciente->idUsuario            = $idUsuario;
        $paciente->save(); 
   }
   
   public function actualizarPaciente(Request $request){
    $paciente =  Paciente::findOrFail($request->id);
    $idUsuario = $request->session()->get('sesionActual.idTercero');

    $paciente->idTipoIdentificacion = $request->idTipoIdentificacion;
    $paciente->identificacion       = $request->identificacion;
    $paciente->pNombre              = $request->pNombre; 
    $paciente->sNombre              = $request->sNombre;
    $paciente->pApellido            = $request->pApellido;
    $paciente->sApellido            = $request->sApellido;
    $paciente->idGenero             = $request->idGenero;
    $paciente->fechaNacimiento      = $request->fechaNacimiento;
    $paciente->idPais               = $request->idPais;
    $paciente->idDepartamento       = $request->idDepartamento;
    $paciente->idMunicipio          = $request->idMunicipio;
    $paciente->direccion            = $request->direccion;
    $paciente->telefono             = $request->telefono;
    $paciente->celular              = $request->celular;
    $paciente->email                = $request->email;
    $paciente->triage               = 0;
    $paciente->save(); 
   }
   public function eliminarPaciente(Request $request){
    $paciente =  Paciente::findOrFail($request->id);
    $paciente->activo = 0;
    $paciente->save(); 
   }
}

