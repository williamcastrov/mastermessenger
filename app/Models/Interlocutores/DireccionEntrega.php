<?php

namespace App\Models\Interlocutores;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DireccionEntrega extends Model
{
    use HasFactory;

    protected $table = "direccionentrega";

    protected $primaryKey = "id_den";

    protected $fillable = [
        'id_den',
        'cliente_den',
        'nombre_den',
        'direccion_den',
        'ciudad_den',
        'estado_den',
        'observacion_den'
    ];

    public $timestamps = false;
}
