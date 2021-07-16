<?php

namespace App\Models\Tiquetera;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TiposTiquetera extends Model
{
    use HasFactory;

    protected $table = "tipostiquetera";

    protected $primaryKey = "id_ttk";

    protected $fillable = [
        'nombre_ttk',
        'descripcion_ttk',
        'valor_ttk',
        'empresa_ttk',
        'estado_ttk',
    ];
    
    public $timestamps = false;
}
