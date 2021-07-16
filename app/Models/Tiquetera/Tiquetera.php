<?php

namespace App\Models\Tiquetera;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tiquetera extends Model
{
    use HasFactory;

    protected $table = "tiquetera";

    protected $primaryKey = "id_ttk";

    protected $fillable = [
        'id_tik',
	    'nombre_tik',
	    'tipotiquetera_tik',
	    'cliente_tik',
	    'valor_tik',
	    'valorconsumo_tik',
	    'saldo_tik',
	    'estado_tik',
	    'observacion_tik'
    ];
    
    public $timestamps = false;
}
