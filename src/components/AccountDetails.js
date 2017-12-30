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

  validateAccount() {
    const { accountData } = this.state;

    if (accountData === 'Loading') {
      return <h1 className="account-balance">Waiting for MetaMask...</h1>;
    } else if (!accountData.address) {
      return (
        <h1 className="account-balance">
          Please unlock your MetaMask account to continue.
        </h1>
      );
    } else if (accountData.onRinkeby) {
      return (
        <h1 className="account-balance">
          Account Balance: {accountData.balance} ETH
        </h1>
      );
    } else {
      return (
        <h1 className="account-balance">
          Please connect MetaMask to the Rinkeby network to continue.
        </h1>
      );
    }
  }

  render() {
    return <div className="account-details">{this.validateAccount()}</div>;
  }
}

export default AccountDetails;
