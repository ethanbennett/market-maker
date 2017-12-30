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
}

export default new MarketMaker();
