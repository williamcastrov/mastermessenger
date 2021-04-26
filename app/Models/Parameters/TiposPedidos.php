<?php

namespace App\Models\Parameters;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TiposPedidos extends Model
{
    use HasFactory;

    protected $table = "tipospedidos";

    protected $primaryKey = "id_tpd";

    protected $fillable = [
        'descripcion_tpd',
        'empresa_tpd',
        'estado_tpd',
    ];

    public $timestamps = false;
}
