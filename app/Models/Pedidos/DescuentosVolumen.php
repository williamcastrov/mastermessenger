<?php

namespace App\Models\Pedidos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DescuentosVolumen extends Model
{
    use HasFactory;

    protected $table = "descuentosvolumen";

    protected $primaryKey = "id_dvo";

    protected $fillable = [
        'nombre_dvo',
        'descripcion_dvo',
        'valor_dvo',
        'empresa_dvo',
        'estado_dvo',
    ];
    
    public $timestamps = false;
}
