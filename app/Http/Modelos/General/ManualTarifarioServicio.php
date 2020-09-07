<?php

namespace App\Http\Modelos\General;

use Illuminate\Database\Eloquent\Model;

class ManualTarifarioServicio extends Model
{
   protected $table = 'ManualTarifario.ProcedimientosServicios()';
   protected $fillable =['idServicio',
                         'idManual',
                         'codigoCups',
                         'codigoSOAT',
                         'codigoISS',
                         'descripcionCups',
                         'descripcionSoat',
                         'descripcionIss'];
                         
   public $timestamps = false;
   protected $primaryKey = 'idServicio';  
}
