<?php

namespace App\Commons;

class QueryParam
{
    public int $pageSize;
    public int $pageNumber;
    public ?string $search;
    public ?string $sortBy;
    public ?string $sortOrder;

    public function __construct(int $pageSize = 10, int $pageNumber = 1, ?string $search = null, ?string $sortBy = null, ?string $sortOrder = null)
    {
        $this->pageSize = max(1, $pageSize);
        $this->pageNumber = max(1, $pageNumber);
        $this->search = $search;
        $this->sortBy = $sortBy;
        $this->sortOrder = $sortOrder;
    }
}