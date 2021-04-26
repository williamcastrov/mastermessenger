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

Route::get('/usuarios/listar_usuarios', 'App\Http\Controllers\API\Usuarios\UsuariosController@listar_usuarios');
Route::post('/usuarios/create', 'App\Http\Controllers\API\Usuarios\UsuariosController@create');
Route::get('/usuarios/get/{id}', 'App\Http\Controllers\API\Usuarios\UsuariosController@get');
Route::delete('/usuarios/delete/{id}', 'App\Http\Controllers\API\Usuarios\UsuariosController@delete');
Route::put('/usuarios/update/{id}', 'App\Http\Controllers\API\Usuarios\UsuariosController@update');

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

Route::get('/tipospedidos/listar_tipospedidos', 'App\Http\Controllers\API\Parameters\TiposPedidosController@listar_tipospedidos');
Route::post('/tipospedidos/create', 'App\Http\Controllers\API\Parameters\TiposPedidosController@create');
Route::get('/tipospedidos/get/{id}', 'App\Http\Controllers\API\Parameters\TiposPedidosController@get');
Route::delete('/tipospedidos/delete/{id}', 'App\Http\Controllers\API\Parameters\TiposPedidosController@delete');
Route::put('/tipospedidos/update/{id}', 'App\Http\Controllers\API\Parameters\TiposPedidosController@update');



