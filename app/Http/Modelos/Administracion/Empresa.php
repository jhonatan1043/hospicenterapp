<?php 

namespace App\Http\Modelos\Administracion;

use Illuminate\Database\Eloquent\Model;

class Empresa extends Model{
    protected $table = 'Administracion.empresa';
    protected $fillable =['idEmpresa','razonSocial','nit','dv','direccion','telefono','celular','idDepartamento','idMunicipio','email','activo'];
}