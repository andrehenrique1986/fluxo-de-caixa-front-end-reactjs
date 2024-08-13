import { legacy_createStore as createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";

import Reducers from './reducers/index';

const persistedReducer = persistReducer({
    key: 'root',
    storage:storage,
    whitelist: ['categoriaReducer', 'subcategoriaReducer', 'registroReducer']
}, Reducers);

const store = createStore(persistedReducer);

let persistor = persistStore(store);

export { store, persistor };