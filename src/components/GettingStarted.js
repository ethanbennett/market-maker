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
            written in Viper and deployed on the Rinkeby test network. The
            prices are dynamic; start typing to see the current rate. Click
            below to allow the contract to exchange tokens on your behalf. If
            your transaction fails, you likely need to approve again to allow
            for more transactions.
          </p>
          <br />
          <Button
            raised
            primary
            className="approve-button"
            onClick={() => ERC20.approve(accountData.address)}
          >
            Allow Panda to Buy and Sell Tokens
          </Button>
        </ExpansionPanel>
      </ExpansionList>
    );
  }
}

export default GettingStarted;
