<?php

namespace App\Http\Modelos\General;

use Illuminate\Database\Eloquent\Model;

class DescripcionGeneral extends Model
{
   protected $table = 'General.parametrizacionDescripcion';

   protected $fillable = [
                          'idDescripcion',
                          'idParametro',
                          'descripcion',
                          'valorAdicional',
                          'activo'
                         ];

   public $timestamps = false;
   protected $primaryKey = 'idDescripcion';     
}
