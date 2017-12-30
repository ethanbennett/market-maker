import React, { Component } from 'react';
import { ExpansionList, ExpansionPanel } from 'react-md';

import './App.scss';

class GettingStarted extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountData: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.accountData !== nextProps.accountData) {
      this.setState({ accountData: nextProps.accountData });
    }
  }

  render() {
    return (
      <ExpansionList className="getting-started">
        <ExpansionPanel
          className="panel"
          label="First time here?"
          footer={null}
        >
          <p>Yo!</p>
        </ExpansionPanel>
      </ExpansionList>
    );
  }
}

export default GettingStarted;
