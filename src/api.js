require('dotenv').config();
const uuid = require('uuid');
const express = require('express');
const logger = require('npmlog');
const Blockchain = require('./blockchain');

const nodeAddress = uuid.v4().split('-').join('');
const zbCoin = new Blockchain();
const port = process.env.PORT || 2500;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/blockchain', (req, res) => {
  res.send(zbCoin);
});

app.post('/transaction/new', (req, res) => {
  const { amount, sender, recipient } = req.body;
  const blockIndex = zbCoin.CreateNewTransaction(amount, sender, recipient);
  res.json({ note: `New Transaction created. It will be added in block: ${blockIndex}` });
});

app.get('/mine', (req, res) => {
  const lastBlock = zbCoin.GetLastBlock();
  const previousBlockHash = lastBlock.hash;
  const currentBlockData = { transactions: zbCoin.pendingTransactions, index: lastBlock.index + 1 };
  const nonce = zbCoin.ProofOfWork(previousBlockHash, currentBlockData);
  const blockHash = zbCoin.HashBlock(previousBlockHash, currentBlockData, nonce);
  // Reward the miner
  zbCoin.CreateNewTransaction(12.5, '00', nodeAddress);
  const newBlock = zbCoin.CreateNewBlock(nonce, previousBlockHash, blockHash);
  res.json({ note: 'New Block mined successfully.', block: newBlock.index });
});

app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
  logger.info('==================================');
});
