<?php

namespace App\Http\Controllers\API\Interlocutores;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Interlocutores\TiposCategorias;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Estados;

class TiposCategoriasController extends Controller
{
    //
    public function create(Request $request){

        try {
            $insert['nombre_tcg']      = $request['nombre_tcg'];
            $insert['descripcion_tcg'] = $request['descripcion_tcg'];
            $insert['valor_tcg']       = $request['valor_tcg'];
            $insert['empresa_tcg']     = $request['empresa_tcg'];
            $insert['estado_tcg']      = $request['estado_tcg'];
  
            TiposCategorias::insert($insert);
    
            $response['message'] = "Tipo de Categorias Creado de forma correcta";
            $response['success'] = true;
    
        }   catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        } 
        return $response;
    }
  
    public function listar_tiposcategorias(){
  
        try {
            //$data = TiposCategorias::with("empresa")->get();

            $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est 
            FROM tiposcategoria as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 
            WHERE t0.empresa_tcg = t1.id_emp and t0.estado_tcg = t2.id_est" );
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function get($id_tcg){
  
        try {
            //$data = TiposCategorias::find($id_tcg);
            
            $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est 
            FROM tiposcategoria as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 
            WHERE t0.id_tcg = $id_tcg and t0.empresa_tcg = t1.id_emp and t0.estado_tcg = t2.id_est" );
    
            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data id_tcg => $id_tcg";
              $response['success'] = false;
            }
    
            } catch (\Exception $e) {
                $response['message'] = $e->getMessage();
                $response['success'] = false;
            }
        return $response;
        }
  
    public function update(Request $request, $id_tcg){
  
        try {
            $data['nombre_tcg']      = $request['nombre_tcg'];
            $data['descripcion_tcg'] = $request['descripcion_tcg'];
            $data['valor_tcg']       = $request['valor_tcg'];
            $data['empresa_tcg']     = $request['empresa_tcg'];
            $data['estado_tcg']      = $request['estado_tcg'];

            //Console::info('mymessage');
  
            $res = TiposCategorias::where("id_tcg",$id_tcg)->update($data);
  
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
    
        }   catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function delete($id_tcg){
  
        try {
            $res = TiposCategorias::where("id_tcg",$id_tcg)->delete($id_tcg);
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