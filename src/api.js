require('dotenv').config();
const express = require('express');
const logger = require('npmlog');

const port = process.env.PORT || 2500;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/blockchain', (req, res) => {
  res.send({ block: {} });
});

app.post('/transaction/new', (req, res) => {
  const { amount } = req.body;
  logger.info(JSON.stringify(req.body));
  res.send(`New Transaction created! Amount: ${amount}`);
});

app.get('/mine', (req, res) => {

});

app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
  logger.info('==================================');
});
