<?php

namespace App\Http\Modelos\General;

use Illuminate\Database\Eloquent\Model;

class TipoIdentificacion extends Model
{
  protected $table = 'General.TipoIdentificacion';

  protected $fillable = ['idTipoIdentificacion',
                         'descripcion',
                         'codigoDian',
                         'codigoRips',
                         'activo'];

   public $timestamps = false;
   protected $primaryKey = 'idTipoIdentificacion';                        
}
