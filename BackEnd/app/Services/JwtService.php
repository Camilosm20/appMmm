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

    /**
     * Verify and decode a JWT. Returns payload array if valid, otherwise throws \Exception.
     *
     * @param string $jwt
     * @return array
     * @throws \Exception
     */
    public function verify(string $jwt): array
    {
        $parts = explode('.', $jwt);
        if (count($parts) !== 3) {
            throw new \Exception('Invalid token format');
        }

        [$headerEncoded, $payloadEncoded, $sigEncoded] = $parts;

        $payloadJson = $this->base64UrlDecode($payloadEncoded);
        if ($payloadJson === false) {
            throw new \Exception('Invalid payload encoding');
        }

        $payload = json_decode($payloadJson, true);
        if (! is_array($payload)) {
            throw new \Exception('Invalid payload');
        }

        // verify signature
        $expectedSig = hash_hmac('sha256', $headerEncoded . '.' . $payloadEncoded, $this->secret, true);
        $expectedSigEnc = $this->base64UrlEncode($expectedSig);

        if (! hash_equals($expectedSigEnc, $sigEncoded)) {
            throw new \Exception('Invalid token signature');
        }

        // verify expiration
        if (isset($payload['exp']) && time() > (int) $payload['exp']) {
            throw new \Exception('Token expired');
        }

        return $payload;
    }

    protected function base64UrlDecode(string $data): string|false
    {
        $remainder = strlen($data) % 4;
        if ($remainder) {
            $data .= str_repeat('=', 4 - $remainder);
        }

        $decoded = base64_decode(strtr($data, '-_', '+/'));
        return $decoded === false ? false : $decoded;
    }
}
