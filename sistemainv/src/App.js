
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import ItemList from './Pages/ItemList';
import ItemCreate from './Pages/ItemCreate';
import ItemEdit from './Pages/ItemEdit';
import Login from './Pages/Login';
import UsuarioList from './Pages/UsuarioList';

import './global.css'
import FormEmprestimoCreate from './Pages/formEmprestimoCreate/index';
function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" exeact element={<ItemList/>} />
          <Route path="/itemEdit/:itemId" element={<ItemEdit/>} />
          <Route path="/itemCreate" element={<ItemCreate/>} />
          <Route path="/login" exeact element={<Login/>} />
          <Route path="/emprestimoCreate" exeact element={<FormEmprestimoCreate/>} />
          <Route path="/usuarioList" exeact element={<UsuarioList/>} />
        </Routes>
    </Router>
  );
}

export default App;
