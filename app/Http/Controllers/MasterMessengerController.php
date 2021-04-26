<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MasterMessengerController extends Controller
{
    public function index(){
        return view("mastermessenger");
    }
}
