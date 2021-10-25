/* eslint-disable no-undef */
const Blockchain = require('./blockchain');

let testCoin = new Blockchain();

beforeEach(() => {
  testCoin = new Blockchain();
});

// Test Creating a blockchain
test('Creating a blockchain', () => {
  // When creating a new Blockchain only the Genesis block should exist
  expect(testCoin.chain.length).toBe(1);
});

// Test Creating a new block
test('Adding an Empty Block to the block chain', () => {
  const newBlock = testCoin.CreateNewBlock(2389, '00009SDN90N', '0000SDF45SDFKE');
  expect(testCoin.GetLastBlock()).toBe(newBlock);
});

// Test Adding multiple items to the block chain
test('Adding an Empty Block to the block chain', () => {
  testCoin.CreateNewBlock(111, '00009SWSDRFD6345N', '0000DF34SFGGR0');
  testCoin.CreateNewBlock(23189, '0000OIN12ASDN90N', '0000IOSDF432DFKE');
  expect(testCoin.chain.length).toBe(3);
});

// // Test Adding a malicous block to the chain
test('Adding a Malicious block should fail', () => {
  // Add Malicious Transaction
  testCoin.CreateNewTransaction(10000000000, 'ZTBsxAddress', 'SomeBadGuysxAddress');
  // Mine a new block to set the malicious transaction in stone
  const newBlock = testCoin.CreateNewBlock(0, '123456GDFGH', '21354DFSGDFGH');
  expect(testCoin.chain.length).toBe(1); // Only Genesis block should exist
  expect(newBlock).toBe(null);
});

// Test creating a transaction
test('Test creating a transaction', () => {
  const transaction = {
    amount: 100,
    sender: 'ALEXFWAE543SDF464',
    recipient: 'JENSDF546S5D4F534SF',
  };
  testCoin.CreateNewTransaction(transaction.amount, transaction.sender, transaction.recipient);
  testCoin.CreateNewBlock(32423452, '0000ADSDGFE435S67', '0000SDFERWF432D24');
  expect(testCoin.chain.length).toBe(2);
  expect(testCoin.chain[1].transactions).toStrictEqual([transaction]);
});

// Test creating multiple transations
test('Test creating multiple transactions', () => {
  const transaction1 = {
    amount: 100,
    sender: 'ALEXFWAE543SDF464',
    recipient: 'JENSDF546S5D4F534SF',
  };
  const transaction2 = {
    amount: 200,
    sender: 'ALEXFWAE543SDF464',
    recipient: 'JENSDF546S5D4F534SF',
  };
  testCoin.CreateNewTransaction(transaction1.amount, transaction1.sender, transaction1.recipient);
  testCoin.CreateNewTransaction(transaction2.amount, transaction2.sender, transaction2.recipient);
  testCoin.CreateNewBlock(32423452, '0000ADSDGFE435S67', '0000SDFERWF432D24');
  expect(testCoin.chain.length).toBe(2);
  expect(testCoin.chain[1].transactions).toStrictEqual([transaction1, transaction2]);
});

// Test HashBlock Method
test('Test Hashing Blocks', () => {
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
    previousHash: 'AFSFDWEFWGASADW',
  };
  const hash = '2919b034e036a991230a678075cd04993b800897186a7d574d944a7b8ef8296d';
  expect(testCoin.HashBlock('AFSFDWEFWGASADW', block, 15234545)).toBe(hash);
});

// Test Proof of work
test('Test ProofOfWork', () => {
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
  expect(nonce).toBe(43930);
  const hash = testCoin.HashBlock('2919b034e036a991230a678075cd04993b800897186a7d574d944a7b8ef8296d', block, nonce);
  expect(hash.slice(0, 4)).toBe('0000');
});
