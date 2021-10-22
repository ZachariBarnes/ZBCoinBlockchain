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

// // Test creating multiple transations
// testCoin.CreateNewTransaction(50, 'ALEXFWAE543SDF464', 'JENSDF546S5D4F534SF');
// testCoin.CreateNewTransaction(300, 'ALEXFWAE543SDF464', 'JENSDF546S5D4F534SF');
// testCoin.CreateNewTransaction(2000, 'ALEXFWAE543SDF464', 'JENSDF546S5D4F534SF');
// testCoin.CreateNewBlock(2342345, 'AD23GFE435S67', 'SDF5WF432D24');
// console.log(testCoin.chain[testCoin.chain.length]);

// // Test HashBlock Method
// const prevHash = 'SA65F465S4DF6SA54FASDF';
// const currentBlock = [
//   testCoin.CreateNewTransaction(2000, 'ALEXFWAE543SDF464', 'JENSDF546S5D4F534SF'),
//   testCoin.CreateNewTransaction(300, 'ALEXFWAE543SDF464', 'JENSDF546S5D45534SF'),
//   testCoin.CreateNewTransaction(100, 'ALEXFWAE543SDF464', 'JENSDF546S5D8S534SF'),
// ];
// const nonce = 100;

// console.log(testCoin.HashBlock(prevHash, currentBlock, nonce));

// console.log(testCoin);

// // Test Proof of work
// testCoin.CreateNewTransaction(300, 'ALEXFWAE543SDF464', 'JENSDF546S5D45534SF');
// testCoin.CreateNewTransaction(100, 'ALEXFWAE543SDF464', 'JENSDF546S5D8S534SF');
// // const nonce = bitcoin.ProofOfWork('AD23GFE435S67', 'SDF5WF432D24');
// const block = testCoin.HashBlock('AD23GFE435S67', 'SDF5WF432D24', 111581);
// console.log(block);

// console.log(testCoin);
