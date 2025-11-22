<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Commons\Paginator;
use App\Commons\QueryParam;

class TableService
{
    public function getLaunch2025(QueryParam $qp): array
    {
        $pageSize = $qp->pageSize;
        $pageNumber = $qp->pageNumber;

        $offset = ($pageNumber - 1) * $pageSize;
        $rows = DB::table('wp_launch_2025')->offset($offset)->limit($pageSize)->get();
        $total = DB::table('wp_launch_2025')->count();

        $paginator = new Paginator($pageSize, $pageNumber, $rows->toArray(), $total);

        return $paginator->toArray();
    }
}