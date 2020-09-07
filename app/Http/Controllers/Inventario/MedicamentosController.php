<?php

namespace App\Http\Controllers\Inventario;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class MedicamentosController extends Controller
{
    public function listarMedicamentos(Request $request){
      $nombreCampo = $request->nombreCampo;
      $campoBuscar =  $request->campoBuscar;
       
      if($campoBuscar==''){
         $datos  =  DB::table("Inventario.EquivalenciaListar()")->paginate(15); 
      }else{  
         $datos  =  DB::table("Inventario.EquivalenciaListar()")->where($nombreCampo,'like','%'. $campoBuscar .'%')->paginate(15); 
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
    public function medicamentosCargar(Request $request){
      $parametro = [$request->idMedicamentos];
      return DB::select('Inventario.spEquivalenciaCargar ?',$parametro);
    }
    public function medicamentosDetalleCargar(Request $request){
        $parametro = [$request->idMedicamentos];
        return DB::select('Inventario.spEquivalenciaViaAdministracionCargar ?',$parametro);
      }
    public function productosAsociados(Request $request){
        $parametro = [$request->idEquivalencia];
        return DB::select('Inventario.spEquivalenciaProductosAsociados ?',$parametro);
    }
    public function medicamentosAnular(Request $request){
        $medicamento = $request->idMedicamentos;
        $parametro = [$medicamento];
        $dato = DB::insert('Inventario.spEquivalenciaAnular ?',$parametro);
      }  
    public function guardar(Request $request){
        
        $idEquivalencia = $request->idEquivalencia;
        $codigoATC= $request->codigoATC;
        $descripcion= $request->descripcion;
        $concentracion= $request->concentracion;
        $descripcionATC= $request->descripcionATC;
        $unidad= $request->unidad;
        $presentacion= $request->presentacion;
        $grupoFarmaco= $request->grupoFarmaco;
        $categoria= $request->categoria;
        $clasificacion= $request->clasificacion;
        $noPos= $request->noPos;
        $aplicaEnfermeria= $request->solicitadoEnfermeria;
        $aplicaFisioterapia= $request->solicitadoFisioterapeuta;
        $idUsuario = $request->session()->get('sesionActual.idTercero');
        $json = $request->json;

        $parametros=[$idEquivalencia,$codigoATC,$descripcion,
                     $concentracion,$descripcionATC,$unidad,
                     $presentacion,$grupoFarmaco,$categoria,
                     $clasificacion,$noPos,$aplicaEnfermeria,
                     $aplicaFisioterapia,$idUsuario,$json];
        $datos = DB::insert('Inventario.spEquivalenciaCrear ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?',$parametros);
    }
    public function viaAdministracionBuscar(Request $request){
        $id = $request->id;    
        $nombreCampo = $request->campoBusqueda;
        $texto = $request->texto;
        return DB::select('Inventario.spEquivalenciaViaAdministracionBuscar '.$id.','.$nombreCampo.','.$texto);
    }

   public function listarViaAdmin(Request $request)
    {
      $parametro = [$request->idEquivalecia];
      return DB::select('[General].[spListarViaAdmin] ?',$parametro);
    }
}
