import React from 'react';
import './App.css';
import PaginaPrincipal from './pages/PaginaPrincipal/PaginaPrincipal';
import { Provider } from 'react-redux';
import  {store, persistor } from './redux/store'; 
import { PersistGate } from 'redux-persist/integration/react'; 

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaginaPrincipal />
      </PersistGate>
    </Provider>
  );
};

export default App;
