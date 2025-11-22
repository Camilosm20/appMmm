<?php

namespace App\Services;

class JwtService
{
    protected string $secret;

    public function __construct()
    {
        $this->secret = env('JWT_SECRET', config('app.key')) ?: 'default_jwt_secret';
    }

    protected function base64UrlEncode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    /**
     * Generate a simple JWT using HS256.
     * Payload will be JSON-encoded and include `iat` and `exp` by default.
     *
     * @param array $payload
     * @param int $ttl seconds until expiration (default 1 hour)
     * @return string
     */
    public function generate(array $payload, int $ttl = 3600): string
    {
        $header = ['alg' => 'HS256', 'typ' => 'JWT'];
        $now = time();

        $payload = array_merge($payload, [
            'iat' => $now,
            'exp' => $now + $ttl,
        ]);

        $headerEncoded = $this->base64UrlEncode(json_encode($header));
        $payloadEncoded = $this->base64UrlEncode(json_encode($payload));

        $signature = hash_hmac('sha256', $headerEncoded . '.' . $payloadEncoded, $this->secret, true);
        $signatureEncoded = $this->base64UrlEncode($signature);

        return $headerEncoded . '.' . $payloadEncoded . '.' . $signatureEncoded;
    }
}
