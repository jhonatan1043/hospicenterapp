<?php

namespace App\Http\Modelos\Administracion;

use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model{
    
    protected $table = 'Administracion.proveedores';

    protected $fillable = [ 'idProveedor',
                            'idTercero',
                            'idDiaEntrega',
                            'idDiaPlazo',
                            'idDiaDevolucion',
                            'idFormaPago',
                            'idRegimen',
                            'idBanco',
                            'idTipoCuenta',
                            'identificacion',
                            'numeroCuenta',
                            'activo',
                            'idUsuarioCreacion']; 

    protected $primarykey = 'idProveedor';
    public $timestamps = false;

    public function getKeyName(){
        return "idProveedor";
    }


}