import React from 'react';
import { shallow } from 'enzyme';

import { ExchangeForm } from './ExchangeForm';
import mockAccountData from '../utils/mockAccountData';
import mockMarketState from '../utils/mockMarketState';

describe('Component: Exchange Form', () => {
  const wrapper = shallow(
    <ExchangeForm accountData={mockAccountData} marketState={mockMarketState} />
  );

  it('renders the exchange form', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a form for ETH', () => {
    expect(wrapper.find('.eth-block').exists()).toBe(true);
  });

  it('renders a form for POLY', () => {
    expect(wrapper.find('.token-block').exists()).toBe(true);
  });

  it('renders approval button for ETH initially', () => {
    expect(wrapper.find('.approve-button').exists()).toBe(true);
  });

  it('renders ETH and POLY rates', () => {
    expect(wrapper.find('.rates').exists()).toBe(true);
  });
});
