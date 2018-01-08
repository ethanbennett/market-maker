import React from 'react';
import { shallow } from 'enzyme';

import { AccountDetails } from './AccountDetails';
import mockAccountData from '../utils/mockAccountData';

describe('Component: Account Details', () => {
  const wrapper = shallow(<AccountDetails accountData={mockAccountData} />);

  it('renders account details', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders account balance or metamask instructions', () => {
    expect(wrapper.find('.account-balance').exists()).toBe(true);
  });
});
