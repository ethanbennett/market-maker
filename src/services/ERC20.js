import { erc20Contract } from '../eth/erc20Contract';
import { marketMakerAddress } from '../eth/marketMakerContract';

class ERC20 {
  async approve(userAddress) {
    return await erc20Contract.methods
      .approve(marketMakerAddress, 2000000)
      .send({ from: userAddress }, function(error, txHash) {
        console.log({ txHash: txHash, error: error });
      });
  }

  async getTokenBalance(address) {
    return await erc20Contract.methods.balanceOf(address).call();
  }
}

export default new ERC20();
