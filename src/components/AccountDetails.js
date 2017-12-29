import React, { Component } from 'react';
import './App.scss';

import Metamask from '../services/Metamask';

class AccountDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountData: {
        onRinkeby: 'Loading',
      },
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.accountData !== nextProps.accountData) {
      this.setState({ accountData: nextProps.accountData });
    }
  }

  validateNetwork() {
    if (this.state.accountData.onRinkeby === 'Loading') {
      return <h1>Waiting for MetaMask...</h1>;
    } else if (this.state.accountData.onRinkeby) {
      return <h1>{this.state.accountData.balance}</h1>;
    } else {
      return (
        <div className="connection-warning">
          <h1>Please connect MetaMask to the Rinkeby network to continue</h1>
        </div>
      );
    }
  }

  async renderAccountDetails() {
    const { account } = this.props;

    if (account) {
      const balance = await Metamask.checkEthBalance(this.props.account);

      return (
        <div className="account-balance">
          <h1>{balance}</h1>
        </div>
      );
    } else {
      return <div />;
    }
  }

  render() {
    console.log(this.state.accountData);
    return <div className="account-details">{this.validateNetwork()}</div>;
  }
}

export default AccountDetails;
