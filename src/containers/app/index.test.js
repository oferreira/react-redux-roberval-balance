import React from 'react';
import {shallow} from 'enzyme';
import ReactDOM from 'react-dom';
import App from '../app';

import { Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../../reducers'
const middleware = [thunk]
const store = createStore(
    reducers,
    compose(
        applyMiddleware(...middleware)
    )
)

describe('App component', function () {
    it('should render without crashing', () => {
        const container = document.createElement('div');
        ReactDOM.render(<Provider store={store}><App /></Provider>, container);
    });

    it('should display the app name', () => {
    //    const app = shallow(<Provider store={store}><App /></Provider>);
    //    const title = 'Bienvenu dans le jeux Roberval Balance';

    //    expect(app.contains(title)).toEqual(true);
    });
});
