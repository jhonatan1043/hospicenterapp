<?php

namespace App\Http\Modelos\Asistencial;

use Illuminate\Database\Eloquent\Model;

class Ingreso extends Model
{
   protected $table = "Asistencial.Ingreso";
   protected $fillable =['idAtencion',
                         'idAdmision',
                         'fechaIngreso',
                         'idEntorno',
                         'idCausaExterna',
                         'idInstitucion',
                         'idViaIngreso',
                         'idCama',
                         'atencionFurips',
                         'valorFurips',
                         'fechaCreacion',
                         'numeroAutorizacion',
                         'fechaActualizacion'
                         ];
                         
protected $primaryKey = 'idAtencion';                         
public $timestamps = false;    

}