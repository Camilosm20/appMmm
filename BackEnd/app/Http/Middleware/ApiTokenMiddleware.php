<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Services\JwtService;

class ApiTokenMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->is('api/login') || $request->is('login')) {
            return $next($request);
        }

        $auth = $request->header('Authorization');
        if (! $auth || ! preg_match('/Bearer\s+(.*)/i', $auth, $m)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $token = $m[1];

        try {
            $jwt = app(JwtService::class);
            $payload = $jwt->verify($token);

            // expose payload to request attributes and headers for downstream services
            if (is_array($payload)) {
                $request->attributes->set('jwt', $payload);
                if (isset($payload['username'])) {
                    $request->headers->set('X-User-Name', $payload['username']);
                }
                if (isset($payload['email'])) {
                    $request->headers->set('X-User-Email', $payload['email']);
                }
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Unauthorized: ' . $e->getMessage()], 401);
        }

        return $next($request);
    }
}
