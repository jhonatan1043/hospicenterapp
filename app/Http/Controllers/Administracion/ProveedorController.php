<?php

namespace App\Http\Controllers\Administracion;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Modelos\Administracion\Proveedor;
use DB;

class ProveedorController extends Controller
{
    public function index(Request $request)
    {
        $proveedor = Proveedor::find($request->id);
        return $proveedor;
    }  
    public function consultarProveedor()
    {
        return DB::select('[Administracion].[spConsultarProveedorTercero]');
    }
    function proveedorListar()
    {
        return DB::select('[Administracion].[spProveedorListar]');
    }
    public function store(request $request) 
    {
        $proveedor = new Proveedor();
        $idUsuario = $request->session()->get('sesionActual.idTercero');
        $proveedor->idTercero = $request->idTercero;
        $proveedor->idDiaEntrega = $request->idDiaEntrega;
        $proveedor->idDiaPlazo = $request->idDiaPlazo;
        $proveedor->idDiaDevolucion = $request->idDiaDevolucion;
        $proveedor->idFormaPago = $request->idFormaPago;
        $proveedor->idRegimen = $request->idRegimen;
        $proveedor->idBanco = $request->idBanco;
        $proveedor->idTipoCuenta = $request->idTipoCuenta;
        $proveedor->identificacion = $request->identificacion;
        $proveedor->numeroCuenta = $request->numeroCuenta;
        $proveedor->idUsuarioCreacion= $idUsuario;
        $proveedor->save();
    }
    public function actualizar(Request $request)
    {
        $proveedor = Proveedor::findOrFail($request->id);
        $proveedor->idTercero = $request->idTercero;
        $proveedor->idDiaEntrega = $request->idDiaEntrega;
        $proveedor->idDiaPlazo = $request->idDiaPlazo;
        $proveedor->idDiaDevolucion = $request->idDiaDevolucion;
        $proveedor->idFormaPago = $request->idFormaPago;
        $proveedor->idRegimen = $request->idRegimen;
        $proveedor->idBanco = $request->idBanco;
        $proveedor->idTipoCuenta = $request->idTipoCuenta;
        $proveedor->identificacion = $request->identificacion;
        $proveedor->numeroCuenta = $request->numeroCuenta;
        $proveedor->save();
    }
    public function anularProveedor(Request $request){
        $proveedor = Proveedor::findOrFail($request->id);
        $proveedor->activo = 0;
        $proveedor->save();
      }  
}