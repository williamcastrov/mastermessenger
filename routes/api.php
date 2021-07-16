<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/mastermessenger', 'App\Http\Controllers\MasterMessengerController@index');

// Rutas definidas para los Parametros del Sistema
Route::get('/paises/listar_paises', 'App\Http\Controllers\API\Parameters\PaisesController@listar_paises');
Route::post('/paises/create', 'App\Http\Controllers\API\Parameters\PaisesController@create');
Route::get('/paises/get/{id}', 'App\Http\Controllers\API\Parameters\PaisesController@get');
Route::delete('/paises/delete/{id}', 'App\Http\Controllers\API\Parameters\PaisesController@delete');
Route::put('/paises/update/{id}', 'App\Http\Controllers\API\Parameters\PaisesController@update');

Route::get('/regiones/listar_regiones', 'App\Http\Controllers\API\Parameters\RegionesController@listar_regiones');
Route::post('/regiones/create', 'App\Http\Controllers\API\Parameters\RegionesController@create');
Route::get('/regiones/get/{id}', 'App\Http\Controllers\API\Parameters\RegionesController@get');
Route::delete('/regiones/delete/{id}', 'App\Http\Controllers\API\Parameters\RegionesController@delete');
Route::put('/regiones/update/{id}', 'App\Http\Controllers\API\Parameters\RegionesController@update');

Route::get('/departamentos/listar_departamentos', 'App\Http\Controllers\API\Parameters\DepartamentosController@listar_departamentos');
Route::post('/departamentos/create', 'App\Http\Controllers\API\Parameters\DepartamentosController@create');
Route::get('/departamentos/get/{id}', 'App\Http\Controllers\API\Parameters\DepartamentosController@get');
Route::delete('/departamentos/delete/{id}', 'App\Http\Controllers\API\Parameters\DepartamentosController@delete');
Route::put('/departamentos/update/{id}', 'App\Http\Controllers\API\Parameters\DepartamentosController@update');

Route::get('/ciudades/listar_ciudades', 'App\Http\Controllers\API\Parameters\CiudadesController@listar_ciudades');
Route::post('/ciudades/create', 'App\Http\Controllers\API\Parameters\CiudadesController@create');
Route::get('/ciudades/get/{id}', 'App\Http\Controllers\API\Parameters\CiudadesController@get');
Route::delete('/ciudades/delete/{id}', 'App\Http\Controllers\API\Parameters\CiudadesController@delete');
Route::put('/ciudades/update/{id}', 'App\Http\Controllers\API\Parameters\CiudadesController@update');

Route::get('/usuarios/listar_usuarios', 'App\Http\Controllers\API\UsuariosController@listar_usuarios');
Route::get('/usuarios/leer_usuario/{id}', 'App\Http\Controllers\API\UsuariosController@leer_usuario');
Route::post('/usuarios/create', 'App\Http\Controllers\API\UsuariosController@create');
Route::get('/usuarios/get/{id}', 'App\Http\Controllers\API\UsuariosController@get');
Route::put('/usuarios/update/{id}', 'App\Http\Controllers\API\UsuariosController@update');
Route::delete('/usuarios/delete/{id}', 'App\Http\Controllers\API\UsuariosController@delete');


Route::get('/estados/listar_estados', 'App\Http\Controllers\API\Parameters\EstadosController@listar_estados');
Route::get('/estados/listar_estadosgenerales', 'App\Http\Controllers\API\Parameters\EstadosController@listar_estadosgenerales');
Route::get('/estados/listar_estadosOT', 'App\Http\Controllers\API\Parameters\EstadosController@listar_estadosOT');
Route::get('/estados/listar_estadosequipos', 'App\Http\Controllers\API\Parameters\EstadosController@listar_estadosequipos');
Route::post('/estados/create', 'App\Http\Controllers\API\Parameters\EstadosController@create');
Route::get('/estados/get/{id}', 'App\Http\Controllers\API\Parameters\EstadosController@get');
Route::delete('/estados/delete/{id}', 'App\Http\Controllers\API\Parameters\EstadosController@delete');
Route::put('/estados/update/{id}', 'App\Http\Controllers\API\Parameters\EstadosController@update');

Route::get('/empresa/listar_empresa', 'App\Http\Controllers\API\Parameters\EmpresaController@listar_empresa');
Route::post('/empresa/create', 'App\Http\Controllers\API\Parameters\EmpresaController@create');
Route::get('/empresa/get/{id}', 'App\Http\Controllers\API\Parameters\EmpresaController@get');
Route::delete('/empresa/delete/{id}', 'App\Http\Controllers\API\Parameters\EmpresaController@delete');
Route::put('/empresa/update/{id}', 'App\Http\Controllers\API\Parameters\EmpresaController@update');

