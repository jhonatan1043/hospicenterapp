<?php

namespace App\Http\Controllers\Asistencial;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class IngresoController extends Controller{

   public function cargarAdmision(Request $request){
   $documento = $request->documento;
   $parametros = [$documento];
   return DB::select('exec Asistencial.spIngresoAdmisionCargar ?',$parametros);  
   }

   public function busquedaAdmision(Request $request){
      return DB::select('exec Asistencial.spIngresoAdmisionBusqueda');  
   }

   public function busquedaDiagnosticos(Request $request){
    $campoBusqueda = $request->campoBusqueda;
    $texto =  $request->texto;  
   
    $datos = DB::select('exec Asistencial.spIngresoDiagnosticoBuscar '.$campoBusqueda.','.$texto);  
    return  $datos;
   }
   public function cargarViaIngreso(){
      $datos = DB::select ('exec Asistencial.spIngresoViaIngresoCargar');  
      return   $datos ;
     }

     public function cargarServicio () {
      $datos  =  DB::select('exec Asistencial.spIngresoServicioCargar');  
      return   $datos ;
   }
   public function cargaArea(Request $request) {
      $idServicio = $request->idServicio;
      $parametros = [$idServicio];
      $datos  =  DB::select('exec Asistencial.spIngresoAreaCargar ?', $parametros);  
      return   $datos ;
   }
   public function cargaCama(Request $request) {
      $idArea = $request->idArea;
      $parametros = [$idArea];
      $datos  =  DB::select('exec Asistencial.spIngresoCamaCargar ?', $parametros);  
      return   $datos ;
   }
   public function guardarIngreso (Request $request) {   
     $idIngreso           =  $request->idIngreso;
     $idAdmision          =  $request->idAdmision;
     $fechaIngreso        =  $request->fechaIngreso;
     $horaIngreso        =  $request->horaIngreso;
     $idViaIngreso        =  $request->idViaIngreso;
     $idCausaExterna      =  $request->idCausaExterna;
     $idServicio          =  $request->idServicio;
     $idArea              =  $request->idArea;
     $idCama              =  $request->idCama;
     $idInstitucion       =  $request->idInstitucion;
     $numeroAutorizacion  =  $request->numeroAutorizacion;
     $json                =  $request->json;

     $parametros  = [ $idIngreso,
                      $idAdmision,
                      $fechaIngreso,
                      $horaIngreso,
                      $idViaIngreso,
                      $idCausaExterna, 
                      $idServicio,
                      $idArea,
                      $idCama, 
                      $idInstitucion,
                      $numeroAutorizacion,
                      $json ];
              
    DB::insert('exec Asistencial.spIngresoCrear ?,?,?,?,?,?,?,?,?,?,?,?',$parametros);           
   }

   public function listarIngreso(Request $request){

      $nombreCampo = $request->nombreCampo;
      $campoBuscar =  $request->campoBuscar;
       
      if($campoBuscar==''){
         $datos  =  DB::table("Asistencial.IngresoListar()")->paginate(15); 
      }else{  
         $datos  =  DB::table("Asistencial.IngresoListar()")->where($nombreCampo,'like','%'. $campoBuscar .'%')->paginate(15); 
      }
      
      return ['pagination'     =>[
         'total'        =>$datos->total(),
         'current_page' =>$datos->currentPage(),
         'per_page'     =>$datos->perPage(),
         'last_page'    =>$datos->lastPage(),
         'from'         =>$datos->firstItem(),
         'to'           =>$datos->lastItem(),
     ],
         'ingresoListar' => $datos
    ];

   }

   public function cargarIngreso(Request $request){
      $idIngreso = $request->idIngreso;
      $parametro = [$idIngreso];
      return  DB::select('exec Asistencial.spIngresoCargar ?',$parametro);  
   }

   public function cargarDiagnostico(Request $request){
      $idIngreso = $request->idIngreso;
      $parametro = [$idIngreso];
      return  DB::select('exec Asistencial.spIngresoDiagnosticosCargar ?',$parametro);  
   }

   public function anularIngreso(Request $request){
      $idIngreso = $request->idIngreso;
      $parametro = [$idIngreso];
      $datos  =  DB::insert('exec Asistencial.spIngresoAnular ?',$parametro); 
   }


}