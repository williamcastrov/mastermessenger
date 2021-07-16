<?php

namespace App\Http\Controllers\API\Pedidos;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Estados;
use App\Models\Parameters\TiposPedidos;
use App\Models\Pedidos\Tarifas;
use App\Models\Pedidos\Zonas;

class TarifasController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['nombre_tar']         = $request['nombre_tar'];
          $insert['tipozona_tar']       = $request['tipozona_tar'];
          $insert['origen_tar']         = $request['origen_tar'];
          $insert['ciudadorigen_tar']   = $request['ciudadorigen_tar'];
          $insert['destino_tar']        = $request['destino_tar'];
          $insert['ciudaddestino_tar']  = $request['ciudaddestino_tar'];
          $insert['codigotarifa_tar']   = $request['codigotarifa_tar'];
          $insert['tipopedido_tar']     = $request['tipopedido_tar'];
          $insert['empresa_tar']        = $request['empresa_tar'];
          $insert['valor_tar']          = $request['valor_tar'];
          $insert['estado_tar']         = $request['estado_tar'];
          $insert['observacion_tar']    = $request['observacion_tar'];
              
          Tarifas::insert($insert);
      
          $response['message'] = "Tarifa Grabada de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }
    
      public function listar_tarifas(){  
        try {
          
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est, t3.nombre_zon, t4.descripcion_tpd
          FROM tarifas as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 INNER JOIN zonas as t3 INNER JOIN tipospedidos as t4
          WHERE t0.empresa_tar    = t1.id_emp and t0.estado_tar = t2.id_est and t0.tipozona_tar = t3.id_zon and
                t0.tipopedido_tar = t4.id_tpd ");
  
          $response['data'] = $data;
          // $response['data'] = $data1;
          $response['message'] = "load successful";
          $response['success'] = true;
      
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
          return $response;
      }
    
      public function get($id_tar){
        try { 
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est, t3.nombre_zon, t4.descripcion_tpd
          FROM tarifas as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 INNER JOIN zonas as t3 INNER JOIN tipospedidos as t4
          WHERE t0.id_tar = $id_tar and t0.empresa_tar = t1.id_emp and t0.estado_tar = t2.id_est and t0.tipozona_tar = t3.id_zon and
                t0.tipopedido_tar = t4.id_tpd");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_tar => $id_tar";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }

      public function leetarifa($codigo){
        try { 
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est, t3.nombre_zon, t4.descripcion_tpd
          FROM tarifas as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 INNER JOIN zonas as t3 INNER JOIN tipospedidos as t4
          WHERE t0.codigotarifa_tar = $codigo and t0.empresa_tar = t1.id_emp and t0.estado_tar = t2.id_est and t0.tipozona_tar = t3.id_zon and
                t0.tipopedido_tar = t4.id_tpd");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_tar => $id_tar";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }
    
      public function update(Request $request, $id_tar){
        try {
            $data['nombre_tar']        = $request['nombre_tar'];
            $data['tipozona_tar']      = $request['tipozona_tar'];
            $data['origen_tar']        = $request['origen_tar'];
            $data['ciudadorigen_tar']  = $request['ciudadorigen_tar'];
            $data['destino_tar']       = $request['destino_tar'];
            $data['ciudaddestino_tar'] = $request['ciudaddestino_tar'];
            $data['codigotarifa_tar']  = $request['codigotarifa_tar'];
            $data['tipopedido_tar']    = $request['tipopedido_tar'];
            $data['empresa_tar']       = $request['empresa_tar'];
            $data['valor_tar']         = $request['valor_tar'];
            $data['estado_tar']        = $request['estado_tar'];
            $data['observacion_tar']   = $request['observacion_tar'];
    
            $res = Tarifas::where("id_tar",$id_tar)->update($data);
    
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      }
    
      public function delete($id_tar){ 
        try {
          $res = Tarifas::where("id_tar",$id_tar)->delete($id_tar);
          $response['res'] = $res;
    
          $response['message'] = "Deleted successful";
          $response['success'] = true; 
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
          return $response;
      }
}
