<?php 

namespace App\Http\Modelos\Administracion;

use Illuminate\Database\Eloquent\Model;

class MenuPermiso extends Model{
    protected $table = 'Administracion.permisoMenu()';
    protected $fillable =['idMenu',
                          'descripcion',
                          'enlace',
                          'componente',
                          'icono',
                          'padre','
                          idPerfil',
                          'idPuntoServicio'];
}

