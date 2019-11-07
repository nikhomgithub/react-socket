import React from 'react';
import './App.css';
import Dashboard from './Dashboard';
import StoreContextProvider from './Store';

function App() {
  return (
      <div className="App">
        <StoreContextProvider>
          <Dashboard/>
        </StoreContextProvider>
      </div>
  );
}

export default App;
