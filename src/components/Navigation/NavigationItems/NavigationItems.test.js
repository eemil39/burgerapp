/* import React from 'react';

import { configure, shallow, contains } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './Navigationitems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    let wrapper;

    beforeEach(() => {
        const wrapper = shallow(<NavigationItems />);
    });

    it('should render two <NavigationItems/> if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItems/> if authenticated', () => {
        const wrapper = shallow(<NavigationItems isAuthenticated/>);
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render three <NavigationItems/> if authenticated', () => {
        expect(wrapper.contains(<NavigationItem isAuthenticated link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
}); */