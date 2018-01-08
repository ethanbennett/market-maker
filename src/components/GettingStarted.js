import React, { Component } from 'react';
import { ExpansionList, ExpansionPanel, Button } from 'react-md';

import ERC20 from '../services/ERC20';
import '../stylesheets/App.scss';

class GettingStarted extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountData: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.accountData !== nextProps.accountData) {
      this.setState({ accountData: nextProps.accountData });
    }
  }

  render() {
    const { accountData } = this.state;

    return (
      <ExpansionList className="getting-started">
        <ExpansionPanel
          className="panel"
          label="First time here?"
          footer={null}
        >
          <p>
            Panda Exchange interacts with a market maker smart contract that was
            written in Viper and deployed to the Rinkeby test network. The
            prices are dynamic; just start typing to see the current rate.<br />
            <br />
            <strong>Note:</strong> If you're selling POLY for ETH, you'll first
            have to click the "approve" button to allow the market maker
            contract to collect ETH from the token contract on your behalf.
            You'll then see the option to buy ETH.<br />
            <br />
            Special thanks to Vitalik, who built the market maker{' '}
            <a
              target="_blank"
              href="https://github.com/ethereum/vyper/blob/master/examples/market_maker/on_chain_market_maker.v.py"
            >
              here
            </a>. You can also check out the code for the front end{' '}
            <a
              target="_blank"
              href="https://github.com/ethanbennett/market-maker"
            >
              here
            </a>.
          </p>
          <br />
        </ExpansionPanel>
      </ExpansionList>
    );
  }
}

export default GettingStarted;
