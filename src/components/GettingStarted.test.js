import React from 'react';
import { shallow } from 'enzyme';

import { GettingStarted } from './GettingStarted';

describe('Component: Getting Started', () => {
  const wrapper = shallow(<GettingStarted />);

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the expansion container', () => {
    expect(wrapper.find('.getting-started').exists()).toBe(true);
  });

  it('renders the expansion panel', () => {
    expect(wrapper.find('.panel').exists()).toBe(true);
  });
});
