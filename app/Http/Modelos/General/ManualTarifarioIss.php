<?php

namespace App\Http\Modelos\General;

use Illuminate\Database\Eloquent\Model;

class ManualTarifarioIss extends Model
{
   protected $table = 'ManualTarifario.procedimientosIss';
   protected $fillable =['idIss',
                         'codigoISS',
                         'descripcion',
                         'uvr',
                         'valorPersonalizado',
                         'facturable'];
   public $timestamps = false;
   protected $primaryKey = 'idIss';  
}
