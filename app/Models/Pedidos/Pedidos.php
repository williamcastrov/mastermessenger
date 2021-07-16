<?php

namespace App\Models\Pedidos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedidos extends Model
{
    use HasFactory;

    protected $table = "pedidos";

    protected $primaryKey = "id_ped";

    protected $fillable = [
        'cliente_ped',
        'tipopedido_ped',
        'zona_ped',
        'ciudadorigen_ped',
        'ciudaddestino_ped',
        'tarifa_ped',
        'descuentovolumen_ped',
        'descuentotiquetera_ped',
        'pagacontratiquetera_ped',
        'valorapagar_ped',
        'telefonorecogida_ped',
        'telefonoentrega_ped' ,
        'mensajero_ped',
        'fechapedido_ped',
        'direccionrecogida_ped',
        'nombrerecogida_ped',
        'direccionentrega_ped',
        'nombreentrega_ped',
        'fechahorarecogida_ped',
        'fechahoraentrega_ped',
        'mensajero_ped',
        'fechaasigna_ped',
        'estado_ped',
        'empresa_ped',
        'observacion_ped',
        'pagadomensajero_ped',
        'pagadocliente_ped'
    ];

    public $timestamps = false;
}
