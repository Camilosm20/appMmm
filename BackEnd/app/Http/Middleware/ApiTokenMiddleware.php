<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ApiTokenMiddleware
{
    /**
     * Handle an incoming request.
     * Expect header: Authorization: Bearer <token>
     */
    public function handle(Request $request, Closure $next)
    {
        // Allow unauthenticated access to the login route
        if ($request->is('api/login') || $request->is('login')) {
            return $next($request);
        }

        $auth = $request->header('Authorization');
        if (! $auth || ! preg_match('/Bearer\s+(.*)/i', $auth, $m)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
