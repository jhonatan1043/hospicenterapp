<?php

namespace App\Http\Modelos\General;

use Illuminate\Database\Eloquent\Model;

class Administradora extends Model
{
   protected $table = 'General.administradora';
   protected $fillable = ['idAdministradora',
                          'codigoEps',
                          'nombreCorto',
                          'nombreEps'];
                          
   public $timestamps = false;
   protected $primaryKey = 'idAdministradora';                         

}
