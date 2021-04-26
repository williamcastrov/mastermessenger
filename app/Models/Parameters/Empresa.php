<?php

namespace App\Models\Parameters;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    use HasFactory;

    protected $table = "empresa";

    protected $primaryKey = "id_emp";

    protected $fillable = [
        'nombre_emp',
        'nit_emp',
        'digitochequeo_emp',
        'direccion_emp',
        'fecha_creacion_emp',
        'fecha_modificación_emp',
        'ciudad_emp'
    ];

    public $timestamps = false;
}
