import { erc20Contract } from '../eth/erc20Contract';
import { marketMakerAddress } from '../eth/marketMakerContract';

class ERC20 {
  async approve(userAddress, ethValue, approvalCallback) {
    try {
      return await erc20Contract.methods
        .approve(marketMakerAddress, parseFloat(ethValue, 10))
        .send({ from: userAddress }, () => approvalCallback());
    } catch (error) {
      return error;
    }
  }

  async getTokenBalance(address) {
    try {
      return await erc20Contract.methods.balanceOf(address).call();
    } catch (error) {
      return error;
    }
  }
}

export default new ERC20();
