const Blockchain = require('./blockchain');

const testCoin = new Blockchain();
testCoin.CreateNewTransaction(2000, 'ALEXFWAE543SDF464', 'JENSDF546S5D4F534SF');
const block = {
  index: 1,
  timestamp: 15234545,
  transactions: [{
    amount: 100,
    sender: 'ALEXFWAE543SDF464',
    recipient: 'JENSDF546S5D4F534SF',
  }],
  nonce: 15234545,
  previousHash: '2919b034e036a991230a678075cd04993b800897186a7d574d944a7b8ef8296d',
};
const nonce = testCoin.ProofOfWork('2919b034e036a991230a678075cd04993b800897186a7d574d944a7b8ef8296d', block);
console.log(nonce);
