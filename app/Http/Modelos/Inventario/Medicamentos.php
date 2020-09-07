<?php 

namespace App\Http\Modelos\Inventario;

use Illuminate\Database\Eloquent\Model;

class Medicamentos extends Model{
    protected $table = 'Inventario.equivalencia';
    protected $fillable =['idEquivalencia','codigoATC','descripcion','concentracion','descripcionATC','idUnidadMedida','idPresentacion','idGrupoFarmaco'
                         ,'idCategoria','idClasificacion','noPos','aplicaEnfermeria','aplicaFisioterapia','activo','idUsuario','fechaCreacion'];

    protected $primaryKey = 'idEquivalencia';                         
    public $timestamps = false;    
}