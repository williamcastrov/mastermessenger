<?php

namespace App\Http\Controllers\API\Interlocutores;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Interlocutores\Clientes;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Estados;
use App\Models\Parameters\Ciudades;
use App\Models\Interlocutores\TipoInterlocutores;
use App\Models\Interlocutores\Especialidades;

class ClientesController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['codigo_tipo_cli']        = $request['codigo_tipo_cli'];
          $insert['nit_cli']                = $request['nit_cli'];
          $insert['digitochequeo_cli']      = $request['digitochequeo_cli'];
          $insert['estado_cli']             = $request['estado_cli'];
          $insert['primer_nombre_cli']      = $request['primer_nombre_cli'];
          $insert['segundo_nombre_cli']     = $request['segundo_nombre_cli'];
          $insert['primer_apellido_cli']    = $request['primer_apellido_cli'];
          $insert['segundo_apellido_cli']   = $request['segundo_apellido_cli'];
          $insert['razonsocial_cli']        = $request['razonsocial_cli'];
          $insert['ciudad_cli']             = $request['ciudad_cli'];
          $insert['direccion_cli']          = $request['direccion_cli'];
          $insert['telefono_cli']           = $request['telefono_cli'];
          $insert['email_cli']              = $request['email_cli'];
          $insert['empresa_cli']            = $request['empresa_cli'];
          $insert['fecha_creacion_cli']     = $request['fecha_creacion_cli'];
          $insert['fecha_modificacion_cli'] = $request['fecha_modificacion_cli'];
          $insert['descuentovolumen_cli']   = $request['descuentovolumen_cli'];
          $insert['valordescuento_cli']     = $request['valordescuento_cli'];
          $insert['especialidad_cli']       = $request['especialidad_cli'];
              
          Clientes::insert($insert);
      
          $response['message'] = "Cliente Grabado de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }
    
      public function listar_clientes(){  
        try {
          //Muestra Unicamente los tipos de Interlocutores CLIENTES = 2
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est, t3.nombre_ciu, t4.descripcion_tint
          FROM clientes as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 INNER JOIN ciudades as t3
                              INNER JOIN tipo_interlocutor as t4
          WHERE t0.codigo_tipo_cli = 2    and t0.empresa_cli     = t1.id_emp and t0.estado_cli = t2.id_est 
            and t0.ciudad_cli = t3.id_ciu and t0.codigo_tipo_cli = t4.id_tint
          ORDER BY razonsocial_cli ASC");
  
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
    
      public function get($id_cli){
        try { 
          //$data = Frecuencias::find($id_fre);
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est, t3.nombre_ciu, t4.descripcion_tint
          FROM clientes as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 INNER JOIN ciudades as t3
                              INNER JOIN tipo_interlocutor as t4
          WHERE t0.codigo_tipo_cli = 2    and t0.empresa_cli     = t1.id_emp and t0.estado_cli = t2.id_est 
            and t0.ciudad_cli = t3.id_ciu and t0.codigo_tipo_cli = t4.id_tint and t0.id_cli = $id_cli");
          
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_cli => $id_cli";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }
    
      public function update(Request $request, $id_cli){
        try {
          $data['codigo_tipo_cli']        = $request['codigo_tipo_cli'];
          $data['nit_cli']                = $request['nit_cli'];
          $data['digitochequeo_cli']      = $request['digitochequeo_cli'];
          $data['estado_cli']             = $request['estado_cli'];
          $data['primer_nombre_cli']      = $request['primer_nombre_cli'];
          $data['segundo_nombre_cli']     = $request['segundo_nombre_cli'];
          $data['primer_apellido_cli']    = $request['primer_apellido_cli'];
          $data['segundo_apellido_cli']   = $request['segundo_apellido_cli'];
          $data['razonsocial_cli']        = $request['razonsocial_cli'];
          $data['ciudad_cli']             = $request['ciudad_cli'];
          $data['direccion_cli']          = $request['direccion_cli'];
          $data['telefono_cli']           = $request['telefono_cli'];
          $data['email_cli']              = $request['email_cli'];
          $data['empresa_cli']            = $request['empresa_cli'];
          $data['fecha_creacion_cli']     = $request['fecha_creacion_cli'];
          $data['fecha_modificacion_cli'] = $request['fecha_modificacion_cli'];
          $data['descuentovolumen_cli']   = $request['descuentovolumen_cli'];
          $data['valordescuento_cli']     = $request['valordescuento_cli'];
          $data['especialidad_cli']       = $request['especialidad_cli'];
    
          $res = Clientes::where("id_cli",$id_cli)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      }
    
      public function delete($id_cli){ 
        try {
          $res = Clientes::where("id_cli",$id_cli)->delete($id_cli);
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
