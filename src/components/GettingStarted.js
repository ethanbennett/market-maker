import React, { Component } from 'react';
import { ExpansionList, ExpansionPanel } from 'react-md';

import '../stylesheets/App.scss';

export class GettingStarted extends Component {
  render() {
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
            contract to collect ETH from the (ERC20) token contract on your
            behalf. You'll then see the option to buy ETH.<br />
            <br />
            Special thanks to Vitalik for building the market maker!
          </p>
          <br />
        </ExpansionPanel>
      </ExpansionList>
    );
  }
}

export default GettingStarted;
