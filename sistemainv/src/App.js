
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import ItemList from './Pages/ItemList';
import ItemCreate from './Pages/ItemCreate';
import ItemEdit from './Pages/ItemEdit';
import Login from './Pages/Login';
import UsuarioList from './Pages/UsuarioList';
import UsuarioEdit from './Pages/UsuarioEdit';
import UsuarioCreate from './Pages/UsuarioCreate';
import ImportArquivo from './Pages/ImportArquivo';
import LocalList from './Pages/LocalList';
import LocalEdit from './Pages/LocalEdit';
import LocalCreate from './Pages/LocalCreate';
import BarCode from './Pages/BarCode';

import './global.css'
import FormEmprestimoCreate from './Pages/formEmprestimoCreate/index';
function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" exeact element={<ItemList/>} />
          <Route path="/itemEdit/:id" element={<ItemEdit/>} />
          <Route path="/itemCreate" element={<ItemCreate/>} />
          <Route path="/login" exeact element={<Login/>} />
          <Route path="/emprestimoCreate" exeact element={<FormEmprestimoCreate/>} />
          <Route path="/usuarioList" exeact element={<UsuarioList/>} />
          <Route path="/usuarioEdit/:userId" exeact element={<UsuarioEdit/>} />
          <Route path="/UsuarioCreate" exeact element={<UsuarioCreate/>} />
          <Route path="/ImportArquivo" exeact element={<ImportArquivo/>} />
          <Route path="/LocalList" exeact element={<LocalList/>} />
          <Route path="/LocalEdit/:userId" exeact element={<LocalEdit/>} />
          <Route path="/BarCode" exeact element={<BarCode/>} />
        </Routes>
    </Router>
  );
}

export default App;
