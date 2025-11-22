<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\UserController;

Route::middleware(\App\Http\Middleware\ApiTokenMiddleware::class)->get('/getLauch2025', function (Request $request) {
    // Obtener todos los registros de la tabla wp_launch_2025
    try {
        $rows = DB::table('wp_launch_2025')->get();
    } catch (\Exception $e) {
        return response()->json(['message' => 'DB error', 'error' => $e->getMessage()], 500);
    }

    return response()->json($rows);
});

// Authentication route: login (register-on-first-login)
Route::post('/login', [UserController::class, 'login']);