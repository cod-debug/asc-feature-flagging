<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $validator = Validator::make(
                $request->all(),
                [
                    'email' => 'required',
                    'password' => 'required',
                ],
                [
                    'email.required' => 'Username / email is required.',
                    'password.required' => 'Password is required.'
                ]
            );
    
            if ($validator->fails()) {
                // Handle validation failure
                return $this->validationError($validator->errors());
            }
    
            $user = null;
    
            // check if auth email and password match
            if(Auth::attempt([
                'email' => $request->email,
                'password' => $request->password
            ])){
                // select specific user
                $user = User::where('email', $request->email)->first();
            }

            if(!$user){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid credentials.',
                ], 400);
            }
    
            if($user->user_role === 2 && $user->status != 'active'){
                // response with token
                return response()->json([
                    'status' => 'error',
                    'message' => 'Kindly wait for admin approval of your account.',
                ], 400);
            } elseif ($user->status != 'active') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid account. Kindly contact system administrator',
                ], 400);
            }

            // response with token
            return response()->json([
                'status' => 'success',
                'message' => 'User Logged In Successfully',
                'data' => [
                    "user_id" => $user->id,
                    "first_name" => $user->first_name,
                    "middle_name" => $user->middle_name,
                    "last_name" => $user->last_name,
                    "role" => $user->user_role,
                ],
                'token' => $user->createToken($user->email)->plainTextToken
            ], 200);
        } catch (\Exception $e) {
            return $this->serverError($e);
        }
    }
}
