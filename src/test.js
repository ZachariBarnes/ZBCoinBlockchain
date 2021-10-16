const Blockchain = require( "./blockchain");


//Test Creating a blockchain
const bitcoin = new Blockchain();

//Test Adding Items to the block chain
bitcoin.CreateNewBlock(2389, 'OIN89SDN90N', '90IOSDF45SDFKE');

//Test Adding multiple items to the block chain
bitcoin.CreateNewBlock(111, 'OIN89SD6345N', '234SDF34SFGGR0');
bitcoin.CreateNewBlock(23189, 'OIN12ASDN90N', '90IOSDF432DFKE');

//Test Adding a malicous block to the chain

//Test creating a transaction



console.log(bitcoin);