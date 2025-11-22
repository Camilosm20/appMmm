<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Services\JwtService;

class AuthService
{
    protected JwtService $jwt;

    public function __construct(JwtService $jwt)
    {
        $this->jwt = $jwt;
    }
    
    public function login(array $data): string
    {
        $email = $data['email'];
        $password = $data['password'];
        $username = $data['username'] ?? null;

        $user = User::where('email', $email)->first();

        if ($user && Hash::check($password, $user->password)) {
            $token = $this->jwt->generate([
                'username' => $user->username,
                'email' => $user->email,
            ]);

            return $token;
        }
        throw new \Exception('Credenciales inválidas.');
    }
}
