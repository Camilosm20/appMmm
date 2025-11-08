export interface ApiResponse {
    status: string;
    isSuccess: boolean;
    data?: any;
    error?: string;
}