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

const marketMakerAddress = '0xaf751e0FA3065Aa000B5b9cdaE87E0FFb56358FB';

export const marketMakerContract = new w3.eth.Contract(
  marketMakerABI,
  marketMakerAddress
);

export default marketMakerContract;
