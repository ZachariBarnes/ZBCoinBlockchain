require('dotenv').config();
const uuid = require('uuid');
const express = require('express');
const logger = require('npmlog');
const got = require('got');
const Blockchain = require('./blockchain');

const nodeAddress = uuid.v4().split('-').join('');
const zbCoin = new Blockchain();
const port = process.argv[2] || process.env.PORT || 2500;
const myUrl = `http://localhost:${port}`;
zbCoin.localUrl = myUrl;

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

app.get('/pending-transactions', (req, res) => {
  res.status(200).send(zbCoin.GetLastBlock().pendingTransactions);
});

app.port('/register-and-broadcast-node', (req, res) => {
  const { newNodeUrl } = req.body;
  zbCoin.registerNewNode(newNodeUrl);
  const { networkNodes } = zbCoin;
  const registerNodeProises = [];
  networkNodes.forEach((node) => {
    const uri = `${node}/register-node`;
    const requestOptions = {
      uri,
      method: 'POST',
      body: { newNodeUrl },
      json: true,
    };
    registerNodeProises.push(got(requestOptions));
  });

  Promise.all(registerNodeProises)
    .then(() => {
      const bulkRegisterOptions = {
        uri: `${newNodeUrl}/register-nodes-bulk`,
        method: 'POST',
        body: { allNetworkNodes: [...zbCoin.networkNodes, zbCoin.localUrl] },
        json: true,
      };
      return got(bulkRegisterOptions);
    }).then((data) => {
      res.json({ note: 'New node registered with network successfully.', network: data });
    })
    .catch((err) => logger.error(err));
});

app.post('/register-node', (req, res) => {
  const { newNodeUrl } = req.body;
  zbCoin.registerNewNode(newNodeUrl);
  res.send(zbCoin.networkNodes);
});

app.post('/register-nodes=bulk', (req, res) => {
  const { allNetworkNodes } = req.body;
  allNetworkNodes.forEach((node) => {
    zbCoin.registerNewNode(node);
  });
  res.send(zbCoin.networkNodes);
});

app.listen(port, () => {
  logger.info(`Listening at ${myUrl}`);
  logger.info('==================================');
});
