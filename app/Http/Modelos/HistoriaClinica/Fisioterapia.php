<?php 

namespace App\Http\Modelos\HistoriaClinica;

use Illuminate\Database\Eloquent\Model;

class Fisioterapia extends Model{
    protected $table = 'HistoriaClinica.notasFisioterapia';
    protected $fillable = [ 'idIngreso',
                            'nota',                       
                            'idUsuarioCreacion'];

    protected $primaryKey = 'idNota';
    public $timestamps = false;
}