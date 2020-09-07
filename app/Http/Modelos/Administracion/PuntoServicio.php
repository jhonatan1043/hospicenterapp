<?php
namespace  App\Http\Modelos\Administracion;

use Illuminate\Database\Eloquent\Model;

class PuntoServicio extends Model

{
    protected $table = "Administracion.puntoServicio";

    protected $fillable =['idPuntoServicio', 
                          'razonSocial', 
                          'idresponsable', 
                          'direccion',  
                          'telefono', 
                          'celular', 
                          'email', 
                          'paginaWeb', 
                          'idDepartamento', 
                          'idMunicipio', 
                          'administrativo', 
                          'idusuarioCreacion', 
                          'fechaCreacion', 
                          'activo'];

 protected $primaryKey = 'idPuntoServicio';                         
 public $timestamps = false;   

}
