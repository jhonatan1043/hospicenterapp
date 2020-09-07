<?php

namespace App\Http\Modelos\General;

use Illuminate\Database\Eloquent\Model;

class EntornoServicioCama extends Model
{
    protected $table = 'General.entornoServicioCama';
    protected $fillable = [
        'id',
        'idCama', 
        'idEntorno', 
        'idServicio', 
        'idPiso', 
        'idHabitacion', 
        'observacion', 
        'activo',
        'idUsuarioCreacion'
    ];
    public $timestamps = false;
    protected $primaryKey = 'id';  
}
