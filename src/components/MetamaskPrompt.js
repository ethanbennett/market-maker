import React, { Component } from 'react';
import '../stylesheets/App.scss';

class MetamaskPrompt extends Component {
  render() {
    return (
      <h1 className="account-balance prompt">
        You'll need the MetaMask extension for Chrome, Firefox, or Brave to use
        this app. Click <a href="http://metamask.io">here</a> to download it.
      </h1>
    );
  }
}

export default MetamaskPrompt;
