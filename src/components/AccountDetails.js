import React, { Component } from 'react';
import './App.scss';

class AccountDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountData: 'Loading',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.accountData !== nextProps.accountData) {
      this.setState({ accountData: nextProps.accountData });
    }
  }

  validateNetwork() {
    const { accountData } = this.state;

    if (accountData === 'Loading') {
      return <h1>Waiting for MetaMask...</h1>;
    } else if (accountData.onRinkeby) {
      return <h1>Account Balance: {accountData.balance} ETH</h1>;
    } else {
      return (
        <div className="connection-warning">
          <h1>Please connect MetaMask to the Rinkeby network to continue</h1>
        </div>
      );
    }
  }

  render() {
    return <div className="account-details">{this.validateNetwork()}</div>;
  }
}

export default AccountDetails;
