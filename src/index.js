import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './utils/registerServiceWorker';

import MetamaskPrompt from './components/MetamaskPrompt';

function Detect(props) {
  const { metamask } = props;
  if (typeof metamask === 'undefined') {
    return <MetamaskPrompt />
  } else {
    return <App />
  }
}

ReactDOM.render(<Detect metamask={window.web3} />, document.getElementById('root'));
registerServiceWorker();
