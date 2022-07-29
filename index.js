/**
 * @format
 */
 import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
//  import store from './src/redux/Store';
 import { Provider } from 'react-redux';
 import reduxStore from './src/redux/Store'
import configureStore from "./src/redux/Store"
import { PersistGate } from 'redux-persist/integration/react';

const {store,persistor} = reduxStore();
 const provider = () =>{
    return(
        <Provider store={store} >
            <PersistGate loading={null} persistor={persistor}>
            <App />
            </PersistGate>
        </Provider>
    )
}

// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => provider);
