<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class DefaultAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $password = 'String1234!';
        $email = 'default@admin.test';
        
        $user_data = [
            'full_name' => 'Default',
            'email' => $email,
            'password' => Hash::make($password),
            'user_role' => 1,
            'status' => 'active'
        ];

        if(!User::where('email', $email)->first()){
            User::create($user_data);
        }
    }
}
