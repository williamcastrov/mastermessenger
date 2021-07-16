<?php

namespace App\Http\Controllers\API\Pedidos;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Ciudades;
use App\Models\Parameters\Estados;
use App\Models\Parameters\TiposPedidos;
use App\Models\Pedidos\Tarifas;
use App\Models\Pedidos\Zonas;
use App\Models\Interlocutores\Clientes;
use App\Models\Pedidos\Pedidos;

class PedidosController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['id_ped']                  = $request['id_ped'];
          $insert['cliente_ped']             = $request['cliente_ped'];
          $insert['tipopedido_ped']          = $request['tipopedido_ped'];
          $insert['zona_ped']                = $request['zona_ped'];
          $insert['ciudadorigen_ped']        = $request['ciudadorigen_ped'];
          $insert['ciudaddestino_ped']       = $request['ciudaddestino_ped'];
          $insert['tarifa_ped']              = $request['tarifa_ped'];
          $insert['descuentovolumen_ped']    = $request['descuentovolumen_ped'];
          $insert['descuentotiquetera_ped']  = $request['descuentotiquetera_ped'];
          $insert['pagacontratiquetera_ped'] = $request['pagacontratiquetera_ped'];
          $insert['valorapagar_ped']         = $request['valorapagar_ped'];
          $insert['telefonorecogida_ped']    = $request['telefonorecogida_ped'];
          $insert['telefonoentrega_ped']     = $request['telefonoentrega_ped'];
          $insert['mensajero_ped']           = $request['mensajero_ped'];
          $insert['fechapedido_ped']         = $request['fechapedido_ped'];
          $insert['direccionrecogida_ped']   = $request['direccionrecogida_ped'];
          $insert['nombrerecogida_ped']      = $request['nombrerecogida_ped'];
          $insert['direccionentrega_ped']    = $request['direccionentrega_ped'];
          $insert['nombreentrega_ped']       = $request['nombreentrega_ped'];
          $insert['fechahorarecogida_ped']   = $request['fechahorarecogida_ped'];
          $insert['fechahoraentrega_ped']    = $request['fechahoraentrega_ped'];
          $insert['mensajero_ped']           = $request['mensajero_ped'];
          $insert['fechaasigna_ped']         = $request['fechaasigna_ped'];
          $insert['estado_ped']              = $request['estado_ped'];
          $insert['empresa_ped']             = $request['empresa_ped'];
          $insert['observacion_ped']         = $request['observacion_ped'];   
          $insert['pagadomensajero_ped']     = $request['pagadomensajero_ped'];  
          $insert['pagadocliente_ped']       = $request['pagadocliente_ped'];  
              
          Pedidos::insert($insert);
      
          $response['message'] = "Pedido Grabado de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }
    
      public function listar_pedidos(){  
        try {
          
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est, t3.nombre_zon, t4.descripcion_tpd, t5.nombre_ciu,
                                           t6.primer_nombre_cli, t6.segundo_nombre_cli, t6.primer_apellido_cli, t6.segundo_apellido_cli,
                                           t6.razonsocial_cli, t7.primer_nombre_men, t7.segundo_nombre_men, t7.primer_apellido_men,
                                           t7.segundo_apellido_men,
                                           CONCAT(t7.primer_nombre_men,' ',t7.segundo_nombre_men,' ',t7.primer_apellido_men,' ',
                                           t7.segundo_apellido_men) as nombremensajero
          FROM pedidos as t0 INNER JOIN empresa      as t1 INNER JOIN estados  as t2 INNER JOIN zonas    as t3 
                             INNER JOIN tipospedidos as t4 INNER JOIN ciudades as t5 INNER JOIN clientes as t6
                             INNER JOIN mensajeros    as t7
          WHERE t0.empresa_ped    = t1.id_emp and t0.estado_ped       = t2.id_est and t0.zona_ped    = t3.id_zon and
                t0.tipopedido_ped = t4.id_tpd and t0.ciudadorigen_ped = t5.id_ciu and t0.cliente_ped = t6.id_cli and
                t0.mensajero_ped  = t7.id_men");
  
          $response['data'] = $data;
          $response['message'] = "load successful";
          $response['success'] = true;
      
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
          return $response;
      }

      public function listar_pedidosasignar(){  
        try {
          
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est, t3.nombre_zon, t4.descripcion_tpd, t5.nombre_ciu,
                                           t6.primer_nombre_cli, t6.segundo_nombre_cli, t6.primer_apellido_cli, t6.segundo_apellido_cli,
                                           t6.razonsocial_cli, t7.primer_nombre_men, t7.segundo_nombre_men, t7.primer_apellido_men,
                                           t7.segundo_apellido_men,
                                           CONCAT(t7.primer_nombre_men,' ',t7.segundo_nombre_men,' ',t7.primer_apellido_men,' ',
                                           t7.segundo_apellido_men) as nombremensajero
          FROM pedidos as t0 INNER JOIN empresa      as t1 INNER JOIN estados  as t2 INNER JOIN zonas    as t3 
                             INNER JOIN tipospedidos as t4 INNER JOIN ciudades as t5 INNER JOIN clientes as t6
                             INNER JOIN mensajeros    as t7
          WHERE t0.empresa_ped    = t1.id_emp and t0.estado_ped       = t2.id_est and t0.zona_ped    = t3.id_zon and
                t0.tipopedido_ped = t4.id_tpd and t0.ciudadorigen_ped = t5.id_ciu and t0.cliente_ped = t6.id_cli and
                t0.mensajero_ped  = t7.id_men and t0.estado_ped in (1,2)");
  
          $response['data'] = $data;
          $response['message'] = "load successful";
          $response['success'] = true;
      
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
          return $response;
      }

      public function listar_pedidosporasignar(){  
        try {
          
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est, t3.nombre_zon, t4.descripcion_tpd, t5.nombre_ciu,
                                           t6.primer_nombre_cli, t6.segundo_nombre_cli, t6.primer_apellido_cli, t6.segundo_apellido_cli,
                                           t6.razonsocial_cli, t7.primer_nombre_men, t7.segundo_nombre_men, t7.primer_apellido_men,
                                           t7.segundo_apellido_men,
                                           CONCAT(t7.primer_nombre_men,' ',t7.segundo_nombre_men,' ',t7.primer_apellido_men,' ',
                                           t7.segundo_apellido_men) as nombremensajero
          FROM pedidos as t0 INNER JOIN empresa      as t1 INNER JOIN estados  as t2 INNER JOIN zonas    as t3 
                             INNER JOIN tipospedidos as t4 INNER JOIN ciudades as t5 INNER JOIN clientes as t6
                             INNER JOIN mensajeros    as t7
          WHERE t0.empresa_ped    = t1.id_emp and t0.estado_ped       = t2.id_est and t0.zona_ped    = t3.id_zon and
                t0.tipopedido_ped = t4.id_tpd and t0.ciudadorigen_ped = t5.id_ciu and t0.cliente_ped = t6.id_cli and
                t0.mensajero_ped  = t7.id_men and t0.estado_ped in (1)");
  
          $response['data'] = $data;
          $response['message'] = "load successful";
          $response['success'] = true;
      
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
          return $response;
      }

      public function listar_pedidosasignados(){  
        try {
          
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est, t3.nombre_zon, t4.descripcion_tpd, t5.nombre_ciu,
                                           t6.primer_nombre_cli, t6.segundo_nombre_cli, t6.primer_apellido_cli, t6.segundo_apellido_cli,
                                           t6.razonsocial_cli, t7.primer_nombre_men, t7.segundo_nombre_men, t7.primer_apellido_men,
                                           t7.segundo_apellido_men,
                                           CONCAT(t7.primer_nombre_men,' ',t7.segundo_nombre_men,' ',t7.primer_apellido_men,' ',
                                           t7.segundo_apellido_men) as nombremensajero
          FROM pedidos as t0 INNER JOIN empresa      as t1 INNER JOIN estados  as t2 INNER JOIN zonas    as t3 
                             INNER JOIN tipospedidos as t4 INNER JOIN ciudades as t5 INNER JOIN clientes as t6
                             INNER JOIN mensajeros    as t7
          WHERE t0.empresa_ped    = t1.id_emp and t0.estado_ped       = t2.id_est and t0.zona_ped    = t3.id_zon and
                t0.tipopedido_ped = t4.id_tpd and t0.ciudadorigen_ped = t5.id_ciu and t0.cliente_ped = t6.id_cli and
                t0.mensajero_ped  = t7.id_men and t0.estado_ped in (2)");
  
          $response['data'] = $data;
          $response['message'] = "load successful";
          $response['success'] = true;
      
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
          return $response;
      }
    
      public function listar_pedidosterminar(){  
        try {
          
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est, t3.nombre_zon, t4.descripcion_tpd, t5.nombre_ciu,
                                           t6.primer_nombre_cli, t6.segundo_nombre_cli, t6.primer_apellido_cli, t6.segundo_apellido_cli,
                                           t6.razonsocial_cli, t7.primer_nombre_men, t7.segundo_nombre_men, t7.primer_apellido_men,
                                           t7.segundo_apellido_men,
                                           CONCAT(t7.primer_nombre_men,' ',t7.segundo_nombre_men,' ',t7.primer_apellido_men,' ',
                                           t7.segundo_apellido_men) as nombremensajero
          FROM pedidos as t0 INNER JOIN empresa      as t1 INNER JOIN estados  as t2 INNER JOIN zonas    as t3 
                             INNER JOIN tipospedidos as t4 INNER JOIN ciudades as t5 INNER JOIN clientes as t6
                             INNER JOIN mensajeros    as t7
          WHERE t0.empresa_ped    = t1.id_emp and t0.estado_ped       = t2.id_est and t0.zona_ped    = t3.id_zon and
                t0.tipopedido_ped = t4.id_tpd and t0.ciudadorigen_ped = t5.id_ciu and t0.cliente_ped = t6.id_cli and
                t0.mensajero_ped  = t7.id_men and t0.estado_ped in (1,2,3)");
  
          $response['data'] = $data;
          $response['message'] = "load successful";
          $response['success'] = true;
      
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
          return $response;
      }

      public function get($id_ped){
        try { 
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est, t3.nombre_zon, t4.descripcion_tpd, t5.nombre_ciu,
                                          t6.primer_nombre_cli, t6.segundo_nombre_cli, t6.primer_apellido_cli, t6.segundo_apellido_cli,
                                          t6.razonsocial_cli, t7.primer_nombre_men, t7.segundo_nombre_men, t7.primer_apellido_men,
                                          t7.segundo_apellido_men,
                                          CONCAT(t7.primer_nombre_men,' ',t7.segundo_nombre_men,' ',t7.primer_apellido_men,' ',
                                          t7.segundo_apellido_men) as nombremensajero
                       FROM pedidos as t0 INNER JOIN empresa      as t1 INNER JOIN estados  as t2 INNER JOIN zonas    as t3 
                                          INNER JOIN tipospedidos as t4 INNER JOIN ciudades as t5 INNER JOIN clientes as t6
                                          INNER JOIN mensajeros    as t7
                       WHERE t0.empresa_ped    = t1.id_emp and t0.estado_ped       = t2.id_est and t0.zona_ped    = t3.id_zon and
                             t0.tipopedido_ped = t4.id_tpd and t0.ciudadorigen_ped = t5.id_ciu and t0.cliente_ped = t6.id_cli and
                             t0.mensajero_ped  = t7.id_men and t0.id_ped     = $id_ped");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_ped => $id_ped";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }

      public function leerpedidosmensajeros($mensajero){
        try { 
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est, t3.nombre_zon, t4.descripcion_tpd, t5.nombre_ciu,
                                          t6.primer_nombre_cli, t6.segundo_nombre_cli, t6.primer_apellido_cli, t6.segundo_apellido_cli,
                                          t6.razonsocial_cli, t7.primer_nombre_men, t7.segundo_nombre_men, t7.primer_apellido_men,
                                          t7.segundo_apellido_men,
                                          CONCAT(t7.primer_nombre_men,' ',t7.segundo_nombre_men,' ',t7.primer_apellido_men,' ',
                                          t7.segundo_apellido_men) as nombremensajero
                       FROM pedidos as t0 INNER JOIN empresa      as t1 INNER JOIN estados  as t2 INNER JOIN zonas    as t3 
                                          INNER JOIN tipospedidos as t4 INNER JOIN ciudades as t5 INNER JOIN clientes as t6
                                          INNER JOIN mensajeros    as t7
                       WHERE t0.empresa_ped    = t1.id_emp and t0.estado_ped       = t2.id_est  and t0.zona_ped    = t3.id_zon and
                             t0.tipopedido_ped = t4.id_tpd and t0.ciudadorigen_ped = t5.id_ciu  and t0.cliente_ped = t6.id_cli and
                             t0.mensajero_ped  = t7.id_men and t0.mensajero_ped    = $mensajero and t0.estado_ped in (1,2,3,4)");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_ped => $id_ped";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }

      public function leerestadoctamensajero($mensajero){
        try { 
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est, t3.nombre_zon, t4.descripcion_tpd, t5.nombre_ciu as ciudadorigen,
                                          t8.nombre_ciu as ciudaddestino,
                                          t6.primer_nombre_cli, t6.segundo_nombre_cli, t6.primer_apellido_cli, t6.segundo_apellido_cli,
                                          t6.razonsocial_cli, t7.primer_nombre_men, t7.segundo_nombre_men, t7.primer_apellido_men,
                                          t7.segundo_apellido_men,
                                          CONCAT(t7.primer_nombre_men,' ',t7.segundo_nombre_men,' ',t7.primer_apellido_men,' ',
                                          t7.segundo_apellido_men) as nombremensajero
                       FROM pedidos as t0 INNER JOIN empresa      as t1 INNER JOIN estados  as t2 INNER JOIN zonas    as t3 
                                          INNER JOIN tipospedidos as t4 INNER JOIN ciudades as t5 INNER JOIN clientes as t6
                                          INNER JOIN mensajeros    as t7 INNER JOIN vista_ciudaddestinopedidos as t8
                       WHERE t0.empresa_ped    = t1.id_emp and t0.estado_ped       = t2.id_est  and t0.zona_ped    = t3.id_zon  and
                             t0.tipopedido_ped = t4.id_tpd and t0.ciudadorigen_ped = t5.id_ciu  and  t0.cliente_ped = t6.id_cli and
                             t0.ciudaddestino_ped = t8.ciudaddestino_ped and t0.id_ped = t8.id_ped and t0.mensajero_ped  = t7.id_men and 
                             t0.mensajero_ped     = $mensajero            and t0.estado_ped in (5,6)");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_ped => $id_ped";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }
    
      public function update(Request $request, $id_ped){
        try {
            $data['id_ped']                  = $request['id_ped'];
            $data['cliente_ped']             = $request['cliente_ped'];
            $data['tipopedido_ped']          = $request['tipopedido_ped'];
            $data['zona_ped']                = $request['zona_ped'];
            $data['ciudadorigen_ped']        = $request['ciudadorigen_ped'];
            $data['ciudaddestino_ped']       = $request['ciudaddestino_ped'];
            $data['tarifa_ped']              = $request['tarifa_ped'];
            $data['descuentovolumen_ped']    = $request['descuentovolumen_ped'];
            $data['descuentotiquetera_ped']  = $request['descuentotiquetera_ped'];
            $data['pagacontratiquetera_ped'] = $request['pagacontratiquetera_ped'];
            $data['valorapagar_ped']         = $request['valorapagar_ped'];
            $data['telefonorecogida_ped']    = $request['telefonorecogida_ped'];
            $data['telefonoentrega_ped']     = $request['telefonoentrega_ped'];
            $data['fechapedido_ped']         = $request['fechapedido_ped'];
            $data['mensajero_ped']           = $request['mensajero_ped'];
            $data['direccionrecogida_ped']   = $request['direccionrecogida_ped'];
            $data['nombrerecogida_ped']      = $request['nombrerecogida_ped'];
            $data['direccionentrega_ped']    = $request['direccionentrega_ped'];
            $data['nombreentrega_ped']       = $request['nombreentrega_ped'];
            $data['fechahorarecogida_ped']   = $request['fechahorarecogida_ped'];
            $data['fechahoraentrega_ped']    = $request['fechahoraentrega_ped'];
            $data['mensajero_ped']           = $request['mensajero_ped'];
            $data['fechaasigna_ped']         = $request['fechaasigna_ped'];
            $data['estado_ped']              = $request['estado_ped'];
            $data['empresa_ped']             = $request['empresa_ped'];
            $data['observacion_ped']         = $request['observacion_ped'];      
            $data['pagadomensajero_ped']     = $request['pagadomensajero_ped'];  
            $data['pagadocliente_ped']       = $request['pagadocliente_ped'];  
    
            $res = Pedidos::where("id_ped",$id_ped)->update($data);
    
            $response['res']     = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      }
    
      public function delete($id_ped){ 
        try {
          $res= Pedidos::where("id_ped",$id_ped)->delete($id_ped);
          
          $response['res']     = $res;
          $response['message'] = "Deleted successful";
          $response['success'] = true; 
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
          return $response;
      }
}
