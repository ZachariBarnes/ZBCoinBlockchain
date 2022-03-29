require('dotenv').config();
const uuid = require('uuid');
const express = require('express');
const logger = require('npmlog');
const got = require('got');
const cors = require('cors');
const Blockchain = require('./blockchain');

const nodeAddress = uuid.v4().split('-').join('');
const zbCoin = new Blockchain();
const port = process.argv[2] || process.env.PORT || 2500;
const myUrl = `http://localhost:${port}`;
zbCoin.localUrl = myUrl;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

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

app.post('/register-and-broadcast-node', (req, res) => {
  logger.info('Registering new node and broadcasting to the network');
  const { newNodeUrl } = req.body;
  logger.info(`ZbCoin.networkNodes: ${zbCoin.networkNodes}`);

  zbCoin.RegisterNode(newNodeUrl);
  // const { networkNodes } = zbCoin;
  logger.info(`ZbCoin.networkNodes: ${zbCoin.networkNodes}`);
  const registerNodePromises = [];
  zbCoin.networkNodes.forEach((node) => {
    const url = `${node}/register-node`;
    const requestOptions = {
      method: 'POST',
      json: { newNodeUrl },
    };
    registerNodePromises.push(got.post(url, requestOptions));
  });

  Promise.all(registerNodePromises)
    .then(() => {
      const body = { allNetworkNodes: [...zbCoin.networkNodes, zbCoin.localUrl] };
      const url = `${newNodeUrl}/register-nodes-bulk`;
      got.post(url, { json: body });
    }).then((data) => {
      res.json({ note: 'New node registered with network successfully.', network: data });
    })
    .catch((err) => {
      logger.error(err);
      return res.status(500).json({ note: 'Error registering node with network.', error: err });
    });
});

app.post('/register-node', (req, res) => {
  logger.info('Registering new node with network');
  const { newNodeUrl } = req.body;
  zbCoin.RegisterNode(newNodeUrl);
  res.json({ note: `New node registered Successfully with node. Number of nodes: ${zbCoin.networkNodes.length}` });
});

app.post('/register-nodes-bulk', (req, res) => {
  logger.info('Registering new nodes with network');
  const { allNetworkNodes } = req.body;
  allNetworkNodes.forEach((node) => {
    zbCoin.RegisterNode(node);
  });
  res.json({ note: `Bulk node registration Successfull. Number of nodes: ${zbCoin.networkNodes.length}` });
});

app.listen(port, () => {
  logger.info(`Listening at ${myUrl}`);
  logger.info('==================================');
});
