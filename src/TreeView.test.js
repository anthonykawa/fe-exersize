import React from 'react';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TreeView from './TreeView';

configure({adapter: new Adapter()});

it('does not render on pageload', () => {
const wrapper = shallow(<TreeView />);
expect(wrapper.find('div')).toHaveLength(5);
})
