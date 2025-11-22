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

    /**
     * Handle login or registration-on-first-login.
     * If user exists, validate password. If not, create user (password will be hashed by model cast).
     * Returns an array with `user`, `token` and `new` flag.
     *
     * @param array $data
     * @return array
     * @throws \Exception
     */
    public function login(array $data): array
    {
        $email = $data['email'];
        $password = $data['password'];
        $username = $data['username'] ?? null;

        $user = User::where('email', $email)->first();

        if ($user) {
            if (Hash::check($password, $user->password)) {
                $token = $this->jwt->generate([
                    'username' => $user->username,
                    'email' => $user->email,
                ]);

                return ['user' => $user, 'token' => $token, 'new' => false];
            }

            throw new \Exception('Credenciales inválidas.');
        }

        $user = User::create([
            'username' => $username ?? $email,
            'email' => $email,
            'password' => $password,
        ]);

        $token = $this->jwt->generate([
            'username' => $user->username,
            'email' => $user->email,
        ]);

        return ['user' => $user, 'token' => $token, 'new' => true];
    }
}
