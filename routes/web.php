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
    return view('welcome');
});

Route::get('/mastermessenger', function () {
    return view('mastermessenger');
});

Route::get('/parametros/empresa', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/parametros/estados', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/parametros/tipoperacion', 'App\Http\Controllers\MasterMessengerController@index');
Route::get('/parametros/tipospedidos', 'App\Http\Controllers\MasterMessengerController@index');