import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Navbarapp from './components/navbar/navbar';
import ItemListContainer from './conteiner/itemlistcontainer/ItemListContainer';
import NoEncontrado from './components/notfound/notfound';
import ItemDetalContainer from './components/ItemDetailConteiner/itemdetailconteiner';
import Cart from './components/cart/cart';

function App() {
  return (
    <BrowserRouter>
      <Navbarapp />
      <Routes>
        <Route exact path="/" element={<ItemListContainer greeting="Bienvenido a Chrysus" />} />
        <Route path="/category/:id" element={<ItemListContainer greeting="Bienvenido a Chrysus" />} />
        <Route path="/item/:id" element={<ItemDetalContainer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
