import marketMakerContract from '../eth/marketMakerContract';
import w3 from '../eth/web3Instance';

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
}

export default new MarketMaker();