Route::get('/tipooperacion/listar_tipooperacion', 'App\Http\Controllers\API\Parameters\TipoOperacionController@listar_tipooperacion');
Route::get('/tipooperacion/listar_tipooperacionestados', 'App\Http\Controllers\API\Parameters\TipoOperacionController@listar_tipooperacionestados');
Route::post('/tipooperacion/create', 'App\Http\Controllers\API\Parameters\TipoOperacionController@create');
Route::get('/tipooperacion/get/{id}', 'App\Http\Controllers\API\Parameters\TipoOperacionController@get');
Route::delete('/tipooperacion/delete/{id}', 'App\Http\Controllers\API\Parameters\TipoOperacionController@delete');
Route::put('/tipooperacion/update/{id}', 'App\Http\Controllers\API\Parameters\TipoOperacionController@update');

Route::get('/unidades/listar_unidades', 'App\Http\Controllers\API\Parameters\UnidadesController@listar_unidades');
Route::get('/unidades/listar_tipopartes', 'App\Http\Controllers\API\Parameters\UnidadesController@listar_tipopartes');
Route::get('/unidades/listar_tipoequipos', 'App\Http\Controllers\API\Parameters\UnidadesController@listar_tipoequipos');
Route::get('/unidades/listar_tipousuarios', 'App\Http\Controllers\API\Parameters\UnidadesController@listar_tipousuarios');
Route::post('/unidades/create', 'App\Http\Controllers\API\Parameters\UnidadesController@create');
Route::get('/unidades/get/{id}', 'App\Http\Controllers\API\Parameters\UnidadesController@get');
Route::delete('/unidades/delete/{id}', 'App\Http\Controllers\API\Parameters\UnidadesController@delete');
Route::put('/unidades/update/{id}', 'App\Http\Controllers\API\Parameters\UnidadesController@update');

// Rutas Gestión Interlocutores
Route::get('/tiposcategorias/listar_tiposcategorias', 'App\Http\Controllers\API\Interlocutores\TiposCategoriasController@listar_tiposcategorias');
Route::post('/tiposcategorias/create', 'App\Http\Controllers\API\Interlocutores\TiposCategoriasController@create');
Route::get('/tiposcategorias/get/{id}', 'App\Http\Controllers\API\Interlocutores\TiposCategoriasController@get');
Route::delete('/tiposcategorias/delete/{id}', 'App\Http\Controllers\API\Interlocutores\TiposCategoriasController@delete');
Route::put('/tiposcategorias/update/{id}', 'App\Http\Controllers\API\Interlocutores\TiposCategoriasController@update');

Route::get('/tipointerlocutor/listar_tipointerlocutor', 'App\Http\Controllers\API\Interlocutores\TiposInterlocutoresController@listar_tipointerlocutor');
Route::post('/tipointerlocutor/create', 'App\Http\Controllers\API\Interlocutores\TiposInterlocutoresController@create');
Route::get('/tipointerlocutor/get/{id}', 'App\Http\Controllers\API\v\TiposInterlocutoresController@get');
Route::delete('/tipointerlocutor/delete/{id}', 'App\Http\Controllers\API\Interlocutores\TiposInterlocutoresController@delete');
Route::put('/tipointerlocutor/update/{id}', 'App\Http\Controllers\API\Interlocutores\TiposInterlocutoresController@update');

Route::get('/especialidad/listar_especialidades', 'App\Http\Controllers\API\Interlocutores\EspecialidadesController@listar_especialidades');
Route::post('/especialidad/create', 'App\Http\Controllers\API\Interlocutores\EspecialidadesController@create');
Route::get('/especialidad/get/{id}', 'App\Http\Controllers\API\Interlocutores\EspecialidadesController@get');
Route::delete('/especialidad/delete/{id}', 'App\Http\Controllers\API\Interlocutores\EspecialidadesController@delete');
Route::put('/especialidad/update/{id}', 'App\Http\Controllers\API\Interlocutores\EspecialidadesController@update');

Route::get('/proveedores/listar_proveedores', 'App\Http\Controllers\API\Interlocutores\ProveedoresController@listar_proveedores');
Route::post('/proveedores/create', 'App\Http\Controllers\API\Interlocutores\ProveedoresController@create');
Route::get('/proveedores/get/{id}', 'App\Http\Controllers\API\Interlocutores\ProveedoresController@get');
Route::delete('/proveedores/delete/{id}', 'App\Http\Controllers\API\Interlocutores\ProveedoresController@delete');
Route::put('/proveedores/update/{id}', 'App\Http\Controllers\API\Interlocutores\ProveedoresController@update');

