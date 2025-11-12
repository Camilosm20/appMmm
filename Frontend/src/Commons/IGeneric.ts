export namespace IGeneric {
  export interface Response<T> {
    status: string;
    isSuccess: boolean;
    data?: T;
    error?: string;
  }
}
