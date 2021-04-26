<?php

namespace App\Http\Controllers\API\Usuarios;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Usuarios\Usuarios;

class UsuariosController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['uidfirebase_usu']     = $request['uidfirebase_usu'];
          $insert['email_usu']           = $request['email_usu'];
          $insert['nombre_usu']          = $request['nombre_usu'];
          $insert['primerapellido_usu']  = $request['primerapellido_usu'];
          $insert['segundoapellido_usu'] = $request['segundoapellido_usu'];
          $insert['direccion_usu']       = $request['direccion_usu'];
          $insert['estado_usu']          = $request['estado_usu'];
              
          Usuarios::insert($insert);
      
          $response['message'] = "Usuario Grabado de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }
    
      public function listar_usuarios(){  
        try {
          
          $data = DB::select("SELECT t0.*
          FROM usuarios as t0 ");
  
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

      public function get($id_usu){
        try { 
          $data = DB::select("SELECT t0.*
          FROM usuarios as t0
          WHERE t0.id_usu = $id_usu");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_usu => $id_usu";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }
    
      public function update(Request $request, $id_usu){
        try {
          $data['uidfirebase_usu']     = $request['uidfirebase_usu'];
          $data['email_usu']           = $request['email_usu'];
          $data['nombre_usu']          = $request['nombre_usu'];
          $data['primerapellido_usu']  = $request['primerapellido_usu'];
          $data['segundoapellido_usu'] = $request['segundoapellido_usu'];
          $data['direccion_usu']       = $request['direccion_usu'];
          $data['estado_usu']          = $request['estado_usu'];
    
          $res = Usuarios::where("id_usu",$id_usu)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      }
    
      public function delete($id_usu){ 
        try {
          $res = Usuarios::where("id_usu",$id_usu)->delete($id_usu);
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
