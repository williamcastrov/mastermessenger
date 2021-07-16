<?php

namespace App\Models\Interlocutores;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empleados extends Model
{
    use HasFactory;

    protected $table = "empleados";

    protected $primaryKey = "id_emp";

    protected $fillable = [
	    'codigo_tipo_emp',
		'nit_emp',
		'digitochequeo_emp',
	    'estado_emp',
	    'primer_nombre_emp', 
	    'segundo_nombre_emp',
		'primer_apellido_emp',
		'segundo_apellido_emp', 
	    'razonsocial_emp',
	    'ciudad_emp',
	    'direccion_emp',
	    'telefono_emp',
		'email_emp',
		'empresa_emp',
	    'fecha_creacion_emp',
	    'fecha_modificacion_emp', 
	    'especialidad_emp'
    ];

    public $timestamps = false;
}
