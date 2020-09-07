<?php

namespace App\Http\Controllers\Administracion;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Modelos\Administracion\MenuPermiso;

class  MenuPermisoController extends Controller
{
   
    public function getChildren($data, $line)
    {
        $children = [];
        foreach ($data as $line1) {
            if ($line['idMenu'] == $line1['padre']) {
                $children = array_merge($children, [ array_merge($line1, ['submenu' => $this->getChildren($data, $line1)])]);                 
            }     
        }
        return $children;
    }

    public function optionsMenu()
    {  
            $idPerfil = session()->get('sesionActual.idPerfil'); 
            $idPuntoServicio = session()->get('sesionActual.idPuntoServicio'); 

            return MenuPermiso::all()
            ->where('idPerfil',$idPerfil)
            ->where('idPuntoServicio',$idPuntoServicio)
            ->toArray();   
    }
    public static function menus()
    {
        $menuC = new MenuPermisoController();
        $data = $menuC->optionsMenu();   
        $menuAll = [];
        foreach ($data as $line) {
            if($line['padre']!=null)   
            continue;    
            $item = [ array_merge($line, ['submenu' => $menuC->getChildren($data, $line) ]) ];
            $menuAll = array_merge($menuAll, $item); 
        }
        return $menuAll ;
    }
}
