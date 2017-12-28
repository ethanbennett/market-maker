import Web3 from 'web3';

let w3;

if (window.web3) {
  w3 = new Web3(window.web3.currentProvider);
}

export default w3;
