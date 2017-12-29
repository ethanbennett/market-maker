import React, { Component } from 'react';
import './App.scss';

import { TextField } from 'react-md';

class ExchangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ethForm: '',
      pdaForm: '',
    };
  }

  updateForms(data, form) {
    if (form === 'eth') {
      this.setState({ ethForm: data });
    } else if (form === 'pda') {
      this.setState({ pdaForm: data });
    }
    console.log(this.state);
  }

  render() {
    return (
      <div className="exchange-form">
        <div className="text-fields md-grid">
          <TextField
            id="eth"
            label="Buy ETH"
            type="number"
            onChange={data => this.updateForms(data, 'eth')}
            className="md-cell md-cell--bottom"
          />
          <TextField
            id="pda"
            label="Buy PDA"
            type="number"
            onChange={data => this.updateForms(data, 'pda')}
            className="md-cell md-cell--bottom"
          />
        </div>
      </div>
    );
  }
}

export default ExchangeForm;