Route::get('/clientes/listar_clientes', 'App\Http\Controllers\API\Interlocutores\ClientesController@listar_clientes');
Route::post('/clientes/create', 'App\Http\Controllers\API\Interlocutores\ClientesController@create');
Route::get('/clientes/get/{id}', 'App\Http\Controllers\API\Interlocutores\ClientesController@get');
Route::delete('/clientes/delete/{id}', 'App\Http\Controllers\API\Interlocutores\ClientesController@delete');
Route::put('/clientes/update/{id}', 'App\Http\Controllers\API\Interlocutores\ClientesController@update');

Route::get('/empleados/listar_empleados', 'App\Http\Controllers\API\Interlocutores\EmpleadosController@listar_empleados');
Route::get('/empleados/listar_empleadosOT', 'App\Http\Controllers\API\Interlocutores\EmpleadosController@listar_empleadosOT');
Route::post('/empleados/create', 'App\Http\Controllers\API\Interlocutores\EmpleadosController@create');
Route::get('/empleados/get/{id}', 'App\Http\Controllers\API\Interlocutores\EmpleadosController@get');
Route::delete('/empleados/delete/{id}', 'App\Http\Controllers\API\Interlocutores\EmpleadosController@delete');
Route::put('/empleados/update/{id}', 'App\Http\Controllers\API\Interlocutores\EmpleadosController@update');

Route::get('/mensajeros/listar_mensajeros', 'App\Http\Controllers\API\Interlocutores\MensajerosController@listar_mensajeros');
Route::get('/mensajeros/listar_mensajerosOT', 'App\Http\Controllers\API\Interlocutores\MensajerosController@listar_mensajerosOT');
Route::post('/mensajeros/create', 'App\Http\Controllers\API\Interlocutores\MensajerosController@create');
Route::get('/mensajeros/get/{id}', 'App\Http\Controllers\API\Interlocutores\MensajerosController@get');
Route::delete('/mensajeros/delete/{id}', 'App\Http\Controllers\API\Interlocutores\MensajerosController@delete');
Route::put('/mensajeros/update/{id}', 'App\Http\Controllers\API\Interlocutores\MensajerosController@update');

Route::get('/direccionrecogida/listar_direccionrecogida', 'App\Http\Controllers\API\Interlocutores\DireccionRecogidaController@listar_direccionrecogida');
Route::post('/direccionrecogida/create', 'App\Http\Controllers\API\Interlocutores\DireccionRecogidaController@create');
Route::get('/direccionrecogida/get/{id}', 'App\Http\Controllers\API\Interlocutores\DireccionRecogidaController@get');
Route::get('/direccionrecogida/direccionrecogidaclientes/{id}', 'App\Http\Controllers\API\Interlocutores\DireccionRecogidaController@direccionrecogidaclientes');
Route::delete('/direccionrecogida/delete/{id}', 'App\Http\Controllers\API\Interlocutores\DireccionRecogidaController@delete');
Route::put('/direccionrecogida/update/{id}', 'App\Http\Controllers\API\Interlocutores\DireccionRecogidaController@update');

Route::get('/direccionentrega/listar_direccionentrega', 'App\Http\Controllers\API\Interlocutores\DireccionEntregaController@listar_direccionentrega');
Route::post('/direccionentrega/create', 'App\Http\Controllers\API\Interlocutores\DireccionEntregaController@create');
Route::get('/direccionentrega/get/{id}', 'App\Http\Controllers\API\Interlocutores\DireccionEntregaController@get');
Route::get('/direccionentrega/direccionentregaclientes/{id}', 'App\Http\Controllers\API\Interlocutores\DireccionEntregaController@direccionentregaclientes');
Route::delete('/direccionentrega/delete/{id}', 'App\Http\Controllers\API\Interlocutores\DireccionEntregaController@delete');
Route::put('/direccionentrega/update/{id}', 'App\Http\Controllers\API\Interlocutores\DireccionEntregaController@update');

// Rutas Gestión Tiqueteras
Route::get('/tipostiquetera/listar_tipostiquetera', 'App\Http\Controllers\API\Tiquetera\TiposTiqueteraController@listar_tipostiquetera');
Route::post('/tipostiquetera/create', 'App\Http\Controllers\API\Tiquetera\TiposTiqueteraController@create');
Route::get('/tipostiquetera/get/{id}', 'App\Http\Controllers\API\Tiquetera\TiposTiqueteraController@get');
Route::delete('/tipostiquetera/delete/{id}', 'App\Http\Controllers\API\Tiquetera\TiposTiqueteraController@delete');
Route::put('/tipostiquetera/update/{id}', 'App\Http\Controllers\API\Tiquetera\TiposTiqueteraController@update');

