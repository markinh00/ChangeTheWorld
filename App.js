import React from 'react';
import Rotas from './src/Rotas';
import TelaPadrao from './src/Telas/TelaPadrao';
import { Provider } from 'react-redux';
import { Store } from './src/redux/store';

export default function App() {
  return<Provider store={ Store } >
    <TelaPadrao> 
      <Rotas/>
    </TelaPadrao>
  </Provider>
}