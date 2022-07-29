// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import reducer from "../reducer";


// const Store =  configureStore({
//   reducer,
//   middleware :[...getDefaultMiddleware({thunk:false})] 
// })

// export default Store;
// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore,persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import reducer from "../reducer";
import { createStore } from "redux";


const persistConfig = {
    key:'root',
    storage:AsyncStorage,
};

// const store = createStore(reducer);
// const store = configureStore();
const persistedReducer = persistReducer(persistConfig,reducer);
export default () => {
    let store = createStore(persistedReducer);
    let persistor = persistStore(store);
    return {store, persistor};
  };

  

