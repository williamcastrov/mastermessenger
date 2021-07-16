<?php

namespace App\Http\Controllers\API\Pedidos;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Parameters\Estados;
use App\Models\Pedidos\Zonas;

class ZonasController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['nombre_zon']      = $request['nombre_zon'];
          $insert['descripcion_zon'] = $request['descripcion_zon'];
          $insert['estado_zon']      = $request['estado_zon'];
              
          Zonas::insert($insert);
      
          $response['message'] = "Zona Tarifas Grabada de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }
    
      public function listar_zonas(){  
        try {
          $data = DB::select("SELECT t0.*, t1.nombre_est
          FROM zonas as t0 INNER JOIN estados as t1
          WHERE t0.estado_zon = t1.id_est ");
  
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
    
      public function get($id_zon){
        try { 
            $data = DB::select("SELECT t0.*, t1.nombre_est
            FROM zonas as t0 INNER JOIN estados as t1
            WHERE t0.estado_zon = t1.id_est and  t0.id_zon = $id_zon ");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_zon => $id_zon";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }
    
      public function update(Request $request, $id_zon){
        try {
            $data['nombre_zon']      = $request['nombre_zon'];
            $data['descripcion_zon'] = $request['descripcion_zon'];
            $data['estado_zon']      = $request['estado_zon'];  
    
            $res = Zonas::where("id_zon",$id_zon)->update($data);
    
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }
    
      public function delete($id_zon){ 
        try {
          $res = Zonas::where("id_zon",$id_zon)->delete($id_zon);
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
