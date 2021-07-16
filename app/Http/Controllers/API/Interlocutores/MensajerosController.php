<?php

namespace App\Http\Controllers\API\Interlocutores;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Interlocutores\Mensajeros;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Estados;
use App\Models\Parameters\Ciudades;
use App\Models\Interlocutores\TipoInterlocutores;

class MensajerosController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['codigo_tipo_men']        = $request['codigo_tipo_men'];
          $insert['nit_men']                = $request['nit_men'];
          $insert['digitochequeo_men']      = $request['digitochequeo_men'];
          $insert['estado_men']             = $request['estado_men'];
          $insert['primer_nombre_men']      = $request['primer_nombre_men'];
          $insert['segundo_nombre_men']     = $request['segundo_nombre_men'];
          $insert['primer_apellido_men']    = $request['primer_apellido_men'];
          $insert['segundo_apellido_men']   = $request['segundo_apellido_men'];
          $insert['ciudad_men']             = $request['ciudad_men'];
          $insert['direccion_men']          = $request['direccion_men'];
          $insert['telefono_men']           = $request['telefono_men'];
          $insert['email_men']              = $request['email_men'];
          $insert['empresa_men']            = $request['empresa_men'];
          $insert['fecha_creacion_men']     = $request['fecha_creacion_men'];
          $insert['fecha_modificacion_men'] = $request['fecha_modificacion_men'];
          $insert['horainicia_men']         = $request['horainicia_men'];
          $insert['horafinal_men']          = $request['horafinal_men'];
              
          Mensajeros::insert($insert);
      
          $response['message'] = "Mensajeros Grabado de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }
    
      public function listar_mensajeros(){  
        try {
          //Muestra Unicamente los tipos de Interlocutores Mensajeros = 2
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est, t3.nombre_ciu, t4.descripcion_tint
          FROM mensajeros as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 INNER JOIN ciudades as t3
                                INNER JOIN tipo_interlocutor as t4
          WHERE t0.codigo_tipo_men = 1 and t0.empresa_men = t1.id_emp and t0.estado_men = t2.id_est 
          and t0.ciudad_men = t3.id_ciu and t0.codigo_tipo_men = t4.id_tint");
    
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

      public function listar_mensajerosOT(){  
        try {
          //Muestra Unicamente los tipos de Interlocutores EMPLEADOS = 2
          $data = DB::select("SELECT t0.*, t1.nombre_men, t2.nombre_est, t3.nombre_ciu, t4.descripcion_tint
          FROM mensajeros as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 INNER JOIN ciudades as t3
                               INNER JOIN tipo_interlocutor as t5
          WHERE t0.codigo_tipo_men  = 1         and t0.empresa_men      = t1.id_men and t0.estado_men     = t2.id_est 
            and t0.ciudad_men       = t3.id_ciu and t0.codigo_tipo_men = t4.id_tint");
    
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
    
      public function get($id_men){
        try { 
          //$data = Frecuencias::find($id_fre);
          $data = DB::select("SELECT t0.*, t1.nombre_men, t2.nombre_est, t3.nombre_ciu, t4.descripcion_tint
          FROM mensajeros as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 INNER JOIN ciudades as t3
                                INNER JOIN tipo_interlocutor as t5
          WHERE t0.codigo_tipo_men = 1         and t0.empresa_men     = t1.id_men and t0.estado_men = t2.id_est 
            and t0.ciudad_men      = t3.id_ciu and t0.codigo_tipo_men = t4.id_tint and t0.id_men    = $id_men");
        
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_men => $id_men";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }
    
      public function update(Request $request, $id_men){
        try {
            $data['codigo_tipo_men']        = $request['codigo_tipo_men'];
            $data['nit_men']                = $request['nit_men'];
            $data['digitochequeo_men']      = $request['digitochequeo_men'];
            $data['estado_men']             = $request['estado_men'];
            $data['primer_nombre_men']      = $request['primer_nombre_men'];
            $data['segundo_nombre_men']     = $request['segundo_nombre_men'];
            $data['primer_apellido_men']    = $request['primer_apellido_men'];
            $data['segundo_apellido_men']   = $request['segundo_apellido_men'];
            $data['ciudad_men']             = $request['ciudad_men'];
            $data['direccion_men']          = $request['direccion_men'];
            $data['telefono_men']           = $request['telefono_men'];
            $data['email_men']              = $request['email_men'];
            $data['empresa_men']            = $request['empresa_men'];
            $data['fecha_creacion_men']     = $request['fecha_creacion_men'];
            $data['fecha_modificacion_men'] = $request['fecha_modificacion_men'];
            $data['horainicia_men']         = $request['horainicia_men'];
            $data['horafinal_men']          = $request['horafinal_men'];
    
          $res = Mensajeros::where("id_men",$id_men)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      }
    
      public function delete($id_men){ 
        try {
          $res = Mensajeros::where("id_men",$id_men)->delete($id_men);
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
