import React from 'react';
import {shallow, mount} from 'enzyme';
import ReactDOM from 'react-dom';
import Item from '../item';

describe('Item component', function () {
    const weight = 100;
    const item = {
        index: 1,
        weight: 100
    };

    const handleItemClick = () => {
        item.weight = Math.floor(weight * 1.1);
    };
    const component = <Item key={item.index} id={item.index} item={item} selected={item.weight !== weight} handleClick={handleItemClick}/>;

    it('should render without crashing', () => {
        const container = document.createElement('div');
        ReactDOM.render(component, container);
    });

    it('should select the item', () => {
        const render = shallow(component);
        render.find('.container').simulate('click');
        expect(item.weight).toEqual(Math.floor(weight * 1.1));
    });
});
