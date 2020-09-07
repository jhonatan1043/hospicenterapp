<?php

namespace App\Http\Controllers\HistoriaClinica;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Modelos\Enfermeria;
use DB;

class EnfermeriaController extends Controller
{
    public function registrarNotasEnfermeria(Request $request) 
    {
        if($request->idNota ==0){
        $enfermeria = new Enfermeria();
        $idUsuario = $request->session()->get('sesionActual.idTercero');
        $enfermeria->idIngreso = $request->idIngreso;
        $enfermeria->nota = $request->nota;
        $enfermeria->idUsuarioCreacion= $idUsuario;
        $enfermeria->save();
        }else{
            $enfermeria = Enfermeria::findOrFail($request->idNota);
            $enfermeria->nota = $request->nota;
            $enfermeria->save();
        }
       
    }

    public function actualizar(Request $request)
    {
       
    }

    public function anularNotasEnfermeria(Request $request){
        $enfermeria = Enfermeria::findOrFail($request->idIngreso);
        $enfermeria->activo = 1;
        $enfermeria->save();
    }

    function listarNotasEnfermeria(Request $request){
        $parametros = [$request->idIngreso];
        return DB::select('[HistoriaClinica].[spEnfermeriaNotasListar] ?',$parametros);
    }
    
    function listarInsumosEnfermeria(Request $request){
        $parametros = [$request->idIngreso];
        return DB::select('[HistoriaClinica].[spEnfermeriaInsumosListar] ?',$parametros);
    }

    function cargarNotasEnfermeria(Request $request){
        $enfermeria = Enfermeria::find($request->idNota);
        return $enfermeria;   
    }

    function cargarInsumosEnfermeria(Request $request){
       $parametro =[$request->idOrdenInsumo]; 
       return DB::select('HistoriaClinica.spEnfermeriaInsumoCargar ?',$parametro);
    }

    public function buscarInsumoEnfermeria(){
        return DB::select('[HistoriaClinica].[spEnfermeriaInsumoBuscar]');
    }

    public function guardarInsumos(Request $request){
       $idUsuario = $request->session()->get('sesionActual.idTercero');
       $parametros=[$request->idOrdenIngreso,
                    $request->idIngreso,
                    $request->json,
                    $idUsuario];
                    
        DB::insert('exec [HistoriaClinica].[spEnfermeriaInsumoCrear] ?,?,?,?',$parametros);            
    }
}