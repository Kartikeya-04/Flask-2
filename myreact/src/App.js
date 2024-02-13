import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Home';
import Delete from './Delete';
import Update from './Update';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/update" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
