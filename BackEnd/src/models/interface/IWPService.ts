export interface IWPService {
    getAll(limit?: number): Promise<any[]>;
}