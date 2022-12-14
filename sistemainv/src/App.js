
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
import UsuarioHome from './Pages/UsuarioHome';
import BarCode from './Pages/BarCode';

import './global.css'
import EmprestimoCreate from './Pages/EmprestimoCreate/index';
import EmprestimoList from './Pages/EmprestimoList/index';

import LocalHome from './Pages/LocalHome/index';
import RelatorioInicio from './Pages/RelatorioInicia';

import NotFound from './Pages/NotFound'

function App() {
  return (
    <Router>
        <Routes>
          <Route path="*" element={<NotFound />}/>
          <Route path="/" exact element={<ItemList/>} />
          <Route path="/itemEdit/:id" element={<ItemEdit/>} />
          <Route path="/itemCreate" element={<ItemCreate/>} />
          
          <Route path="/usuarioHome"  element={<UsuarioHome/>} />
          <Route path="/usuarioList" element={<UsuarioList/>} />
          <Route path="/usuarioEdit/:userId"  element={<UsuarioEdit/>} />
          <Route path="/UsuarioCreate" element={<UsuarioCreate/>} />

          <Route path="/LocalList" element={<LocalList/>} />
          <Route path="/LocalHome" element={<LocalHome/>} />
          <Route path="/LocalEdit/:localId" element={<LocalEdit/>} />
          <Route path="/LocalCreate"  element={<LocalCreate/>} />
          
          
          
          <Route path="/emprestimoCreate" element={<EmprestimoCreate/>} />
          <Route path="/emprestimoList"  element={<EmprestimoList/>} />
          
          <Route path="/login" element={<Login/>} />
          <Route path="/ImportArquivo" element={<ImportArquivo/>} />
          <Route path="/BarCode"  element={<BarCode/>} />

          <Route path="/relatorioInicio" element={<RelatorioInicio />}/>
        </Routes>
    </Router>
  );
}

export default App;
