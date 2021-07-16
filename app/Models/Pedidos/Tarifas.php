<?php

namespace App\Models\Pedidos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tarifas extends Model
{
    use HasFactory;

    protected $table = "tarifas";

    protected $primaryKey = "id_tar";

    protected $fillable = [
        'nombre_tar',
        'tipozona_tar',
        'origen_tar',
        'ciudadorigen_tar',
        'destino_tar',
        'ciudaddestino_tar',
        'codigotarifa_tar',
        'tipopedido_tar',
        'empresa_tar',
        'valor_tar',
        'estado_tar',
        'observacion_tar'
    ];

    public $timestamps = false;
}
