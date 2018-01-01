import React, { Component } from 'react';
import { ExpansionList, ExpansionPanel, Button, TextField } from 'react-md';

import ERC20 from '../services/ERC20';
import './App.scss';

class GettingStarted extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountData: {},
      allowance: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.accountData !== nextProps.accountData) {
      this.setState({ accountData: nextProps.accountData });
    }
  }

  handleAllowance(value) {
    const allowance = value * 10 ** 18;

    this.setState({ allowance: allowance });
  }

  render() {
    const { accountData, allowance } = this.state;

    return (
      <ExpansionList className="getting-started">
        <ExpansionPanel
          className="panel"
          label="First time here?"
          footer={null}
        >
          <div className="approve-block md-grid">
            <TextField
              id="approve"
              type="number"
              label="Amount in ETH"
              onChange={value => this.handleAllowance(parseInt(value, 10))}
              className="md-cell md-cell-bottom"
            />
            <Button
              raised
              primary
              className="approve-button"
              onClick={() => ERC20.approve(accountData.address, allowance)}
            >
              Allow
            </Button>
          </div>
        </ExpansionPanel>
      </ExpansionList>
    );
  }
}

export default GettingStarted;
