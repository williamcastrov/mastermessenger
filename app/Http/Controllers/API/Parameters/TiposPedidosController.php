<?php

namespace App\Http\Controllers\API\Parameters;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Estados;
use App\Models\Parameters\TiposPedidos;

class TiposPedidosController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['descripcion_tpd']  = $request['descripcion_tpd'];
          $insert['empresa_tpd']      = $request['empresa_tpd'];
          $insert['estado_tpd']       = $request['estado_tpd'];
              
          TiposPedidos::insert($insert);
      
          $response['message'] = "Tipo de Pedido Grabado de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }
    
      public function listar_tipospedidos(){  
        try {
          
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est
          FROM tipospedidos as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2
          WHERE t0.empresa_tpd = t1.id_emp and t0.estado_tpd = t2.id_est ");
  
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
    
      public function get($id_tpd){
        try { 
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est
          FROM tipospedidos as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2
          WHERE t0.id_tpd = $id_tpd and t0.empresa_tpd = t1.id_emp and t0.estado_tpd = t2.id_est");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_tpd => $id_tpd";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }
    
      public function update(Request $request, $id_tpd){
        try {
          $data['descripcion_tpd']  = $request['descripcion_tpd'];
          $data['empresa_tpd']      = $request['empresa_tpd'];
          $data['estado_tpd']       = $request['estado_tpd'];
    
          $res = TiposPedidos::where("id_tpd",$id_tpd)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      }
    
      public function delete($id_tpd){ 
        try {
          $res = TiposPedidos::where("id_tpd",$id_tpd)->delete($id_tpd);
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
