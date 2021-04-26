<?php

namespace App\Http\Controllers\API\Parameters;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Parameters\Estados;
use App\Models\Parameters\Empresa;

class EstadosController extends Controller
{
    //
    public function create(Request $request){

        try {
            $insert['nombre_est']  = $request['nombre_est'];
            $insert['empresa_est'] = $request['empresa_est'];
  
            Estados::insert($insert);
    
            $response['message'] = "Estado Grabado de forma correcta";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
           
          return $response;
        }
  
        public function listar_estados(){
  
          try {
  
            $data = DB::select("SELECT t0.*, t1.nombre_emp
            FROM estados as t0 INNER JOIN empresa as t1
            WHERE t0.empresa_est = t1.id_emp");
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
        }

        public function listar_estadosgenerales(){  
          try {
            
            $data = DB::select("SELECT t0.*, t1.nombre_emp
            FROM estados as t0 INNER JOIN empresa as t1
            WHERE t0.empresa_est = t1.id_emp");
    
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

        public function listar_estadosOT(){  
          try {
            
            $data = DB::select("SELECT t0.*, t1.nombre_emp
            FROM estados as t0 INNER JOIN empresa as t1
            WHERE t0.empresa_est = t1.id_emp");
    
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
  
        public function listar_estadosequipos(){  
          try {
            
            $data = DB::select("SELECT t0.*, t1.nombre_emp
            FROM estados as t0 INNER JOIN empresa as t1
            WHERE t0.empresa_est = t1.id_emp");
    
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
  
        public function get($id_est){
  
          try {
    
            $data = DB::select("SELECT t0.*, t1.nombre_emp
            FROM estados as t0 INNER JOIN empresa as t1
            WHERE t0.empresa_est = t1.id_emp and t0.id_est = $id_est");
    
            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data id_est => $id_est";
              $response['success'] = false;
            }
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
        }
  
        public function update(Request $request, $id_est){
  
          try {
            $data['nombre_est']         = $request['nombre_est'];
            $data['empresa_est']        = $request['empresa_est'];
  
            //Console::info('mymessage');
  
            $res = Estados::where("id_est",$id_est)->update($data);
  
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
    
        }
  
        public function delete($id_est){
  
          try {
            $res = Estados::where("id_est",$id_est)->delete($id_est);
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
