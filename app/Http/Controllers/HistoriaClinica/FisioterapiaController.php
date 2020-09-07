<?php

namespace App\Http\Controllers\HistoriaClinica;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Modelos\HistoriaClinica\Fisioterapia;
use DB;

class FisioterapiaController extends Controller {
   
    function guardarNota(Request $request){
     $fisioterapia = new Fisioterapia();     
       try {   
          if($request->idNota==0){
              $idUsuario = $request->session()->get('sesionActual.idTercero');
              $fisioterapia->idIngreso = $request->idIngreso;
              $fisioterapia->nota = $request->nota;
              $fisioterapia->idUsuarioCreacion= $idUsuario;
              $fisioterapia->save();
          }else{
              $fisioterapia = Fisioterapia::findOrFail($request->idNota);
              $fisioterapia->nota = $request->nota;
              $fisioterapia->save();
          }    
        
       } catch (\Throwable $th) {
           throw $th;
       }
    }
    function listarNotas(Request $request){
        $params =[$request->idIngreso];
       try {
          return DB::select('HistoriaClinica.spFisioterapiaNotasListar ?',$params);
       } catch (\Throwable $th) {
           throw $th;
       }
    }
    function cargarNotas(Request $request){
       return Fisioterapia::find($request->idNota);
    }
    function cargarInsumos(Request $request){
        $parametro =[$request->idOrdenInsumo]; 
        return DB::select('HistoriaClinica.spFisioterapiaInsumoCargar ?',$parametro);
     }
     function listarInsumos(Request $request){
        $parametros = [$request->idIngreso];
        return DB::select('[HistoriaClinica].[spFisioterapiaInsumosListar] ?',$parametros);
    }
    public function buscarInsumo(){
        return DB::select('[HistoriaClinica].[spFisioterapiaInsumoBuscar]');
    }
    function guardarInsumos(Request $request){
        try {
            $idUsuario = $request->session()->get('sesionActual.idTercero');
            $parametros=[$request->idOrdenIngreso,
                         $request->idIngreso,
                         $request->json,
                         $idUsuario];
                         
             DB::insert('exec [HistoriaClinica].[spFisioterapiaInsumoCrear] ?,?,?,?',$parametros);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}