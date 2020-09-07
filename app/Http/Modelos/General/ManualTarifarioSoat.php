<?php

namespace App\Http\Modelos\General;

use Illuminate\Database\Eloquent\Model;

class ManualTarifarioSoat extends Model
{
   protected $table = 'ManualTarifario.procedimientosSoat';
   protected $fillable =['idSoat',
                         'codigoSoat',
                         'descripcion',
                         'factor',
                         'valorPersonalizado',
                         'facturable'];

   public $timestamps = false;
   protected $primaryKey = 'idSoat';  
}
