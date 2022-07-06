/**
 * @format
 */
 import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
 import store from './src/redux/Store';
 import { Provider } from 'react-redux';


 const provider = () =>{
    return(
        <Provider store={store} >
            <App />
        </Provider>
    )
}

// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => provider);
