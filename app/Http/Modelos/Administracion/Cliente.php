<?php 

namespace App\Http\Modelos\Administracion;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model{
    protected $table = 'Administracion.clientes';
    protected $fillable = [ 'idCliente',
                            'idTercero',
                            'idDiaEntrega',
                            'idDiaPlazo',
                            'idDiaDevolucion',
                            'idFormaPago',
                            'idRegimen',
                            'activo',
                            'idUsuarioCreacion'];

    protected $primaryKey = 'idCliente';
    public $timestamps = false;
}