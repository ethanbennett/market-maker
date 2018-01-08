import React from 'react';
import { shallow } from 'enzyme';

import { App } from './App';

describe('Component: App', () => {
  const wrapper = shallow(<App />);

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders ETH logo', () => {
    expect(wrapper.find('.eth-logo').exists()).toBe(true);
  });
});
