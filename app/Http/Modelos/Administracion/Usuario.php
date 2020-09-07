<?php

namespace App\Http\Modelos\Administracion;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'Administracion.usuarioSistema';
     
    protected $fillable =['idTercero', 
                          'idPerfil',
                          'usuario',
                          'password',
                          'activo'];

    protected $primaryKey = 'idTercero';                         
    public $timestamps = false;   
}
