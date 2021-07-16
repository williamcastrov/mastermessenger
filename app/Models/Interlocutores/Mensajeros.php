<?php

namespace App\Models\Interlocutores;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mensajeros extends Model
{
    use HasFactory;

    protected $table = "mensajeros";

    protected $primaryKey = "id_men";

    protected $fillable = [
	    'codigo_tipo_men',
		'nit_men',
		'digitochequeo_men',
	    'estado_men',
	    'primer_nombre_men', 
	    'segundo_nombre_men',
		'primer_apellido_men',
		'segundo_apellido_men', 
	    'ciudad_men',
	    'direccion_men',
	    'telefono_men',
		'email_men',
		'empresa_men',
	    'fecha_creacion_men',
	    'fecha_modificacion_men', 
        'horainicia_men',
        'horafinal_men'
    ];

    public $timestamps = false;
}
