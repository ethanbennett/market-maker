import React, { Component } from 'react';

import AccountDetails from './AccountDetails';
import ExchangeForm from './ExchangeForm';
import GettingStarted from './GettingStarted';
import ERC20 from '../services/ERC20';
import MarketMaker from '../services/MarketMaker';
import Metamask from '../services/Metamask';
import { convertData } from '../utils/dataUtils';
import logo from '../../public/ethLogo.png';
import '../stylesheets/App.scss';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountData: '',
      marketState: '',
    };
  }

  async componentWillMount() {
    const accountData = await this.compileAccountData();
    const marketState = await this.compileMarketState(accountData.onRinkeby);

    this.setState({ accountData: accountData, marketState: marketState });
  }

  async compileAccountData() {
    let ethBalance;
    let tokenBalance;
    const address = await Metamask.setAccount();
    const onRinkeby = await Metamask.checkNetwork();

    if (address && onRinkeby) {
      ethBalance = await Metamask.getEthBalance(address);
      tokenBalance = await ERC20.getTokenBalance(address);
    }

    return {
      address: address,
      onRinkeby: onRinkeby,
      ethBalance: ethBalance,
      tokenBalance: tokenBalance,
    };
  }

  async compileMarketState(onRinkeby) {
    let invariant;
    let totalEth;
    let totalTokens;

    if (onRinkeby) {
      invariant = await MarketMaker.getInvariant();
      totalEth = await MarketMaker.getTotalEthQuantity();
      totalTokens = await MarketMaker.getTotalTokenQuantity();
    }

    return {
      invariant: convertData(invariant),
      totalEth: convertData(totalEth),
      totalTokens: parseInt(totalTokens, 10),
    };
  }

  render() {
    const { accountData, marketState } = this.state;

    return (
      <div className="App">
        <img className="eth-logo" src={logo} alt="ethereum" />
        <AccountDetails accountData={accountData} />
        <ExchangeForm accountData={accountData} marketState={marketState} />
        <GettingStarted />
      </div>
    );
  }
}

export default App;
