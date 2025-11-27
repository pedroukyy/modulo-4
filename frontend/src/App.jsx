import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Stats from './Stats';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Si entran a la raíz, mostramos un mensaje simple */}
        <Route path="/" element={<h1 style={{textAlign:'center'}}>📊 Dashboard de Estadísticas</h1>} />
        
        {/* Esta es la ruta importante: /stats/123 */}
        <Route path="/stats/:codigo" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;