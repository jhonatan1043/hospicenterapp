<?php

namespace App\Http\Modelos\General;

use Illuminate\Database\Eloquent\Model;

class Entorno extends Model
{
   protected $table = 'General.entorno';
   
   protected $fillable = [
    'idEntorno',
    'descripcion',
    'aplicaNeonatal',
    'activo',
    'idUsuarioCreacion'
   ];

   public $timestamps = false;
   protected $primaryKey = 'idEntorno';    
}
