const sha256 = require('sha256');
const logger = require('npmlog');
const Blockchain = require('./blockchain');

const testCoin = new Blockchain();
logger.info(testCoin);

const hash = sha256('We DONT have to do a backfill of NDS data. Just accept new.');
logger.info(hash);
