<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TableController;

Route::post('/login', [UserController::class, 'login']);

Route::middleware(\App\Http\Middleware\ApiTokenMiddleware::class)->get('/getLauch2025', [TableController::class, 'getLaunch2025']);