Route::get('/tiquetera/listar_tiquetera', 'App\Http\Controllers\API\Tiquetera\TiqueteraController@listar_tiquetera');
Route::post('/tiquetera/create', 'App\Http\Controllers\API\Tiquetera\TiqueteraController@create');
Route::get('/tiquetera/get/{id}', 'App\Http\Controllers\API\Tiquetera\TiqueteraController@get');
Route::get('/tiquetera/leertiqueteracliente/{id}', 'App\Http\Controllers\API\Tiquetera\TiqueteraController@leertiqueteracliente');
Route::delete('/tiquetera/delete/{id}', 'App\Http\Controllers\API\Tiquetera\TiqueteraController@delete');
Route::put('/tiquetera/update/{id}', 'App\Http\Controllers\API\Tiquetera\TiqueteraController@update');

// Rutas Gestón Pedidos
Route::get('/tipospedidos/listar_tipospedidos', 'App\Http\Controllers\API\Parameters\TiposPedidosController@listar_tipospedidos');
Route::post('/tipospedidos/create', 'App\Http\Controllers\API\Parameters\TiposPedidosController@create');
Route::get('/tipospedidos/get/{id}', 'App\Http\Controllers\API\Parameters\TiposPedidosController@get');
Route::delete('/tipospedidos/delete/{id}', 'App\Http\Controllers\API\Parameters\TiposPedidosController@delete');
Route::put('/tipospedidos/update/{id}', 'App\Http\Controllers\API\Parameters\TiposPedidosController@update');

Route::get('/zonas/listar_zonas', 'App\Http\Controllers\API\Pedidos\ZonasController@listar_zonas');
Route::post('/zonas/create', 'App\Http\Controllers\API\Pedidos\ZonasController@create');
Route::get('/zonas/get/{id}', 'App\Http\Controllers\API\Pedidos\ZonasController@get');
Route::delete('/zonas/delete/{id}', 'App\Http\Controllers\API\Pedidos\ZonasController@delete');
Route::put('/zonas/update/{id}', 'App\Http\Controllers\API\Pedidos\ZonasController@update');

Route::get('/tarifas/listar_tarifas', 'App\Http\Controllers\API\Pedidos\TarifasController@listar_tarifas');
Route::post('/tarifas/create', 'App\Http\Controllers\API\Pedidos\TarifasController@create');
Route::get('/tarifas/get/{id}', 'App\Http\Controllers\API\Pedidos\TarifasController@get');
Route::get('/tarifas/leetarifa/{id}', 'App\Http\Controllers\API\Pedidos\TarifasController@leetarifa');
Route::delete('/tarifas/delete/{id}', 'App\Http\Controllers\API\Pedidos\TarifasController@delete');
Route::put('/tarifas/update/{id}', 'App\Http\Controllers\API\Pedidos\TarifasController@update');

Route::get('/descuentosvolumen/listar_descuentosvolumen', 'App\Http\Controllers\API\Pedidos\DescuentosVolumenController@listar_descuentosvolumen');
Route::post('/descuentosvolumen/create', 'App\Http\Controllers\API\Pedidos\DescuentosVolumenController@create');
Route::get('/descuentosvolumen/get/{id}', 'App\Http\Controllers\API\Pedidos\DescuentosVolumenController@get');
Route::delete('/descuentosvolumen/delete/{id}', 'App\Http\Controllers\API\Pedidos\DescuentosVolumenController@delete');
Route::put('/descuentosvolumen/update/{id}', 'App\Http\Controllers\API\Pedidos\DescuentosVolumenController@update');

Route::get('pedidos/listar_pedidos', 'App\Http\Controllers\API\Pedidos\PedidosController@listar_pedidos');
Route::get('pedidos/listar_pedidosasignar', 'App\Http\Controllers\API\Pedidos\PedidosController@listar_pedidosasignar');
Route::get('pedidos/listar_pedidosporasignar', 'App\Http\Controllers\API\Pedidos\PedidosController@listar_pedidosporasignar');
Route::get('pedidos/listar_pedidosasignados', 'App\Http\Controllers\API\Pedidos\PedidosController@listar_pedidosasignados');
Route::get('pedidos/listar_pedidosterminar', 'App\Http\Controllers\API\Pedidos\PedidosController@listar_pedidosterminar');
Route::post('/pedidos/create', 'App\Http\Controllers\API\Pedidos\PedidosController@create');
Route::get('/pedidos/get/{id}', 'App\Http\Controllers\API\Pedidos\PedidosController@get');
Route::get('/pedidos/leerpedidosmensajeros/{id}', 'App\Http\Controllers\API\Pedidos\PedidosController@leerpedidosmensajeros');
Route::get('/pedidos/leerestadoctamensajero/{id}', 'App\Http\Controllers\API\Pedidos\PedidosController@leerestadoctamensajero');
Route::delete('/pedidos/delete/{id}', 'App\Http\Controllers\API\Pedidos\PedidosController@delete');
Route::put('/pedidos/update/{id}', 'App\Http\Controllers\API\Pedidos\PedidosController@update');