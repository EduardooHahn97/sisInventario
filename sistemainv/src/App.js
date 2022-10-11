
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import ItemList from './Pages/ItemList';
import ItemCreate from './Pages/ItemCreate';
import ItemEdit from './Pages/ItemEdit';
import ItemShow from './Pages/ItemShow';
import Login from './Pages/Login';

import './global.css'
function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" exeact element={<ItemList/>} />
          <Route path="/itemEdit" element={<ItemEdit/>} />
          <Route path="/itemCreate" element={<ItemCreate/>} />
          <Route path="/itemShow" element={<ItemShow/>} />
          <Route path="/login" exeact element={<Login/>} />
        </Routes>
    </Router>
  );
}

export default App;
