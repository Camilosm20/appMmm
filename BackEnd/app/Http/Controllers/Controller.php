<?php

namespace App\Http\Controllers;

abstract class Controller
{
    protected function jwtPayload(): ?array
    {
        $p = request()->attributes->get('jwt');
        return is_array($p) ? $p : null;
    }

    protected function jwtUsername(): ?string
    {
        $p = $this->jwtPayload();
        return $p['username'] ?? null;
    }

    protected function jwtEmail(): ?string
    {
        $p = $this->jwtPayload();
        return $p['email'] ?? null;
    }

    protected function ok($data = null)
    {
        return \App\Commons\ApiResponse::success($data)->toJsonResponse();
    }

    protected function badRequest(\Exception $e)
    {
        return \App\Commons\ApiResponse::badRequest([$e->getMessage()])->toJsonResponse();
    }

    protected function created($data = null)
    {
        return \App\Commons\ApiResponse::created($data)->toJsonResponse();
    }
}
