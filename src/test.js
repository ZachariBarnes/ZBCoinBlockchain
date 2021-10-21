const Blockchain = require('./blockchain');

// Test Creating a blockchain
const bitcoin = new Blockchain();

// // Test Adding Items to the block chain
bitcoin.CreateNewBlock(2389, 'OIN89SDN90N', '90IOSDF45SDFKE');

// // Test Adding multiple items to the block chain
// bitcoin.CreateNewBlock(111, 'OIN89SD6345N', '234SDF34SFGGR0');
// bitcoin.CreateNewBlock(23189, 'OIN12ASDN90N', '90IOSDF432DFKE');

// // Test Adding a malicous block to the chain

// // Test creating a transaction
// bitcoin.CreateNewTransaction(100, 'ALEXFWAE543SDF464', 'JENSDF546S5D4F534SF');
// bitcoin.CreateNewBlock(32423452, 'ADSDGFE435S67', 'SDFERWF432D24');
// console.log(bitcoin.chain[bitcoin.chain.length]);

// // Test creating multiple transations
// bitcoin.CreateNewTransaction(50, 'ALEXFWAE543SDF464', 'JENSDF546S5D4F534SF');
// bitcoin.CreateNewTransaction(300, 'ALEXFWAE543SDF464', 'JENSDF546S5D4F534SF');
// bitcoin.CreateNewTransaction(2000, 'ALEXFWAE543SDF464', 'JENSDF546S5D4F534SF');
// bitcoin.CreateNewBlock(2342345, 'AD23GFE435S67', 'SDF5WF432D24');
// console.log(bitcoin.chain[bitcoin.chain.length]);

// // Test HashBlock Method
// const prevHash = 'SA65F465S4DF6SA54FASDF';
// const currentBlock = [
//   bitcoin.CreateNewTransaction(2000, 'ALEXFWAE543SDF464', 'JENSDF546S5D4F534SF'),
//   bitcoin.CreateNewTransaction(300, 'ALEXFWAE543SDF464', 'JENSDF546S5D45534SF'),
//   bitcoin.CreateNewTransaction(100, 'ALEXFWAE543SDF464', 'JENSDF546S5D8S534SF'),
// ];
// const nonce = 100;

// console.log(bitcoin.HashBlock(prevHash, currentBlock, nonce));

// console.log(bitcoin);

// Test Proof of work
bitcoin.CreateNewTransaction(300, 'ALEXFWAE543SDF464', 'JENSDF546S5D45534SF');
bitcoin.CreateNewTransaction(100, 'ALEXFWAE543SDF464', 'JENSDF546S5D8S534SF');
const block = bitcoin.ProofOfWork('AD23GFE435S67', 'SDF5WF432D24');
console.log(block);
