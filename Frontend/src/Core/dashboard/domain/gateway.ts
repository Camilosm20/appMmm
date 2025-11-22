import { IGeneric } from "../../Commons/IGeneric";
import { IDashboard } from "./interface";

export interface DashboardGateway {
    getAll(): Promise<IGeneric.Response<IGeneric.Paginator<IDashboard.getAll[]>>>;
}

export default DashboardGateway;