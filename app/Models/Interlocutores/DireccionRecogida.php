<?php

namespace App\Models\Interlocutores;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DireccionRecogida extends Model
{
    use HasFactory;

    protected $table = "direccionrecogida";

    protected $primaryKey = "id_drc";

    protected $fillable = [
        'id_drc',
        'cliente_drc',
        'nombre_drc',
        'direccion_drc',
        'ciudad_drc',
        'estado_drc',
        'observacion_drc'
    ];

    public $timestamps = false;
}
