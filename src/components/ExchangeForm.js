import React, { Component } from 'react';
import { TextField } from 'react-md';
import { Button } from 'react-md';

import MarketMaker from '../services/MarketMaker';
import './App.scss';

class ExchangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ethValue: '',
      pdaValue: '',
      accountData: {
        onRinkeby: false,
      },
      result: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.accountData !== nextProps.accountData) {
      this.setState({ accountData: nextProps.accountData });
    }
  }

  updateForms(data, form) {
    if (form === 'eth') {
      this.setState({ ethValue: data });
    } else if (form === 'pda') {
      this.setState({ pdaValue: data });
    }
  }

  async handleBuy(token) {
    const { accountData, ethValue, pdaValue } = this.state;

    this.setState({
      result:
        'Please use MetaMask to confirm your transaction and check its status.',
    });

    if (token === 'eth') {
      await MarketMaker.tokensToEth(ethValue, accountData.address);
    } else {
      await MarketMaker.ethToTokens(pdaValue * 10 ** 18, accountData.address);
    }
  }

  render() {
    const { accountData, result } = this.state;

    return (
      <div className="exchange-form">
        <div className="text-fields md-grid">
          <div className="field-with-button">
            <TextField
              id="eth"
              label="Amount in PDA"
              onChange={data => this.updateForms(data, 'eth')}
              className="md-cell md-cell--bottom"
            />
            <Button
              raised
              primary
              className="confirm-button"
              disabled={!accountData.onRinkeby}
              onClick={() => this.handleBuy('eth')}
            >
              Buy Eth
            </Button>
          </div>
          <div className="field-with-button">
            <TextField
              id="pda"
              label="Amount in ETH"
              onChange={data => this.updateForms(data, 'pda')}
              className="md-cell md-cell--bottom"
            />
            <Button
              raised
              primary
              className="confirm-button"
              disabled={!accountData.onRinkeby}
              onClick={() => this.handleBuy('pda')}
            >
              Buy PDA
            </Button>
          </div>
        </div>
        <p className="metamask-message">{result}</p>
      </div>
    );
  }
}

export default ExchangeForm;
