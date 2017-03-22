import React from 'react';
import {mount} from 'enzyme';
import ReactDOM from 'react-dom';
import Balance from '../balance';

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

describe('Balance component', function () {
    const qty = 8;
    const weight = 10;
    const component = <Provider store={store}><Balance qty={qty} weight={weight} /></Provider>;

    it('should render without crashing', () => {
        const container = document.createElement('div');
        ReactDOM.render(component, container);
    });

    it('should have ' + qty + ' items', () => {
        const render = mount(component);
        expect(render.find('.item').length).toEqual(qty);
    });
});
