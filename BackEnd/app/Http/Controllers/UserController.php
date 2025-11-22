<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AuthService;

class UserController extends Controller
{
	protected AuthService $authService;

	public function __construct(AuthService $authService)
	{
		$this->authService = $authService;
	}

	/**
	 * Login or register-on-first-login endpoint.
	 */
	public function login(Request $request)
	{
		$data = $request->validate([
			'username' => 'sometimes|string|max:255',
			'email' => 'required|email',
			'password' => 'required|string|min:6',
		]);

		try {
			$result = $this->authService->login($data);

			return response()->json([
				'success' => true,
				'token' => $result['token'],
				'user' => $result['user'],
				'created' => $result['new'] ?? false,
			], 200);
		} catch (\Exception $e) {
			return response()->json([
				'success' => false,
				'message' => $e->getMessage(),
			], 401);
		}
	}
}
