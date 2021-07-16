<?php

namespace App\Http\Controllers\API\Interlocutores;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Interlocutores\DireccionRecogida;
use App\Models\Interlocutores\Clientes;
use App\Models\Parameters\Estados;
use App\Models\Parameters\Ciudades;

class DireccionRecogidaController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['id_drc']          = $request['id_drc'];
          $insert['cliente_drc']     = $request['cliente_drc'];
          $insert['nombre_drc']      = $request['nombre_drc'];
          $insert['direccion_drc']   = $request['direccion_drc'];
          $insert['ciudad_drc']      = $request['ciudad_drc'];
          $insert['estado_drc']      = $request['estado_drc'];
          $insert['observacion_drc'] = $request['observacion_drc'];
          
          DireccionRecogida::insert($insert);
      
          $response['message'] = "Direccioón Recogida Grabada de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }
    
      public function listar_direccionrecogida(){  
        try {
          //Muestra Unicamente los tipos de DireccionRecogida PROVEEDORES = 1
          $data = DB::select("SELECT t0.*, t1.nombre_est, t2.nombre_ciu, t3.primer_nombre_cli, t3.segundo_nombre_cli, t3.primer_apellido_cli,
                                     t3.segundo_apellido_cli
          FROM direccionrecogida as t0 INNER JOIN estados as t1 INNER JOIN ciudades as t2 INNER JOIN clientes as t3
          WHERE t0.estado_drc = t1.id_est and t0.ciudad_drc = t2.id_ciu and t0.cliente_drc = t3.id_cli");
    
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

      public function direccionrecogidaclientes($cliente_drc){
        try { 
          //$data = Frecuencias::find($id_fre);
          $data = DB::select("SELECT t0.*, t1.nombre_est, t2.nombre_ciu, t3.primer_nombre_cli, t3.segundo_nombre_cli, t3.primer_apellido_cli,
                                     t3.segundo_apellido_cli
          FROM direccionrecogida as t0 INNER JOIN estados as t1 INNER JOIN ciudades as t2 INNER JOIN clientes as t3
          WHERE t0.estado_drc = t1.id_est and t0.ciudad_drc = t2.id_ciu and t0.cliente_drc = t3.id_cli and 
                t0.cliente_drc = $cliente_drc"); 
  
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_drc => $id_drc";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }
    
      public function get($id_drc){
        try { 
          //$data = Frecuencias::find($id_fre);
          $data = DB::select("SELECT t0.*, t1.nombre_est, t2.nombre_ciu, t3.primer_nombre_cli, t3.segundo_nombre_cli, t3.primer_apellido_cli,
                                     t3.segundo_apellido_cli
          FROM  direccionrecogida as t0 INNER JOIN estados as t1 INNER JOIN ciudades as t2 INNER JOIN clientes as t3
          WHERE t0.estado_drc = t1.id_est and t0.ciudad_drc = t2.id_ciu and t0.cliente_drc = t3.id_cli and 
                t0.id_drc = $id_drc"); 
          
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_drc => $id_drc";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }
    
      public function update(Request $request, $id_drc){
        try {
            $data['id_drc']          = $request['id_drc'];
            $data['cliente_drc']     = $request['cliente_drc'];
            $data['nombre_drc']      = $request['nombre_drc'];
            $data['direccion_drc']   = $request['direccion_drc'];
            $data['ciudad_drc']      = $request['ciudad_drc'];
            $data['estado_drc']      = $request['estado_drc'];
            $data['observacion_drc'] = $request['observacion_drc'];
    
          $res = DireccionRecogida::where("id_drc",$id_drc)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      }
    
      public function delete($id_drc){ 
        try {
          $res = DireccionRecogida::where("id_drc",$id_drc)->delete($id_drc);
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
