<?php

namespace App\Models\Pedidos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Zonas extends Model
{
    use HasFactory;

    protected $table = "zonas";

    protected $primaryKey = "id_zon";

    protected $fillable = [
        'nombre_zon',
        'descripcion_zon',
        'estado_zon'
    ];

    public $timestamps = false;
}
