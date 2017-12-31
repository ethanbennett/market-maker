import { marketMakerContract } from '../eth/marketMakerContract';
import { erc20Address } from '../eth/erc20Contract';

class MarketMaker {
  async initiate(address) {
    return await marketMakerContract.methods
      .initiate(erc20Address, 100)
      .send({ from: address }, function(error, txHash) {
        console.log({ txHash: txHash, error: error });
      });
  }

  async ethToTokens(amount, address) {
    return await marketMakerContract.methods.eth_to_tokens().send({
      from: address,
      value: amount,
    },
    function(error, txHash) {
      console.log({ txHash: txHash, error: error });
    });
  }

  async tokensToEth(amount, address) {
    return await marketMakerContract.methods.tokens_to_eth(amount).send({
      from: address,
    },
    function(error, txHash) {
      console.log({ txHash: txHash, error: error });
    });
  }

  async getInvariant() {
    return await marketMakerContract.methods.get_invariant().call();
  }

  async getTotalEthQuantity() {
    return await marketMakerContract.methods.get_total_eth_qty().call();
  }

  async getTotalTokenQuantity() {
    return await marketMakerContract.methods.get_total_token_qty().call();
  }
}

export default new MarketMaker();
