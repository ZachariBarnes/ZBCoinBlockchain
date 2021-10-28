require('dotenv').config();
const express = require('express');
const logger = require('npmlog');
const Blockchain = require('./blockchain');

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

});

app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
  logger.info('==================================');
});
