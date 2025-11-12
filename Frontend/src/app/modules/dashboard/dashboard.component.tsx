import { useEffect, useState } from "react";
import { IDashboard } from "../../../Core/dashboard/domain/interface";
import { DashboardGatewayImpl } from "../../../Core/dashboard/infrastructure/gateway-impl";
import { DashboardUseCase } from "../../../Core/dashboard/application/useCase";

export default function Dashboard() {
  const [client, setClient] = useState<IDashboard.getAll[]>([]);
  const [error, setError] = useState<string>("");

  const gateway = new DashboardGatewayImpl();
  const useCase = new DashboardUseCase(gateway);

  useEffect(
    () => {
      fetchClient();
    }, []);

  const fetchClient = async () => {
    try {
      const data = await useCase.getAll();
      setClient(data);
    } catch (error) {
      const msg = (error as any)?.message ?? String(error);
      setError(msg);
    }
  };

  function formatCreatedAt(date?: string | Date): string {
    return new Date(date ?? "").toLocaleString().split(',')[0];
  }

  return (
    <section className="section">
      <div className="container box">

        {error && <div className="notification is-danger">{error}</div>}

        <table className="table is-bordered is-fullwidth">
          <thead>
            <tr>
              <th className="has-text-centered ">Nombre</th>
              <th className="has-text-centered">Email</th>
              <th className="has-text-centered">Teléfono</th>
              <th className="has-text-centered">Fecha de creacion</th>
              <th className="has-text-centered">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {client.length > 0 ? (
              client.map((p, idx) => (
                <tr key={p.email ?? idx} className="has-text-centered">
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.phone}</td>
                  <td>{formatCreatedAt(p.create_at as string | Date)}</td>
                  <td>
                    <div className="is-flex is-justify-content-center">
                      <button className="button is-small is-warning mr-2">Enviar Correo</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="has-text-centered has-text-danger">
                  No hay datos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
