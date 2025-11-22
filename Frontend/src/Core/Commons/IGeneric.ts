export namespace IGeneric {
  export interface Response<T> {
    status: string;
    isSuccess: boolean;
    data?: T;
    error?: string;
  }

  export interface Paginator<T> {
    pageSize: number;
    pageNumber: number;
    items: T;
    totalPages: number;
    totalItems: number;
  }
}
