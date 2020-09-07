<?php

namespace  App\Http\Modelos\General;

use Illuminate\Database\Eloquent\Model;

class Tarifa extends Model
{
  protected $table = 'General.tarifas';
  protected $fillable = ['idTarifa',
                         'descripcion', 
                         'porcentaje', 
                         'año', 
                         'idUsuarioCreacion',
                         'activo'];
   
  public $timestamps = false;
  protected $primaryKey = 'idTarifa';                    
}
