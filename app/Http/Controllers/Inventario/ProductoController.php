<?php

namespace App\Http\Controllers\Inventario;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Modelos\Inventario\Producto;
use DB;

class ProductoController extends Controller
{
   public function cargarProducto(Request $request)
   {
       return Producto::all()->where('idProducto',$request->id);
   }
   
   public function productoListar(Request $request)
   {
    $buscar = $request->buscar;
    $criterio = $request->criterio;
   
    if($buscar == ''){
     $datos = DB::table("Inventario.productoListar()")->paginate(15);
    }
    else{
     $datos = DB::table("Inventario.productoListar()")->where($criterio,'like','%'. $buscar .'%')->paginate(15);
    }
    return ['pagination'     =>[
              'total'        =>$datos->total(),
              'current_page' =>$datos->currentPage(),
              'per_page'     =>$datos->perPage(),
              'last_page'    =>$datos->lastPage(),
              'from'         =>$datos->firstItem(),
              'to'           =>$datos->lastItem(),
          ],
              'parametroListar' => $datos
         ];
   }

   public function consultarEquivalencia(){
       return DB::select('[Inventario].[spConsultarEquivalencia]');
   }

   public function store(Request $request)
   {
       $idUsuario = $request->session()->get('sesionActual.idTercero');
       $data =  new producto();
       $data->idEquivalencia =  $request->idEquivalencia;
       $data->idMarca        =  $request->idMarca;
       $data->regSanitario   =  $request->regSanitario;
       $data->codigoCum      =  $request->codigoCum;
       $data->iva            =  $request->iva;
       $data->idUsuario      =  $idUsuario;
       $data->save();

   }
   public function update(Request $request)
   {
    $data =  producto::findOrFail($request->id);
    $data->idEquivalencia =  $request->idEquivalencia;
    $data->idMarca        =  $request->idMarca;
    $data->regSanitario   =  $request->regSanitario;
    $data->codigoCum      =  $request->codigoCum;
    $data->iva            =  $request->iva;
    $data->save();
   }

}
