import marketMakerContract from '../eth/marketMakerContract';

class MarketMaker {
  async initiate(address) {
    let response;
    const contractAddress = '0x94DF6b42763B2BE323eB2FbB315e3dA5871f8e78';

    try {
      response = await marketMakerContract.methods
        .initiate(contractAddress, 100)
        .send({ from: address }, (tx, err) => console.log(tx, err));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async ethToTokens(amount, address) {
    let txHash;

    try {
      txHash = await marketMakerContract.methods.eth_to_tokens().send({
        from: address,
        value: amount,
      });
    } catch (error) {
      return error;
    }

    return txHash;
  }

  async tokensToEth(amount, address) {
    let txHash;

    try {
      txHash = await marketMakerContract.methods.tokens_to_eth(amount).send({
        from: address,
      });
    } catch (error) {
      return error;
    }

    return txHash;
  }
}

export default new MarketMaker();
