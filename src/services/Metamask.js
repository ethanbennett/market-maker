import w3 from '../eth/web3Instance';

class Metamask {
  async setAccount() {
    const addresses = await w3.eth.getAccounts();
    return addresses[0];
  }

  async checkNetwork() {
    const response = await w3.eth.net.getNetworkType();
    if (response === 'rinkeby') {
      return true;
    } else {
      return false;
    }
  }

  async checkEthBalance(userAddress) {
    const balance = await w3.eth.getBalance(userAddress);
    const valueInEth = balance / 10 ** 18;
    return Math.round(valueInEth * 10000) / 10000;
  }
}

export default new Metamask();
