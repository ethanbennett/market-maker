import w3 from '../eth/web3Instance';

class Metamask {
  async setAccount() {
    const addresses = await w3.eth.getAccounts();
    return addresses[0];
  }
}

export default new Metamask();
