<?php

namespace App\Http\Controllers\General;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Modelos\General\Administradora;

class AdministradoraController extends Controller
{
    public function index()
    {
        return Administradora::select('idAdministradora AS id','nombreEps AS descripcion')->get();
    }
}
