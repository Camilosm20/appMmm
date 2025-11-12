import { IDashboard } from "./interface";

export interface DashboardGateway {
    getAll(): Promise<IDashboard.getAll[]>;
}

export default DashboardGateway;