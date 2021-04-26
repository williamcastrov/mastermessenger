<?php

namespace App\Models\Usuarios;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuarios extends Model
{
    use HasFactory;

    protected $table = "usuarios";

    protected $primaryKey = "id_usu";

    protected $fillable = [
        'uidfirebase_usu',
        'email_usu',
        'nombre_usu',
        'primerapellido_usu',
        'segundoapellido_usu',
        'direccion_usu',
        'estado_usu'
    ];

    public $timestamps = false;
}
