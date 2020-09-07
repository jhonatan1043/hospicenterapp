<?php

namespace App\Http\Modelos\Asistencial;

use Illuminate\Database\Eloquent\Model;

class Admision extends Model
{
   protected $table = "Asistencial.Paciente";
   protected $fillable =['idAdmision',
                         'idPaciente',
                         'idContrato',
                         'idRegimen',
                         'idAfiliacion',
                         'idEspecialista',
                         'idAdministradora',
                         'idEstadoCivil',
                         'idUsuario',
                         'activo',
                         ];
                         
protected $primaryKey = 'idAdmision';                         
public $timestamps = false;    

}