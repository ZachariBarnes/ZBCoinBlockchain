require('dotenv').config();
const uuid = require('uuid/v4');
const express = require('express');
const logger = require('npmlog');
const Blockchain = require('./blockchain');

const nodeAddress = uuid().split('-').join('');
const ztblockChain = new Blockchain();
const port = process.env.PORT || 2500;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/blockchain', (req, res) => {
  res.send(ztblockChain);
});

app.post('/transaction/new', (req, res) => {
  const { amount, sender, recipient } = req.body;
  const blockIndex = ztblockChain.CreateNewTransaction(amount, sender, recipient);
  res.json({ note: `New Transaction created. It will be added in block: ${blockIndex}` });
});

app.get('/mine', (req, res) => {
  const lastBlock = ztblockChain.GetLastBlock();
  const previousBlockHash = lastBlock.hash;
  const currentBlockData = { transactions: ztblockChain.pendingTransactions, index: lastBlock.index + 1 };
  const nonce = ztblockChain.ProofOfWork(previousBlockHash, currentBlockData);
  const blockHash = ztblockChain.HashBlock(previousBlockHash, currentBlockData, nonce);
  // Reward the miner
  ztblockChain.CreateNewTransaction(12.5, '00', '00'/* recipient Address */);
  const newBlock = ztblockChain.CreateNewBlock(nonce, previousBlockHash, blockHash);
  res.json({ note: 'New Block mined successfully.', block: newBlock.index });
});

app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
  logger.info('==================================');
});
