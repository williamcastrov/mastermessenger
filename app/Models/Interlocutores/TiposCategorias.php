<?php

namespace App\Models\Interlocutores;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TiposCategorias extends Model
{
    use HasFactory;

    protected $table = "tiposcategoria";

    protected $primaryKey = "id_tcg";

    protected $fillable = [
        'nombre_tcg',
        'descripcion_tcg',
        'valor_tcg',
        'empresa_tcg',
        'estado_tcg',
    ];
    
    public $timestamps = false;
}
