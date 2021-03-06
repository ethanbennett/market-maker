import w3 from './web3Instance';

const marketMakerABI = [
  {
    name: 'initiate',
    outputs: [],
    inputs: [
      { type: 'address', name: 'token_addr' },
      { type: 'int128', name: 'token_quantity' },
    ],
    constant: false,
    payable: true,
    type: 'function',
  },
  {
    name: 'eth_to_tokens',
    outputs: [],
    inputs: [],
    constant: false,
    payable: true,
    type: 'function',
  },
  {
    name: 'tokens_to_eth',
    outputs: [],
    inputs: [{ type: 'int128', name: 'sell_quantity' }],
    constant: false,
    payable: false,
    type: 'function',
  },
  {
    name: 'owner_withdraw',
    outputs: [],
    inputs: [],
    constant: false,
    payable: false,
    type: 'function',
  },
  {
    name: 'get_total_eth_qty',
    outputs: [{ type: 'int128', name: 'out' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
  },
  {
    name: 'get_total_token_qty',
    outputs: [{ type: 'int128', name: 'out' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
  },
  {
    name: 'get_invariant',
    outputs: [{ type: 'int128', name: 'out' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
  },
  {
    name: 'get_owner',
    outputs: [{ type: 'address', name: 'out' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
  },
];

export const marketMakerAddress = '0x2328E3132893615fa7E76054415B79cA7eB91c3A';

export let marketMakerContract;

if (w3) {
  marketMakerContract = new w3.eth.Contract(marketMakerABI, marketMakerAddress);
}

export default { marketMakerAddress, marketMakerContract };
