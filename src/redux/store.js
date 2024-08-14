import { legacy_createStore as createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import rootReducer from './reducers'; 

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['categoriaReducer', 'subcategoriaReducer', 'custoReducer', 'fluxoReducer', 'formaDePagamentoReducer', 'registroReducer']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
