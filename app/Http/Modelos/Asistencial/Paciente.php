<?php

namespace App\Http\Modelos\Asistencial;

use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
   protected $table = "Asistencial.Paciente";
   protected $fillable =['idPaciente',
                         'idTipoIdentificacion',
                         'identificacion',
                         'pNombre',
                         'sNombre',
                         'pApellido',
                         'sApellido',
                         'idGenero',
                         'fechaNacimiento',
                         'idpais',
                         'idDepartamento',
                         'idMunicipio',
                         'direccion',
                         'telefono',
                         'celular',
                         'email',
                         'triage',
                         'idUsuarioCreacion',
                         'activo'];
                         
protected $primaryKey = 'idPaciente';                         
public $timestamps = false;    

}
