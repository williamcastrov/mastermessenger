<?php

namespace App\Http\Controllers\API\Tiquetera;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tiquetera\TiposTiquetera;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Estados;

class TiposTiqueteraController extends Controller
{
    //
    public function create(Request $request){

        try {
            $insert['nombre_ttk']      = $request['nombre_ttk'];
            $insert['descripcion_ttk'] = $request['descripcion_ttk'];
            $insert['valor_ttk']       = $request['valor_ttk'];
            $insert['empresa_ttk']     = $request['empresa_ttk'];
            $insert['estado_ttk']      = $request['estado_ttk'];
  
            TiposTiquetera::insert($insert);
    
            $response['message'] = "Tipo de Tiquetera Creado de forma correcta";
            $response['success'] = true;
    
        }   catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        } 
        return $response;
    }
  
    public function listar_tipostiquetera(){
  
        try {
            //$data = TiposCategorias::with("empresa")->get();

            $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est 
            FROM tipostiquetera as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 
            WHERE t0.empresa_ttk = t1.id_emp and t0.estado_ttk = t2.id_est" );
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function get($id_ttk){
  
        try {
            //$data = TiposCategorias::find($id_ttk);
            
            $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est 
            FROM tipostiquetera as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 
            WHERE t0.id_ttk = $id_ttk and t0.empresa_ttk = t1.id_emp and t0.estado_ttk = t2.id_est" );
    
            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data id_ttk => $id_ttk";
              $response['success'] = false;
            }
    
            } catch (\Exception $e) {
                $response['message'] = $e->getMessage();
                $response['success'] = false;
            }
        return $response;
        }
  
    public function update(Request $request, $id_ttk){
  
        try {
            $data['nombre_ttk']      = $request['nombre_ttk'];
            $data['descripcion_ttk'] = $request['descripcion_ttk'];
            $data['valor_ttk']       = $request['valor_ttk'];
            $data['empresa_ttk']     = $request['empresa_ttk'];
            $data['estado_ttk']      = $request['estado_ttk'];

            //Console::info('mymessage');
  
            $res = TiposTiquetera::where("id_ttk",$id_ttk)->update($data);
  
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
    
        }   catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function delete($id_ttk){
  
        try {
            $res = TiposTiquetera::where("id_ttk",$id_ttk)->delete($id_ttk);
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
