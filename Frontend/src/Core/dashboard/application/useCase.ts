import { DashboardGateway } from "../domain/gateway";
import { IDashboard } from "../domain/interface";

export class DashboardUseCase {
  private dashboardGateway: DashboardGateway;

  constructor(dashboardGateway: DashboardGateway) {
    this.dashboardGateway = dashboardGateway;
  }

  async getAll(): Promise<IDashboard.getAll[]> {
    return this.dashboardGateway.getAll();
  }
}

export default DashboardUseCase;
