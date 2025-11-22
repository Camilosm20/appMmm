<?php

namespace App\Commons;

use Illuminate\Http\JsonResponse;

class ApiResponse
{
    public bool $isSuccess;
    public $data;
    public array $errors;
    public int $statusCode;

    public function __construct(bool $isSuccess = false, $data = null, array $errors = [], int $statusCode = 200)
    {
        $this->isSuccess = $isSuccess;
        $this->data = $data;
        $this->errors = $errors;
        $this->statusCode = $statusCode;
    }

    public static function success($data = null, int $status = 200): self
    {
        return new self(true, $data, [], $status);
    }

    public static function created($data = null): self
    {
        return new self(true, $data, [], 201);
    }

    public static function badRequest(array $errors = []): self
    {
        return new self(false, null, $errors, 400);
    }

    public static function unauthorized(string $message = 'Unauthorized'): self
    {
        return new self(false, null, [$message], 401);
    }

    public static function notFound(string $message = 'Not found'): self
    {
        return new self(false, null, [$message], 404);
    }

    public static function serverError(string $message = 'Server error'): self
    {
        return new self(false, null, [$message], 500);
    }

    public static function validationError(array $errors): self
    {
        return new self(false, null, $errors, 422);
    }

    public function addError(string $error): self
    {
        $this->errors[] = $error;
        return $this;
    }

    public function toArray(): array
    {
        return [
            'isSuccess' => $this->isSuccess,
            'data' => $this->data,
            'errors' => $this->errors,
            'statusCode' => $this->statusCode,
        ];
    }

    public function toJsonResponse(): JsonResponse
    {
        return response()->json($this->toArray(), $this->statusCode);
    }
}
