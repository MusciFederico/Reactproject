import React from 'react';
import './App.css';
import AppNavbar from './components/navbar/navbar';
import ItemListContainer from './conteiner/itemlistcontainer/ItemListContainer';

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <ItemListContainer greeting="Bienvenido a Chrysus" />
    </div>
  );
}

export default App;

