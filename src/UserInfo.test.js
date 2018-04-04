import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import UserInfo from './UserInfo';

configure({adapter: new Adapter()});

it('renders without crashing', () => {
const wrapper = shallow(<UserInfo user={{user:"Test User", id: "test_user_1000", email: "test@test.com" }} />);
expect(wrapper.find('div')).toHaveLength(5);
})