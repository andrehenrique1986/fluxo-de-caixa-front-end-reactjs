import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import  {store, persistor } from './redux/store'; 
import { PersistGate } from 'redux-persist/integration/react'; 
import PaginaPrincipalWrapper from './pages/PaginaPrincipalWrapper/PaginaPrincipalWrapper';




const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaginaPrincipalWrapper />
      </PersistGate>
    </Provider>
  );
};

export default App;
