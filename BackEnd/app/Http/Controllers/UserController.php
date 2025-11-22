<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AuthService;
use App\Commons\ApiResponse;

class UserController extends Controller
{
	protected AuthService $authService;

	public function __construct(AuthService $authService)
	{
		$this->authService = $authService;
	}

	public function login(Request $request)
	{
		$data = $request->validate([
			'username' => 'sometimes|string|max:255',
			'email' => 'required|email',
			'password' => 'required|string|min:6',
		]);

		try {
			$token = $this->authService->login($data);
			return ApiResponse::success($token)->toJsonResponse();
		} catch (\Exception $e) {
			return ApiResponse::unauthorized($e->getMessage())->toJsonResponse();
		}
	}
}
