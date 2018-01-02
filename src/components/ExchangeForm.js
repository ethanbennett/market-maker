import React, { Component } from 'react';
import { Button, TextField } from 'react-md';

import MarketMaker from '../services/MarketMaker';
import '../stylesheets/App.scss';

class ExchangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ethValue: '',
      tokenValue: '',
      accountData: {
        onRinkeby: false,
      },
      marketState: {
        totalEth: 0,
        totalTokens: 0,
        invariant: 0,
      },
      fee: 0,
      netEth: 0,
      netTokens: 0,
    };
  }

  // Add flash message timer

  componentWillReceiveProps(nextProps) {
    if (this.props.accountData !== nextProps.accountData) {
      this.setState({ accountData: nextProps.accountData });
    }

    if (this.props.marketState !== nextProps.marketState) {
      this.setState({ marketState: nextProps.marketState });
    }
  }

  updateForms(value, form) {
    if (form === 'eth') {
      this.setState({ ethValue: value });
      this.setEthRate(value);
    } else if (form === 'token') {
      this.setState({ tokenValue: value });
      this.setTokenRate(value);
    }
  }

  async handleBuy(token) {
    const { accountData, ethValue, tokenValue } = this.state;

    this.validateInput(token);

    this.setState({
      result:
        'Please use MetaMask to confirm your transaction and check its status.',
    });

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

  setEthRate(value) {
    const { invariant, totalTokens, totalEth } = this.state.marketState;
    const newTotalEth = invariant / (totalTokens + value);
    const netEth = totalEth - newTotalEth;

    return this.setState({ netEth: netEth.toFixed(4) });
  }

  setTokenRate(value) {
    const { invariant, totalTokens, totalEth } = this.state.marketState;
    const newTotalTokens = invariant / (totalEth + value);
    const netTokens = totalTokens - newTotalTokens;
    const fee = value / 500;

    return this.setState({ fee: fee, netTokens: netTokens.toFixed(4) });
  }

  renderEthRates() {
    let netEth;
    let invariant;
    let totalEth;
    const { marketState } = this.state;

    if (isNaN(this.state.netEth)) {
      netEth = 0;
    } else {
      netEth = this.state.netEth;
    }

    if (isNaN(marketState.invariant)) {
      invariant = 0;
    } else {
      invariant = marketState.invariant;
    }

    if (isNaN(marketState.totalEth)) {
      totalEth = 0;
    } else {
      totalEth = marketState.totalEth;
    }

    return (
      <div className="rates">
        <p>
          <strong>Net ETH:</strong> Approximately {netEth}
        </p>
        <p>
          <strong>Total ETH Quantity:</strong> {totalEth}
        </p>
        <p>
          <strong>Invariant:</strong> {invariant}
        </p>
      </div>
    );
  }

  renderTokenRates() {
    let netTokens;
    let fee;
    let totalTokens;
    const { marketState } = this.state;

    if (isNaN(this.state.netTokens)) {
      netTokens = 0;
    } else {
      netTokens = this.state.netTokens;
    }

    if (isNaN(this.state.fee)) {
      fee = 0;
    } else {
      fee = this.state.fee;
    }

    if (isNaN(marketState.totalTokens)) {
      totalTokens = 0;
    } else {
      totalTokens = marketState.totalTokens;
    }

    return (
      <div className="rates">
        <p>
          <strong>Net POLY:</strong> Approximately {netTokens}
        </p>
        <p>
          <strong>Total POLY Quantity:</strong> {totalTokens}
        </p>
        <p>
          <strong>Fee:</strong> {fee} ETH
        </p>
      </div>
    );
  }

  render() {
    const { accountData, result } = this.state;

    return (
      <div className="exchange-form">
        <div className="eth-block">
          <div className="field-with-button">
            <TextField
              id="eth"
              type="number"
              label="Amount in POLY"
              onChange={value => this.updateForms(parseInt(value, 10), 'eth')}
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
          <div className="rates">{this.renderEthRates()}</div>
        </div>
        <div className="token-block">
          <div className="field-with-button">
            <TextField
              id="token"
              type="number"
              label="Amount in ETH"
              onChange={value => this.updateForms(parseInt(value, 10), 'token')}
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
          <div className="rates">{this.renderTokenRates()}</div>
        </div>
        <p className="metamask-message">{result}</p>
      </div>
    );
  }
}

export default ExchangeForm;
