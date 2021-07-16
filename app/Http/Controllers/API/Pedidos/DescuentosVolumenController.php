<?php

namespace App\Http\Controllers\API\Pedidos;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pedidos\DescuentosVolumen;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Estados;

class DescuentosVolumenController extends Controller
{
    //
    public function create(Request $request){

        try {
            $insert['nombre_dvo']      = $request['nombre_dvo'];
            $insert['descripcion_dvo'] = $request['descripcion_dvo'];
            $insert['valor_dvo']       = $request['valor_dvo'];
            $insert['empresa_dvo']     = $request['empresa_dvo'];
            $insert['estado_dvo']      = $request['estado_dvo'];
  
            DescuentosVolumen::insert($insert);
    
            $response['message'] = "Descuento por volumen Creado de forma correcta";
            $response['success'] = true;
    
        }   catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        } 
        return $response;
    }
  
    public function listar_descuentosvolumen(){

        try {
            //$data = TiposCategorias::with("empresa")->get();

            $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est 
            FROM descuentosvolumen as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 
            WHERE t0.empresa_dvo = t1.id_emp and t0.estado_dvo = t2.id_est" );
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function get($id_dvo){
  
        try {
            //$data = TiposCategorias::find($id_dvo);
            
            $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est 
            FROM descuentosvolumen as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 
            WHERE t0.id_dvo = $id_dvo and t0.empresa_dvo = t1.id_emp and t0.estado_dvo = t2.id_est" );
    
            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data id_dvo => $id_dvo";
              $response['success'] = false;
            }
    
            } catch (\Exception $e) {
                $response['message'] = $e->getMessage();
                $response['success'] = false;
            }
        return $response;
        }
  
    public function update(Request $request, $id_dvo){
  
        try {
            $data['nombre_dvo']      = $request['nombre_dvo'];
            $data['descripcion_dvo'] = $request['descripcion_dvo'];
            $data['valor_dvo']       = $request['valor_dvo'];
            $data['empresa_dvo']     = $request['empresa_dvo'];
            $data['estado_dvo']      = $request['estado_dvo'];

            //Console::info('mymessage');
  
            $res = DescuentosVolumen::where("id_dvo",$id_dvo)->update($data);
  
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
    
        }   catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function delete($id_dvo){
  
        try {
            $res = DescuentosVolumen::where("id_dvo",$id_dvo)->delete($id_dvo);
            $response['res'] = $res;
  
            $response['message'] = "Deleted successful";
            $response['success'] = true; 
            
        }   catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    } 
}
