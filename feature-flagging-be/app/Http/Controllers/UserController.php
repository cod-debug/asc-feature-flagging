<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //
    public function create(Request $request){
        $data = [
            "full_name" => "$request->first_name $request->last_name",
            "email" => "$request->first_name@$request->last_name.com",
            "password" => "password",
            "user_role" => 1
        ];
        User::create($data);
    }

    public function getUsers(){
        return response()->json(User::all());
    }
}
