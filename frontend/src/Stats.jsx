import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import './App.css';

const API_URL = "https://rwfkmc03y1.execute-api.us-east-1.amazonaws.com";

function Stats() {
  const { codigo } = useParams();
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const procesarHistorial = (historialCrudo) => {
    if (!historialCrudo || historialCrudo.length === 0) return [];

    const conteo = {};
    
    historialCrudo.forEach(fechaISO => {
      const dia = fechaISO.split('T')[0]; 
      if (conteo[dia]) {
        conteo[dia] += 1;
      } else {
        conteo[dia] = 1;
      }
    });

    return Object.keys(conteo).map(key => ({
      fecha: key,
      visitas: conteo[key]
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/stats/${codigo}`);
        setData(response.data);
        
        const datosGrafica = procesarHistorial(response.data.historial);
        setChartData(datosGrafica);

      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [codigo]);

  if (loading) return <h2 className="loading">Cargando datos...</h2>;
  if (error) return <h2 className="error">No se encontraron estadísticas.</h2>;

  return (
    <div className="container">
      <div className="card">
        <h1>📊 Control de Estadística</h1>
        
        <div className="info-box">
            <p><strong>Código:</strong> {data.codigo}</p>
            <p><strong>URL Destino:</strong> <a href={data.urlOriginal} target="_blank" rel="noreferrer" className="link-dest">{data.urlOriginal}</a></p>
            <div className="counter-box">
              <span>Total Visitas</span>
              <span className="big-number">{data.totalVisitas}</span>
            </div>
        </div>

        <div className="chart-container">
            <h3>Historial de Tráfico (Tiempo Real)</h3>
            
            {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="fecha" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="visitas" fill="#28a745" name="Visitas" />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <div className="no-data">
                  <p>📉 Aún no hay datos en el historial.</p>
                  <p>¡Dale clic a tu link corto para empezar a generar gráficas!</p>
                </div>
            )}
        </div>
        
        {/* Tabla simple de datos */}
        {chartData.length > 0 && (
          <table className="stats-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Visitas</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((fila, index) => (
                <tr key={index}>
                  <td>{fila.fecha}</td>
                  <td>{fila.visitas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Stats;