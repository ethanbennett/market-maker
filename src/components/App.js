import React, { Component } from 'react';

import AccountDetails from './AccountDetails';
import ExchangeForm from './ExchangeForm';
import Metamask from '../services/Metamask';
// import MarketMaker from '../services/MarketMaker';
import logo from '../../public/ethLogo.png';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountData: '',
    };
  }

  async componentWillMount() {
    let balance;
    const address = await Metamask.setAccount();
    const onRinkeby = await Metamask.checkNetwork();

    if (address && onRinkeby) {
      balance = await Metamask.checkEthBalance(address);
    }

    // MarketMaker.initiate(address);

    this.setState({
      accountData: {
        address: address,
        onRinkeby: onRinkeby,
        balance: balance,
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
      </div>
    );
  }
}

export default App;
