const sha256 = require('sha256');
const Blockchain = require('./blockchain');

const testCoin = new Blockchain();
console.log(testCoin);

const hash = sha256('We DONT have to do a backfill of NDS data. Just accept new.');
console.log(hash);
