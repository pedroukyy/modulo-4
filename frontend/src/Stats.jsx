import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// MOCK DATA (Simulando respuesta de tu Módulo 3)
const MOCK_DATA = {
  urlOriginal: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  totalVisitas: 1245,
  creado: "2023-11-01",
  historial: [
    { fecha: '2023-11-20', visitas: 45 },
    { fecha: '2023-11-21', visitas: 120 },
    { fecha: '2023-11-22', visitas: 85 },
    { fecha: '2023-11-23', visitas: 200 }, // Día pico
    { fecha: '2023-11-24', visitas: 150 },
    { fecha: '2023-11-25', visitas: 90 },
    { fecha: '2023-11-26', visitas: 300 },
  ]
};

function Stats() {
  const { codigo } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos la petición al API Gateway (Módulo 3)
    setTimeout(() => {
      setData(MOCK_DATA);
      setLoading(false);
    }, 1000);
  }, [codigo]);

  if (loading) return <div style={styles.container}><h2>🔄 Cargando estadísticas...</h2></div>;

  // Calculamos el máximo para escalar las barras del gráfico
  const maxVisitas = Math.max(...data.historial.map(d => d.visitas));

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>📊 Estadísticas del Enlace</h1>
        <p style={styles.subtitle}>Código: <strong>{codigo}</strong></p>
        
        <div style={styles.infoGrid}>
          <div style={styles.statBox}>
            <span style={styles.label}>Total Visitas</span>
            <span style={styles.number}>{data.totalVisitas}</span>
          </div>
          <div style={styles.statBox}>
            <span style={styles.label}>URL Original</span>
            <a href={data.urlOriginal} target="_blank" style={styles.link}>
              {data.urlOriginal.substring(0, 30)}...
            </a>
          </div>
        </div>

        <h3 style={{marginTop: '30px', color: '#555'}}>📅 Visitas últimos 7 días</h3>
        <div style={styles.chartContainer}>
          {data.historial.map((dia, index) => (
            <div key={index} style={styles.barGroup}>
              {/* La barra visual */}
              <div 
                style={{
                  ...styles.bar, 
                  height: `${(dia.visitas / maxVisitas) * 100}px`, // Altura dinámica
                  backgroundColor: dia.visitas === maxVisitas ? '#ff5722' : '#2196f3' // Color diferente para el pico
                }} 
              />
              <span style={styles.barLabel}>{dia.fecha.slice(5)}</span>
              <span style={styles.barValue}>{dia.visitas}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ESTILOS CSS EN JAVASCRIPT (Para que sea "Hermoso y Elegante")
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
    textAlign: 'center'
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
  
  // Gráfico
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
  bar: { width: '20px', borderRadius: '4px 4px 0 0', transition: 'all 0.3s ease' },
  barLabel: { fontSize: '0.7em', color: '#718096' },
  barValue: { fontSize: '0.8em', fontWeight: 'bold', color: '#2d3748' }
};

export default Stats;