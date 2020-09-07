<?php

namespace App\Http\Controllers\HistoriaClinica;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class NotasEnfermeriaController extends Controller
{
    public function registrarNotasEnfermeria(Request $request) 
    {
        $idUsuario = $request->session()->get('sesionActual.idTercero');
    }
}