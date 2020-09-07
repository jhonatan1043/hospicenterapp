<?php 

namespace App\Http\Modelos;

use Illuminate\Database\Eloquent\Model;

class Enfermeria extends Model{
    protected $table = 'HistoriaClinica.notasEnfermeria';
    protected $fillable = [ 'idIngreso',
                            'nota',
                            'activo',
                            'idUsuarioCreacion'];

    protected $primaryKey = 'idNota';
    public $timestamps = false;
}