import axios from "axios";
import { DashboardGateway } from "../domain/gateway";
import { IDashboard } from "../domain/interface";
import { IGeneric } from "../../../Commons/IGeneric";

const apiGetWp = "http://localhost:4000/api/wp/getAll";

export class DashboardGatewayImpl implements DashboardGateway {
  async getAll(): Promise<IDashboard.getAll[]> {
    const response = await axios.get(apiGetWp);
    return [...(response.data?.data || [])];
  }
}
