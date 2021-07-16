<?php

namespace App\Http\Controllers\API\Tiquetera;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tiquetera\Tiquetera;
use App\Models\Interlocutores\Clientes;
use App\Models\Parameters\Estados;
use App\Models\Tiquetera\TiposTiquetera;

class TiqueteraController extends Controller
{
    //
    public function create(Request $request){

        try {
            $insert['id_tik']            = $request['id_tik'];
            $insert['nombre_tik']        = $request['nombre_tik'];
            $insert['tipotiquetera_tik'] = $request['tipotiquetera_tik'];
            $insert['cliente_tik']       = $request['cliente_tik'];
            $insert['valor_tik']         = $request['valor_tik'];
            $insert['valorconsumo_tik']  = $request['valorconsumo_tik'];
            $insert['saldo_tik']         = $request['saldo_tik'];
            $insert['estado_tik']        = $request['estado_tik'];
            $insert['observacion_tik']   = $request['observacion_tik'];
  
            Tiquetera::insert($insert);
    
            $response['message'] = "Tiquetera Creada de forma correcta";
            $response['success'] = true;
    
        }   catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        } 
        return $response;
    }
  
    public function listar_tiquetera(){
  
        try {
            //$data = TiposCategorias::with("empresa")->get();

            $data = DB::select("SELECT t0.*, t1.primer_nombre_cli, t1.segundo_nombre_cli, t1.primer_apellido_cli, t1.razonsocial_cli,
                                             t1.segundo_apellido_cli, t2.nombre_est, t3.nombre_ttk, t3.valor_ttk, t3.estado_ttk
            FROM tiquetera as t0 INNER JOIN clientes as t1 INNER JOIN estados as t2 INNER JOIN tipostiquetera as t3
            WHERE t0.cliente_tik = t1.id_cli and t0.estado_tik = t2.id_est and t0.tipotiquetera_tik = t3.id_ttk" );
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function get($id_tik){
  
        try {
            //$data = TiposCategorias::find($id_tik);
            
            $data = DB::select("SELECT t0.*, t1.primer_nombre_cli, t1.segundo_nombre_cli, t1.primer_apellido_cli, t1.razonsocial_cli,
                                             t1.segundo_apellido_cli, t2.nombre_est, t3.nombre_ttk, t3.valor_ttk, t3.estado_ttk
            FROM tiquetera as t0 INNER JOIN clientes as t1 INNER JOIN estados as t2 INNER JOIN tipostiquetera as t3
            WHERE t0.cliente_tik = t1.id_cli and t0.estado_tik = t2.id_est and t0.tipotiquetera_tik = t3.id_ttk and
                  t0.id_tik      = $id_tik");
            
            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data id_tik => $id_tik";
              $response['success'] = false;
            }
    
            } catch (\Exception $e) {
                $response['message'] = $e->getMessage();
                $response['success'] = false;
            }
        return $response;
    }

    public function leertiqueteracliente($cliente){
  
        try {
            //$data = TiposCategorias::find($id_tik);
            
            $data = DB::select("SELECT t0.*, t1.primer_nombre_cli, t1.segundo_nombre_cli, t1.primer_apellido_cli, t1.razonsocial_cli,
                                             t1.segundo_apellido_cli, t2.nombre_est, t3.nombre_ttk, t3.valor_ttk, t3.estado_ttk
            FROM tiquetera as t0 INNER JOIN clientes as t1 INNER JOIN estados as t2 INNER JOIN tipostiquetera as t3
            WHERE t0.cliente_tik = t1.id_cli and t0.estado_tik = t2.id_est and t0.tipotiquetera_tik = t3.id_ttk and
                  t0.cliente_tik = $cliente");
            
            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data id_tik => $id_tik";
              $response['success'] = false;
            }
    
            } catch (\Exception $e) {
                $response['message'] = $e->getMessage();
                $response['success'] = false;
            }
        return $response;
    }
  
    public function update(Request $request, $id_tik){
  
        try {
            $data['id_tik']            = $request['id_tik'];
            $data['nombre_tik']        = $request['nombre_tik'];
            $data['tipotiquetera_tik'] = $request['tipotiquetera_tik'];
            $data['cliente_tik']       = $request['cliente_tik'];
            $data['valor_tik']         = $request['valor_tik'];
            $data['valorconsumo_tik']  = $request['valorconsumo_tik'];
            $data['saldo_tik']         = $request['saldo_tik'];
            $data['estado_tik']        = $request['estado_tik'];
            $data['observacion_tik']   = $request['observacion_tik'];

            //Console::info('mymessage');
  
            $res = Tiquetera::where("id_tik",$id_tik)->update($data);
  
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
    
        }   catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function delete($id_tik){
  
        try {
            $res = Tiquetera::where("id_tik",$id_tik)->delete($id_tik);
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
