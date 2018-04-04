import React from 'react';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';
import {FilePreview} from './FilePreview';
import DisplayInfo from './FilePreview';

configure({adapter: new Adapter()});

describe('Initial render without crashing', () => {
    var props;
    var getFileType = function(){
        return '';
    }
    beforeEach(function(){
        props = {
            getFileType: getFileType
        };
    })
    it('renders without crashing', () => {
        const wrapper = shallow(<DisplayInfo type={getFileType} />);
        expect(wrapper.find('div')).toHaveLength(5);
    })
})


