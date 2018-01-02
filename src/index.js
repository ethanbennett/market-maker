import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.scss';
import App from './components/App';
import registerServiceWorker from './utils/registerServiceWorker';
import init from './utils/background';

import MetamaskPrompt from './components/MetamaskPrompt';

function Detect(props) {
  init();
  const { metamask } = props;
  if (typeof metamask === 'undefined') {
    return <MetamaskPrompt />
  } else {
    return <App />
  }
}

ReactDOM.render(<Detect metamask={window.web3} />, document.getElementById('root'));
registerServiceWorker();
