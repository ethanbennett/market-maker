import React, { Component } from 'react';
import { Button, TextField } from 'react-md';

import MarketMaker from '../services/MarketMaker';
import './App.scss';

class ExchangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ethValue: '',
      tokenValue: '',
      accountData: {
        onRinkeby: false,
      },
      marketState: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.accountData !== nextProps.accountData) {
      this.setState({ accountData: nextProps.accountData });
    }

    if (this.props.marketState !== nextProps.marketState) {
      this.setState({ marketState: nextProps.marketState });
    }
  }

  updateForms(data, form) {
    if (form === 'eth') {
      this.setState({ ethValue: data });
    } else if (form === 'token') {
      this.setState({ tokenValue: data });
    }
  }

  async handleBuy(token) {
    const { accountData, ethValue, tokenValue } = this.state;

    this.validateInput(token);

    if (token === 'eth') {
      await MarketMaker.tokensToEth(ethValue, accountData.address);
    } else {
      await MarketMaker.ethToTokens(tokenValue * 10 ** 18, accountData.address);
    }
  }

  validateInput(token) {
    const { ethValue } = this.state;
    let result;

    if (token === 'eth' && ethValue % 1 !== 0) {
      result =
        'Please use whole numbers; partial token sales are not yet supported.';
    } else {
      result =
        'Please use MetaMask to confirm your transaction and check its status.';
    }

    this.setState({
      result: result,
    });
  }

  renderRates(token) {}

  render() {
    const { accountData, result } = this.state;

    return (
      <div className="exchange-form">
        <div className="text-fields md-grid">
          <div className="eth-block">
            <div className="field-with-button">
              <TextField
                id="eth"
                type="number"
                label="Amount in POLY"
                onChange={data => this.updateForms(data, 'eth')}
                className="md-cell md-cell--bottom"
              />
              <Button
                raised
                primary
                className="confirm-button"
                disabled={!accountData.onRinkeby || !accountData.address}
                onClick={() => this.handleBuy('eth')}
              >
                Buy Eth
              </Button>
            </div>
            <div className="rates" />
          </div>
          <div className="token-block">
            <div className="field-with-button">
              <TextField
                id="token"
                type="number"
                label="Amount in ETH"
                onChange={data => this.updateForms(data, 'token')}
                className="md-cell md-cell--bottom"
              />
              <Button
                raised
                primary
                className="confirm-button"
                disabled={!accountData.onRinkeby || !accountData.address}
                onClick={() => this.handleBuy('token')}
              >
                Buy POLY
              </Button>
            </div>
            <div className="rates" />
          </div>
        </div>
        <p className="metamask-message">{result}</p>
      </div>
    );
  }
}

export default ExchangeForm;
