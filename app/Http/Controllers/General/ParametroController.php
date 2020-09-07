<?php

namespace App\Http\Controllers\General;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Modelos\General\Parametro;

class ParametroController extends Controller
{
    public function index(Request $request)
    {
    $buscar = $request->buscar;
    $criterio = $request->criterio;   

    if($buscar == ''){
       $parametro = Parametro::orderBy('idParametro','desc')->Paginate(15);
       }
       else{
       $parametro = Parametro::where($criterio,'like','%'. $buscar .'%')->orderBy('idParametro','desc')->Paginate(15);
       }

       return ['pagination' =>[
        'total'             =>$parametro->total(),
        'current_page'      =>$parametro->currentPage(),
        'per_page'          =>$parametro->perPage(),
        'last_page'         =>$parametro->lastPage(),
        'from'              =>$parametro->firstItem(),
        'to'                =>$parametro->lastItem(),
     ],
        'parametroListar' =>$parametro

     ];
    }
    public function store(Request $request)
    {
        $descripcionGeneral = new Parametro();
        $descripcionGeneral->descripcion    = $request->descripcion;
        $descripcionGeneral->save();
    }
    public function update(Request $request)
    {
        $descripcionGeneral = Parametro::findOrFail($request->id);
        $descripcionGeneral->descripcion    = $request->descripcion;
        $descripcionGeneral->save();
    }
}
