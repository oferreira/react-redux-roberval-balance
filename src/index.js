import React from 'react';
import ReactDOM from 'react-dom';

import { Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import {persistStore, autoRehydrate} from 'redux-persist'
import {asyncSessionStorage} from 'redux-persist/storages'
import thunk from 'redux-thunk'
import reducers from './reducers'

const middleware = [thunk]
const store = createStore(
    reducers,
    compose(
        applyMiddleware(...middleware),
        autoRehydrate()
    )
)

persistStore(store, {storage: asyncSessionStorage, blacklist: []})

import App from './containers/app';
import './style.css';


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
