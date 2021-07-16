<?php

namespace App\Http\Controllers\API\Interlocutores;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Interlocutores\DireccionEntrega;
use App\Models\Interlocutores\Clientes;
use App\Models\Parameters\Estados;
use App\Models\Parameters\Ciudades;

class DireccionEntregaController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['id_den']          = $request['id_den'];
          $insert['cliente_den']     = $request['cliente_den'];
          $insert['nombre_den']      = $request['nombre_den'];
          $insert['direccion_den']   = $request['direccion_den'];
          $insert['ciudad_den']      = $request['ciudad_den'];
          $insert['estado_den']      = $request['estado_den'];
          $insert['observacion_den'] = $request['observacion_den'];
          
         DireccionEntrega::insert($insert);
      
          $response['message'] = "Direccioón Entrega Grabada de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }
    
      public function listar_direccionentrega(){  
        try {
          //Muestra Unicamente los tipos deDireccionEntrega PROVEEDORES = 1
          $data = DB::select("SELECT t0.*, t1.nombre_est, t2.nombre_ciu, t3.primer_nombre_cli, t3.segundo_nombre_cli, t3.primer_apellido_cli,
                                     t3.segundo_apellido_cli
          FROM direccionentrega as t0 INNER JOIN estados as t1 INNER JOIN ciudades as t2 INNER JOIN clientes as t3
          WHERE t0.estado_den = t1.id_est and t0.ciudad_den = t2.id_ciu and t0.cliente_den = t3.id_cli");
    
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

      public function direccionentregaclientes($cliente_den){
        try { 
          //$data = Frecuencias::find($id_fre);
          $data = DB::select("SELECT t0.*, t1.nombre_est, t2.nombre_ciu, t3.primer_nombre_cli, t3.segundo_nombre_cli, t3.primer_apellido_cli,
                                     t3.segundo_apellido_cli
          FROM direccionentrega as t0 INNER JOIN estados as t1 INNER JOIN ciudades as t2 INNER JOIN clientes as t3
          WHERE t0.estado_den = t1.id_est and t0.ciudad_den = t2.id_ciu and t0.cliente_den = t3.id_cli and 
                t0.cliente_den = $cliente_den"); 
  
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_den => $id_den";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }
    
      public function get($id_den){
        try { 
          //$data = Frecuencias::find($id_fre);
          $data = DB::select("SELECT t0.*, t1.nombre_est, t2.nombre_ciu, t3.primer_nombre_cli, t3.segundo_nombre_cli, t3.primer_apellido_cli,
                                     t3.segundo_apellido_cli
          FROM  direccionentrega as t0 INNER JOIN estados as t1 INNER JOIN ciudades as t2 INNER JOIN clientes as t3
          WHERE t0.estado_den = t1.id_est and t0.ciudad_den = t2.id_ciu and t0.cliente_den = t3.id_cli and 
                t0.id_den = $id_den"); 
          
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_den => $id_den";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }
    
      public function update(Request $request, $id_den){
        try {
            $data['id_den']          = $request['id_den'];
            $data['cliente_den']     = $request['cliente_den'];
            $data['nombre_den']      = $request['nombre_den'];
            $data['direccion_den']   = $request['direccion_den'];
            $data['ciudad_den']      = $request['ciudad_den'];
            $data['estado_den']      = $request['estado_den'];
            $data['observacion_den'] = $request['observacion_den'];
    
          $res =DireccionEntrega::where("id_den",$id_den)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      }
    
      public function delete($id_den){ 
        try {
          $res =DireccionEntrega::where("id_den",$id_den)->delete($id_den);
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
