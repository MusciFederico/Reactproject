import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';

import AppNavbar from './components/navbar/navbar';
import ItemListContainer from './conteiner/itemlistcontainer/ItemListContainer';
import NoEncontrado from './components/notfound/notfound';
import ItemDetalContainer from './components/ItemDetailConteiner/itemdetailconteiner';

function App() {
  return (
    <BrowserRouter>
      <AppNavbar />
      <Routes>
        <Route exact path="/" element={<ItemListContainer greeting="Bienvenido a Chrysus" />} />
        <Route path="/category/:categoria" element={<ItemListContainer greeting="Bienvenido a Chrysus" />} />
        <Route path="/item/:id" element={<ItemDetalContainer />} />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
