<?php

namespace App\Http\Controllers\General;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Modelos\General\DescripcionGeneral;

class descGeneralController extends Controller
{
    public function index(Request $request)
    {
    $buscar = $request->buscar;
    $criterio = $request->criterio;   
    $idParametro = $request->id;

    if($buscar == ''){
       $descripcionGeneral = DescripcionGeneral::where('idParametro',$idParametro)->where('activo',1)->orderBy('idDescripcion','desc')->Paginate(15);
       }
       else{
       $descripcionGeneral = DescripcionGeneral::where($criterio,'like','%'. $buscar .'%',)->where('idParametro',$idParametro) ->where('activo',1)->orderBy('idDescripcion','desc')->Paginate(15);
       }

       return ['pagination' =>[
        'total'             =>$descripcionGeneral->total(),
        'current_page'      =>$descripcionGeneral->currentPage(),
        'per_page'          =>$descripcionGeneral->perPage(),
        'last_page'         =>$descripcionGeneral->lastPage(),
        'from'              =>$descripcionGeneral->firstItem(),
        'to'                =>$descripcionGeneral->lastItem(),
     ],
        'parametroListar' =>$descripcionGeneral

     ];
    }
    public function consultarDescripciones(Request $request)
    {
       $data = DescripcionGeneral::find($request->id);
       return $data;
    }
    public function store(Request $request)
    {
        $descripcionGeneral = new DescripcionGeneral();
        $descripcionGeneral->idParametro    = $request->id;
        $descripcionGeneral->descripcion    = $request->descripcion;
        $descripcionGeneral->valorAdicional = $request->valorAdicional;
        $descripcionGeneral->save();
    }
    public function update(Request $request)
    {
        $descripcionGeneral = DescripcionGeneral::findOrFail($request->id);
        $descripcionGeneral->idParametro    = $request->idParametro;
        $descripcionGeneral->descripcion    = $request->descripcion;
        $descripcionGeneral->valorAdicional = $request->valorAdicional;
        $descripcionGeneral->save();
    }
    public function anular(Request $request)
    {
        $descripcionGeneral = DescripcionGeneral::findOrFail($request->id);
        $descripcionGeneral->activo = 0;
        $descripcionGeneral->save();
    }
}
