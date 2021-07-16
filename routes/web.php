<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('mastermessenger');
});

Route::get('/mastermessenger', function () {
    return view('mastermessenger');
});

// Rutas de Modulo Usuarios
Route::get('/auth/usuarios', 'App\Http\Controllers\MasterMessengerController@index');

// Rutas de las Opciones de Maestros del sistema
Route::get('/parametros/paises', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/parametros/empresa', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/parametros/regiones', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/parametros/departamentos', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/parametros/ciudades', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/parametros/estados', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/parametros/unidades', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/parametros/monedas', 'App\Http\Controllers\MasterMessengerController@index');

Route::get('/parametros/empresa', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/parametros/estados', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/parametros/tiposusuarios', 'App\Http\Controllers\MasterMessengerController@index');

// Rutas del Modulo de Interlocutores
Route::get('/interlocutores/tiposcategorias', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/interlocutores/tipointerlocutores', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/interlocutores/especialidades', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/interlocutores/proveedores', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/interlocutores/clientes', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/interlocutores/empleados', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/interlocutores/mensajeros', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/interlocutores/contactos', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/interlocutores/direccionrecogida', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/interlocutores/direccionentrega', 'App\Http\Controllers\MasterMessengerController@index');

// Rutas del Modulo de Interlocutores
Route::get('/tiqueteras/tipostiqueteras', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/tiqueteras/tiqueteras', 'App\Http\Controllers\MasterMessengerController@index');

// Rutas del Modulo de Pedidos
Route::get('/parametros/tipoperacion', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('pedidos/descuentosvolumen', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/pedidos/tipospedidos', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/pedidos/zonas', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/pedidos/tarifas', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/pedidos/pedidos', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/pedidos/asignarpedidos', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/pedidos/terminarpedidos', 'App\Http\Controllers\MasterMessengerController@index');

// Rutas del Modulo Mensajeros
Route::get('/mensajeros/pedidosmensajero', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/mensajeros/estadoctamensajero', 'App\Http\Controllers\MasterMessengerController@index');

