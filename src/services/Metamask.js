import w3 from '../eth/web3Instance';

class Metamask {
  async setAccount() {
    try {
      const addresses = await w3.eth.getAccounts();
      return addresses[0];
    } catch (error) {
      console.log(error);
    }
  }

  async checkNetwork() {
    try {
      const response = await w3.eth.net.getNetworkType();
      if (response === 'rinkeby') {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getEthBalance(userAddress) {
    try {
      const balance = await w3.eth.getBalance(userAddress);
      const valueInEth = balance / 10 ** 18;
      return Math.round(valueInEth * 10000) / 10000;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Metamask();
