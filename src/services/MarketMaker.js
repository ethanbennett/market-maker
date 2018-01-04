import { marketMakerContract } from '../eth/marketMakerContract';

class MarketMaker {
  async ethToTokens(amount, address) {
    try {
      return await marketMakerContract.methods.eth_to_tokens().send({
        from: address,
        value: amount,
      },
      function(error, txHash) {
        console.log({ txHash: txHash, error: error });
      });
    } catch (error) {
      return error;
    }
  }

  async tokensToEth(amount, address) {
    try {
      return await marketMakerContract.methods.tokens_to_eth(amount).send({
        from: address,
      },
      function(error, txHash) {
        console.log({ txHash: txHash, error: error });
      });
    } catch (error) {
      return error;
    }
  }

  async getInvariant() {
    try {
      return await marketMakerContract.methods.get_invariant().call();
    } catch (error) {
      return error;
    }
  }

  async getTotalEthQuantity() {
    try {
      return await marketMakerContract.methods.get_total_eth_qty().call();
    } catch (error) {
      return error;
    }
  }

  async getTotalTokenQuantity() {
    try {
      return await marketMakerContract.methods.get_total_token_qty().call();
    } catch (error) {
      return error;
    }
  }
}

export default new MarketMaker();
