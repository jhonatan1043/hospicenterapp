<?php

namespace App\Http\Modelos\General;

use Illuminate\Database\Eloquent\Model;

class Parametro extends Model
{
  protected $table = 'General.parametrizacion';
  protected $fillable = ['idParametro',
                         'descripcion'];

   public $timestamps = false;
   protected $primaryKey = 'idParametro';  
}
