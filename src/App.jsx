import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import DetailsRecipe from './pages/DetailsRecipe';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adicionar-receita" element={<AddRecipe />} />
        <Route path="/adicionar-receita/:id" element={<AddRecipe />} />
        <Route path="/receita/:id" element={<DetailsRecipe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
