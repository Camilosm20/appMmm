<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Commons\ApiResponse;
use App\Commons\QueryParam;
use App\Services\TableService;

class TableController extends Controller
{
    protected TableService $tableService;

    public function __construct(TableService $tableService)
    {
        $this->tableService = $tableService;
    }
    public function getLaunch2025(Request $request): \Illuminate\Http\JsonResponse
    {
        $username = $this->jwtUsername();

        if ($username !== env('AUTH_USERNAME')) {
            return ApiResponse::unauthorized()->toJsonResponse();
        }

        $pageSize = (int) $request->query('pageSize', 10);
        $pageNumber = (int) $request->query('pageNumber', 1);
        $search = $request->query('search');
        $sortBy = $request->query('sortBy');
        $sortOrder = $request->query('sortOrder');

        $qp = new QueryParam($pageSize, $pageNumber, $search, $sortBy, $sortOrder);

        try {
            $rows = $this->tableService->getLaunch2025($qp);
            return $this->ok($rows);
        } catch (\Exception $e) {
            return $this->badRequest($e);
        }
    }
}