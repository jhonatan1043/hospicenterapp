<?php

namespace App\Http\Modelos\General;

use Illuminate\Database\Eloquent\Model;

class ManualTarifarioCups extends Model
{
   protected $table = 'ManualTarifario.procedimientosCups';
   protected $fillable =['idCups',
                         'codigoCups',
                         'descripcion',
                         'facturable',
                         'equipo',
                         'visible'];
   public $timestamps = false;
   protected $primaryKey = 'idCups';  
}
