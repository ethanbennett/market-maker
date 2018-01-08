import React, { Component } from 'react';
import { Button, TextField } from 'react-md';

import MarketMaker from '../services/MarketMaker';
import ERC20 from '../services/ERC20';
import filterNaN from '../utils/dataUtils';
import '../stylesheets/App.scss';

export class ExchangeForm extends Component {
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
      approved: false,
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

  updateForms(value, form) {
    const { totalEth, totalTokens } = this.state.marketState;

    if (form === 'eth') {
      const rate = this.calcuRate(parseFloat(value, 10), totalTokens, totalEth);
      this.setState({
        ethValue: value,
        netEth: rate,
      });
    } else if (form === 'token') {
      const rate = this.calcuRate(parseFloat(value), totalEth, totalTokens);
      this.setState({
        tokenValue: value,
        netTokens: rate,
        fee: value / 500,
      });
    }
  }

  handleBuy(token) {
    const { accountData, ethValue, tokenValue } = this.state;

    if (token === 'eth') {
      MarketMaker.tokensToEth(ethValue, accountData.address);
    } else {
      MarketMaker.ethToTokens(tokenValue * 10 ** 18, accountData.address);
    }
  }

  calcuRate(value, firstTotal, secondTotal) {
    const { invariant } = this.state.marketState;
    const newTotal = invariant / (firstTotal + value);
    const net = secondTotal - newTotal;

    return net.toFixed(4);
  }

  renderEthRates() {
    const { marketState } = this.state;
    const netEth = filterNaN(this.state.netEth);
    const totalEth = filterNaN(marketState.totalEth);
    const invariant = filterNaN(marketState.invariant);

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
    const netTokens = filterNaN(this.state.netTokens);
    const fee = filterNaN(this.state.fee);
    const totalTokens = filterNaN(this.state.marketState.totalTokens);

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

  renderEthButtons() {
    const { accountData, approved } = this.state;

    if (!approved) {
      return (
        <Button
          id="approve"
          className="approve-button"
          disabled={!accountData.onRinkeby || !accountData.address}
          onClick={() => this.handleApproval()}
          raised
          primary
        >
          Approve Eth Purchase
        </Button>
      );
    } else {
      return (
        <Button
          raised
          primary
          className="confirm-button buy-eth"
          disabled={!accountData.onRinkeby || !accountData.address}
          onClick={() => this.handleBuy('eth')}
        >
          Buy Eth
        </Button>
      );
    }
  }

  handleApproval() {
    const { accountData, ethValue } = this.state;
    return ERC20.approve(accountData.address, ethValue, this.approvalCallback);
  }

  approvalCallback = () => {
    return this.setState({ approved: true });
  };

  generateFormClass() {
    if (!this.state.approved) {
      return 'exchange-form';
    } else {
      return 'exchange-form skinny';
    }
  }

  render() {
    const { accountData } = this.state;

    return (
      <div className={this.generateFormClass()}>
        <div className="eth-block">
          <div className="field-with-button">
            <TextField
              id="eth"
              type="number"
              label="Amount in POLY"
              onChange={value => this.updateForms(value, 'eth')}
              className="md-cell md-cell--bottom"
            />
            {this.renderEthButtons()}
          </div>
          <div className="rates">{this.renderEthRates()}</div>
        </div>
        <div className="token-block">
          <div className="field-with-button">
            <TextField
              id="token"
              type="number"
              label="Amount in ETH"
              onChange={value => this.updateForms(value, 'token')}
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
      </div>
    );
  }
}

export default ExchangeForm;
