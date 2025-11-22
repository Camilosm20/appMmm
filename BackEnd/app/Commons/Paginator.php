<?php

namespace App\Commons;

class Paginator
{
    public int $pageSize;
    public int $pageNumber;
    public array $items;
    public int $totalItems;
    public int $totalPages;

    /**
     * @param int $pageSize
     * @param int $pageNumber
     * @param array $items
     * @param int|null $totalItems
     */
    public function __construct(int $pageSize = 10, int $pageNumber = 1, array $items = [], ?int $totalItems = null)
    {
        $this->pageSize = max(1, $pageSize);
        $this->pageNumber = max(1, $pageNumber);
        $this->items = array_values($items);
        $this->totalItems = $totalItems ?? count($this->items);
        $this->totalPages = (int) ceil($this->totalItems / $this->pageSize);
    }

    /**
     * Return items for current page. If items contain full set, it will slice.
     * If items already represent the page, it returns items as-is.
     *
     * @return array
     */
    public function pagedItems(): array
    {
        if ($this->totalItems === count($this->items) && count($this->items) > $this->pageSize) {
            $offset = ($this->pageNumber - 1) * $this->pageSize;
            return array_slice($this->items, $offset, $this->pageSize);
        }

        return $this->items;
    }

    public function toArray(): array
    {
        return [
            'pageSize' => $this->pageSize,
            'pageNumber' => $this->pageNumber,
            'totalItems' => $this->totalItems,
            'totalPages' => $this->totalPages,
            'items' => $this->pagedItems(),
        ];
    }
}
