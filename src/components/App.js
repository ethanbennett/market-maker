import React, { Component } from 'react';

import AccountDetails from './AccountDetails';
import ExchangeForm from './ExchangeForm';
import GettingStarted from './GettingStarted';
import ERC20 from '../services/ERC20';
import MarketMaker from '../services/MarketMaker';
import Metamask from '../services/Metamask';
import logo from '../../public/ethLogo.png';
import '../stylesheets/App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountData: '',
      marketState: '',
    };
  }

  async componentWillMount() {
    let ethBalance;
    let tokenBalance;
    const address = await Metamask.setAccount();
    const onRinkeby = await Metamask.checkNetwork();

    if (address && onRinkeby) {
      ethBalance = await Metamask.getEthBalance(address);
      tokenBalance = await ERC20.getTokenBalance(address);
    }

    let invariant;
    let totalEth;
    let totalTokens;

    if (onRinkeby) {
      invariant = await MarketMaker.getInvariant();
      totalEth = await MarketMaker.getTotalEthQuantity();
      totalTokens = await MarketMaker.getTotalTokenQuantity();
    }

    this.setState({
      accountData: {
        address: address,
        onRinkeby: onRinkeby,
        ethBalance: ethBalance,
        tokenBalance: tokenBalance,
      },
      marketState: {
        invariant: this.convertData(invariant),
        totalEth: this.convertData(totalEth),
        totalTokens: parseInt(totalTokens, 10),
      },
    });
  }

  convertData(number) {
    return number / 10 ** 18;
  }

  render() {
    const { accountData, marketState } = this.state;

    return (
      <div className="App">
        <img className="eth-logo" src={logo} alt="ethereum" />
        <AccountDetails accountData={accountData} />
        <ExchangeForm accountData={accountData} marketState={marketState} />
        <GettingStarted accountData={accountData} />
      </div>
    );
  }
}

export default App;
