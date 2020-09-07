<?php

namespace App\Http\Controllers\Administracion;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Modelos\Administracion\Usuario;
use DB;

class UsuarioController extends Controller
{
    public function index()
    {
        return $usuario = Usuario ::all();
    }

    public function consultarTerceroUsuario(){
       return DB::select('EXEC [Administracion].[spConsultarUsuarioTercero]');
    }

    public function usuarioListar()
    {
        return DB::select('Exec [Administracion].[spUsuarioListar]');
    }
    public function asignarUsuario(Request $request)
    {
        return DB::select('EXEC [Administracion].[spCrearUsuario] '.$request->id);
    }

    public function store(Request $request)
    {
        $pass = password_hash($request->password,PASSWORD_BCRYPT);

        $datos =  new Usuario();
        $datos->idTercero =  $request->id;
        $datos->idPerfil  =  $request->idPerfil;
        $datos->usuario   =  $request->usuario;
        $datos->password  =  $pass;
        $datos->activo    =  $request->estado;
        $datos->save();
    }
    public function update(Request $request)
    {
        $pass = password_hash($request->password,PASSWORD_BCRYPT);

        $datos = Usuario::findOrFail($request->id);;
        $datos->idPerfil  =  $request->idPerfil;
        $datos->usuario   =  $request->usuario;
        $datos->password  =  $pass;
        $datos->activo    =  $request->estado;
        $datos->save();
    }
}
