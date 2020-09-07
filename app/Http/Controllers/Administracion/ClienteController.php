<?php

namespace App\Http\Controllers\Administracion;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Modelos\Administracion\Cliente;
use DB;

class ClienteController extends Controller
{
    public function index(Request $request)
    {
        $cliente = Cliente::find($request->id);
        return $cliente;
    }
    public function consultarClientes()
    {
        return DB::select('[Administracion].[spClientesConsultar]');
    }
     
    function clienteListar(){
        return DB::select('[Administracion].[spClientesListar]');
    }

    public function store(Request $request)
    {
        $cliente = new Cliente();
        $idUsuario = $request->session()->get('sesionActual.idTercero');
        $cliente->idTercero = $request->idTercero;
        $cliente->idDiaEntrega = $request->idDiaEntrega;
        $cliente->idDiaPlazo = $request->idDiaPlazo;
        $cliente->idDiaDevolucion = $request->idDiaDevolucion;
        $cliente->idFormaPago = $request->idFormaPago;
        $cliente->idRegimen = $request->idRegimen;
        $cliente->idUsuarioCreacion= $idUsuario;
        $cliente->save();
    }
    public function actualizar(Request $request)
    {
        $cliente = Cliente::findOrFail($request->id);
        $cliente->idTercero = $request->idTercero;
        $cliente->idDiaEntrega = $request->idDiaEntrega;
        $cliente->idDiaPlazo = $request->idDiaPlazo;
        $cliente->idDiaDevolucion = $request->idDiaDevolucion;
        $cliente->idFormaPago = $request->idFormaPago;
        $cliente->idRegimen = $request->idRegimen;
        $cliente->save();
    }

    function consultarClienteTercero(){
        return DB::select('[Administracion].[spConsultarClienteTercero]');
    }
    public function anularCliente(Request $request){
        $cliente =  Cliente::findOrFail($request->id);
        $cliente->activo = 0;
        $cliente->save();
      }  
}
