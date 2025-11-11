import { useState, useEffect } from "react";
import GetWpService from '../services/wpService';

export default function wpService(){
    const [client, setClient] = useState([]);
    const [error, setError] = useState('');

      useEffect(() => {
    fetchClient();
  }, []);

  const fetchClient = async () => {
    try {
      const data = await GetWpService();
      setClient(data);
    } catch (error) {
      setError(error.message);
    }
  };

return(
    <div className="container mt-4">
      <h2 className="text-center mb-4">Lista de Clientes</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-striped table-hover">
        <thead>
          <tr className="text-center">
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Creado en</th>
          </tr>
        </thead>
        <tbody>
          {client.length > 0 ? (
            client.map((p) => (
              <tr key={p.id} className="text-center">
                <td>{p.name}</td>
                <td>{p.email}</td>
                <td>{p.phone}</td>
                <td>{p.create_at}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No hay datos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
);

}