import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// 👇 ESTA ES TU API DEL MÓDULO 3 (Ya la puse por ti)
const API_BASE_URL = "https://rwfkmc03y1.execute-api.us-east-1.amazonaws.com";

function Stats() {
  const { codigo } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Consultando API...");
        // 1. LLAMADA REAL AL BACKEND (MÓDULO 3)
        // Nota: Agregamos un timestamp para evitar que el navegador guarde caché vieja
        const response = await axios.get(`${API_BASE_URL}/stats/${codigo}?t=${Date.now()}`);
        
        console.log("Datos recibidos:", response.data);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error conectando al backend:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [codigo]);

  if (loading) return <div style={styles.container}><h2>🔄 Conectando con Módulo 3...</h2></div>;
  
  if (error || !data) return (
    <div style={styles.container}>
        <div style={{...styles.card, borderColor: 'red'}}>
            <h2 style={{color: 'red'}}>❌ Error de Conexión</h2>
            <p>No se pudo conectar con el Backend (Módulo 3).</p>
            <p>Verifica que la URL del API sea correcta.</p>
        </div>
    </div>
  );

  // Calculamos el máximo para escalar las barras del gráfico
  // (Si no hay historial, usamos 1 para evitar división por cero)
  const historial = data.historial || [];
  const maxVisitas = historial.length > 0 ? Math.max(...historial.map(d => d.visitas)) : 100;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>📊 Control de Estadística</h1>
        <p style={styles.subtitle}>Código: <strong>{data.codigo}</strong></p>
        
        <div style={styles.infoGrid}>
          <div style={styles.statBox}>
            <span style={styles.label}>Total Visitas</span>
            <span style={styles.number}>{data.totalVisitas}</span>
          </div>
          <div style={styles.statBox}>
            <span style={styles.label}>URL Original</span>
            <a href={data.urlOriginal} target="_blank" rel="noreferrer" style={styles.link}>
              {data.urlOriginal ? data.urlOriginal.substring(0, 30) + "..." : "N/A"}
            </a>
          </div>
        </div>

        {data.filtroAplicado === "SI" && (
             <p style={{color: 'green', fontWeight: 'bold'}}>✅ Filtrado por fecha activado</p>
        )}

        <h3 style={{marginTop: '30px', color: '#555'}}>📅 Historial de Visitas</h3>
        
        {historial.length === 0 ? (
            <p>No hay datos históricos para mostrar.</p>
        ) : (
            <div style={styles.chartContainer}>
            {historial.map((dia, index) => (
                <div key={index} style={styles.barGroup}>
                <div 
                    style={{
                    ...styles.bar, 
                    height: `${(dia.visitas / maxVisitas) * 100}px`, 
                    backgroundColor: dia.visitas >= maxVisitas ? '#ff5722' : '#2196f3'
                    }} 
                />
                <span style={styles.barLabel}>{dia.fecha ? dia.fecha.slice(5) : 'N/A'}</span>
                <span style={styles.barValue}>{dia.visitas}</span>
                </div>
            ))}
            </div>
        )}
      </div>
    </div>
  );
}

// ESTILOS (Iguales que antes)
const styles = {
  container: {
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '600px',
    textAlign: 'center',
    border: '1px solid transparent'
  },
  title: { color: '#1a202c', marginBottom: '5px' },
  subtitle: { color: '#718096', marginBottom: '30px' },
  infoGrid: { display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '20px' },
  statBox: { 
    backgroundColor: '#ebf8ff', 
    padding: '15px', 
    borderRadius: '10px', 
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  label: { fontSize: '0.9em', color: '#4a5568', marginBottom: '5px' },
  number: { fontSize: '1.5em', fontWeight: 'bold', color: '#2b6cb0' },
  link: { color: '#2b6cb0', textDecoration: 'none', fontWeight: 'bold' },
  chartContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: '150px',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '10px',
    marginTop: '20px'
  },
  barGroup: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' },
  bar: { width: '20px', borderRadius: '4px 4px 0 0', transition: 'all 0.3s ease', minHeight: '5px' },
  barLabel: { fontSize: '0.7em', color: '#718096' },
  barValue: { fontSize: '0.8em', fontWeight: 'bold', color: '#2d3748' }
};

export default Stats;