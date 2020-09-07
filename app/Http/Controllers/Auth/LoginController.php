<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginFormResquest;
use Illuminate\Support\Facades\Auth;
use DB;

class LoginController extends Controller
{
  public function showLoginForm(){
      return view('auth.login');
  }

  public function login(LoginFormResquest $request){
     
     if(Auth::attempt(['usuario'=>$request->usuario,
                        'password'=>$request->password,
                        'activo'=>1])){  
       
      $data = Auth::user();
      $data = array_add($data,'idEmpresa',$request->idEmpresa); 
      $data = array_add($data, 'idPuntoServicio',$request->idPuntoServicio); 
      $request->session()->put('sesionActual',$data);
      } else {
         return response()->json(['errors'=>['login'=>['la contraseña es incorrecta']]], 422);
      }
  }

  public function logout (Auth $auth,Request $request){
    Auth::logout();
    $request->session()->forget('sesionActual');
    return redirect('/');
   }

  public function usuarioEmpresaListar(Request $request){
    $data=DB::select('Exec [Administracion].[spEmpresaUsuarioListar] ' . $request->id);
    return $data;
  }

  public function usuarioPuntoListar(Request $request){
    $data=DB::select('Exec [Administracion].[spPuntoServicioUsuarioListar] ' . $request->id . ','
                                                                             .$request->idEmpresa);
    return $data;
  }

  public function usuarioConsultar(Request $request){
    $data=DB::select("Exec [Administracion].[spConsultarUsuario] '" . $request->usuario . "'");
    return $data;
  }


  public function sessionUsuarioActual(Request $request){
    $admin = DB::select('SELECT administrativo FROM Administracion.puntoServicio WHERE idPuntoServicio = '
                        . session()->get('sesionActual.idPuntoServicio'));
    $data = session()->get('sesionActual');
    $data = array_add($data, 'administrativo', head($admin)); 

    return  $data;
  }

}
