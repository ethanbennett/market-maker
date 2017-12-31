import React, { Component } from 'react';

import AccountDetails from './AccountDetails';
import ExchangeForm from './ExchangeForm';
import GettingStarted from './GettingStarted';
import Metamask from '../services/Metamask';
import logo from '../../public/ethLogo.png';
import './App.scss';

import MarketMaker from '../services/MarketMaker';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountData: '',
      marketState: '',
    };
  }

  async componentWillMount() {
    let balance;
    const address = await Metamask.setAccount();
    const onRinkeby = await Metamask.checkNetwork();

    if (address && onRinkeby) {
      balance = await Metamask.checkEthBalance(address);
    }

    const invariant = await MarketMaker.getInvariant();
    const totalEth = await MarketMaker.getTotalEthQuantity();
    const totalTokens = await MarketMaker.getTotalTokenQuantity();

    this.setState({
      accountData: {
        address: address,
        onRinkeby: onRinkeby,
        balance: balance,
      },
      marketState: {
        invariant: invariant,
        totalEth: totalEth,
        totalTokens: totalTokens,
      },
    });
  }

  render() {
    const { accountData } = this.state;

    return (
      <div className="App">
        <img className="eth-logo" src={logo} alt="ethereum" />
        <AccountDetails accountData={accountData} />
        <ExchangeForm accountData={accountData} />
        <GettingStarted accountData={accountData} />
      </div>
    );
  }
}

export default App;
