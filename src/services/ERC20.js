import { erc20Contract } from '../eth/erc20Contract';
import { marketMakerAddress } from '../eth/marketMakerContract';

class ERC20 {
  async approve(userAddress) {
    try {
      return await erc20Contract.methods
        .approve(marketMakerAddress, 2 * 10 ** 18)
        .send({ from: userAddress }, function(error, txHash) {
          console.log({ txHash: txHash, error: error });
        });
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
