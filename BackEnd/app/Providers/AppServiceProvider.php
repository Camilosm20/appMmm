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
        $this->app->singleton(\App\Services\JwtService::class, function ($app) {
            return new \App\Services\JwtService();
        });

        $this->app->singleton(\App\Services\AuthService::class, function ($app) {
            return new \App\Services\AuthService($app->make(\App\Services\JwtService::class));
        });        
    }

    public function boot(): void
    {
        //
    }
}