import React from 'react';
import './App.css';
import Form from './components/Form';
import Header from './components/Header';

function App() {
  return (
    <div className="App" style={{ fontSize: 20, color: '#555' }}>
      <Header />
      <Form />
    </div>
  );
}

export default App;
