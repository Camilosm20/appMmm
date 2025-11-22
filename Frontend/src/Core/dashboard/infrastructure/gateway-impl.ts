import { IGeneric } from "../../Commons/IGeneric";
import api from "../../http/http.service";
import { DashboardGateway } from "../domain/gateway";
import { IDashboard } from "../domain/interface";

const apiGetWp = "/getLauch2025";

export class DashboardGatewayImpl implements DashboardGateway {
  async getAll(): Promise<IGeneric.Response<IGeneric.Paginator<IDashboard.getAll[]>>> {
    const response = await api.get(apiGetWp);
    return response?.data;
  }
}
