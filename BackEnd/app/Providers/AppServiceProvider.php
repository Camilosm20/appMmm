<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    public function login() : string
    {
        return "login from AppServiceProvider";        
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}