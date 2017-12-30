import erc20Contract from '../eth/erc20Contract';

class ERC20 {
  async approve(userAddress) {
    const marketMakerAddress = '0x2328E3132893615fa7E76054415B79cA7eB91c3A';

    try {
      erc20Contract.methods
        .approve(marketMakerAddress, 2000000)
        .send({ from: userAddress }, function(txHash, error) {
          console.log(txHash, error);
        });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ERC20();
