import React from 'react';
import { shallow } from 'enzyme';

import { MetamaskPrompt } from './MetamaskPrompt';

describe('Component: Getting Started', () => {
  const wrapper = shallow(<MetamaskPrompt />);

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the prompt', () => {
    expect(wrapper.find('.prompt').exists()).toBe(true);
  });
});
