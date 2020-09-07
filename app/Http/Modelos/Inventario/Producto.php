<?php

namespace App\Http\Modelos\Inventario;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $table ="Inventario.Producto";
    protected $fillable = ['idProducto',
                           'idEquivalencia',
                           'idMarca',
                           'regSanitario',
                           'codigoCum',
                           'iva',
                           'activo',
                           'idUsuario'];
    protected $primaryKey = 'idProducto';                         
    public $timestamps = false;    
}
