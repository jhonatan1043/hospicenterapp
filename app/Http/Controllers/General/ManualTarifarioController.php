<?php

namespace App\Http\Controllers\General;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Modelos\General\ManualTarifarioIss;
use App\Http\Modelos\General\ManualTarifarioSoat;
use App\Http\Modelos\General\ManualTarifarioCups;
use App\Http\Modelos\General\ManualTarifarioServicio;

use DB;

class ManualTarifarioController extends Controller
{
   public function consultarServicioISS(Request $request)
    {
        $buscar = $request->buscar;
        $criterio = $request->criterio; 

        if($buscar == ''){
            $serviciosISS = ManualTarifarioIss::orderBy('idIss','desc')->Paginate(15);
            }
            else{
            $serviciosISS = ManualTarifarioIss::where($criterio,'like','%'. $buscar .'%')->orderBy('idIss','desc')->Paginate(15);
            } 
            
       return ['pagination' =>[
        'total'             =>$serviciosISS->total(),
        'current_page'      =>$serviciosISS->currentPage(),
        'per_page'          =>$serviciosISS->perPage(),
        'last_page'         =>$serviciosISS->lastPage(),
        'from'              =>$serviciosISS->firstItem(),
        'to'                =>$serviciosISS->lastItem(),
     ],
        'parametroListar' =>$serviciosISS

     ];

    }
    public function consultarServicioSoat(Request $request)
    {
      $buscar = $request->buscar;
      $criterio = $request->criterio; 

      if($buscar == ''){
          $serviciosSoat = ManualTarifarioSoat::orderBy('idSoat','desc')->Paginate(15);
          }
          else{
          $serviciosSoat = ManualTarifarioSoat::where($criterio,'like','%'. $buscar .'%')->orderBy('idSoat','desc')->Paginate(15);
          } 
          
     return ['pagination' =>[
      'total'             =>$serviciosSoat->total(),
      'current_page'      =>$serviciosSoat->currentPage(),
      'per_page'          =>$serviciosSoat->perPage(),
      'last_page'         =>$serviciosSoat->lastPage(),
      'from'              =>$serviciosSoat->firstItem(),
      'to'                =>$serviciosSoat->lastItem(),
   ],
      'parametroListar' =>$serviciosSoat

   ];
    }

    public function consultarServicioCups(Request $request)
    {
      $buscar = $request->buscar;
      $criterio = $request->criterio; 

      if($buscar == ''){
          $serviciosCups = ManualTarifarioCups::orderBy('idCups','desc')->Paginate(15);
          }
          else{
          $serviciosCups = ManualTarifarioCups::where($criterio,'like','%'. $buscar .'%')->orderBy('idCups','desc')->Paginate(15);
          } 
          
     return ['pagination' =>[
      'total'             =>$serviciosCups->total(),
      'current_page'      =>$serviciosCups->currentPage(),
      'per_page'          =>$serviciosCups->perPage(),
      'last_page'         =>$serviciosCups->lastPage(),
      'from'              =>$serviciosCups->firstItem(),
      'to'                =>$serviciosCups->lastItem(),
   ],
      'parametroListar' =>$serviciosCups

   ];

    }
    public function consultarServicio(Request $request)
    {
      $buscar = $request->buscar;
      $criterio = $request->criterio; 

      if($buscar == ''){
          $servicios = ManualTarifarioServicio::orderBy('idServicio','desc')->Paginate(15);
          }
          else{
          $servicios = ManualTarifarioServicio::where($criterio,'like','%'. $buscar .'%')->orderBy('idServicio','desc')->Paginate(15);
          } 
          
     return ['pagination' =>[
      'total'             =>$servicios->total(),
      'current_page'      =>$servicios->currentPage(),
      'per_page'          =>$servicios->perPage(),
      'last_page'         =>$servicios->lastPage(),
      'from'              =>$servicios->firstItem(),
      'to'                =>$servicios->lastItem(),
   ],
      'parametroListar' =>$servicios

   ];

 }

 public function guardarServicio(Request $request){
     $idUsuario = $request->session()->get('sesionActual.idTercero');

     $parametros = [$request->idManual,
                    $request->codigo,
                    $request->descripcion,
                    $request->factor,
                    $request->uvr,
                    $request->valorPersonalizado,
                    $request->equipo,
                    $request->visible,
                    $request->facturable,
                    $idUsuario,
 ];
     DB::insert('Exec [General].[spManualServicioCrear] ?,?,?,?,?,?,?,?,?,?', $parametros);
 }

 public function guardarHomologacionServicio(Request $request){
   $idUsuario = $request->session()->get('sesionActual.idTercero');

   $parametros = [$request->idManual,
                  $request->idCups,
                  $request->idSoat,
                  $request->idIss,
                  $idUsuario,
];
   DB::insert('Exec [General].[spManualServicioCruzeCrear] ?,?,?,?,?', $parametros);
}

 public function buscarCups(Request $request){  
   return ManualTarifarioCups::all();
  }

  public function buscarSoat(Request $request){
   return ManualTarifarioSoat::all();
  }

  public function buscarIss(Request $request){
   return ManualTarifarioIss::all();
  }

}
