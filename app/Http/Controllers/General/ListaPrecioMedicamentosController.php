<?php

namespace App\Http\Controllers\general;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class ListaPrecioMedicamentosController extends Controller
{
    public function medicamentosCargar(Request $request){
       $nombreCampo = $request->nombreCampo;
       $campoBuscar =  $request->campoBuscar;
      
       if($campoBuscar==''){
        $datos = DB::table('General.FnListaMedicamentosEquivalenciaCargar()')->paginate(15);
       }else{
        $datos = DB::table('General.FnListaMedicamentosEquivalenciaCargar()')->where($nombreCampo,'like','%'. $campoBuscar .'%')->paginate(15); 
       }
      
       return ['pagination'     =>[
        'total'        =>$datos->total(),
        'current_page' =>$datos->currentPage(),
        'per_page'     =>$datos->perPage(),
        'last_page'    =>$datos->lastPage(),
        'from'         =>$datos->firstItem(),
        'to'           =>$datos->lastItem(),
    ],
        'medicamentosListar' => $datos
   ];
    }
    public function listaPrecioMedicamentosCargar(Request $request){
        $nombreCampo = $request->nombreCampo;
        $campoBuscar =  $request->campoBuscar;
       
        if($campoBuscar==''){
         $datos = DB::table('General.FnListaMedicamentosCargar()')->orderBy('id', 'DESC')->paginate(15);
        }else{
         $datos = DB::table('General.FnListaMedicamentosCargar()')->where($nombreCampo,'like','%'. $campoBuscar .'%')->orderBy('id', 'DESC')->paginate(15); 
        }
       
        return ['pagination'     =>[
         'total'        =>$datos->total(),
         'current_page' =>$datos->currentPage(),
         'per_page'     =>$datos->perPage(),
         'last_page'    =>$datos->lastPage(),
         'from'         =>$datos->firstItem(),
         'to'           =>$datos->lastItem(),
     ],
         'listaMedicamentosListar' => $datos
    ];
     }
     public function cargarDatos(Request $request){
       $id = $request->idListaPrecio;
       return  DB::select('select descripcion from General.listaPrecio where idListaPrecio = ?', [$id]);
     }
     public function cargarDetalles(Request $request){
        $id = $request->idListaPrecio;
        return DB::select('General.spListaPrecioMedicamentosCargar ?', [$id]);
     }
     public function anularLista(Request $request){
        $id = $request->idListaPrecio;
        DB::insert('General.spListaPrecioMedicamentosAnular ?', [$id]);
     }
    public function guardar(Request $request){
        $parametro = [$request->idListaPrecio,
                      $request->descripcion,
                      $request->session()->get('sesionActual.idTercero'),
                      $request->json];
        DB::insert('General.spListaPrecioMedicamentosCrear ?,?,?,?',$parametro);
    }
}
