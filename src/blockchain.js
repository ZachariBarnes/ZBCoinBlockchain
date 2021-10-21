const sha256 = require('sha256');
// const rewe;

class Blockchain {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
  }

  CreateNewBlock(nonce, preciousBlockHash, hash) {
    const newBlock = {
      index: this.chain.length + 1,
      timestap: Date.now(),
      transactions: this.pendingTransactions,
      nonce, // Proof that this block was created legitmately
      hash,
      preciousBlockHash,
    };

    this.pendingTransactions = [];
    this.chain.push(newBlock);
    return newBlock;
  }

  GetLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  // Notes: Supporting multiple token types requires tokenId
  // Possible override usecase: To support sending multiple token types or two way exchanges at once requires this to accept an array.
  CreateNewTransaction(amount, /* tokenId, */ sender, recipient) {
    const newTransaction = {
      amount,
      sender,
      recipient,
    };
    this.pendingTransactions.push(newTransaction);
    return this.GetLastBlock()[this.index] + 1; // Return the index of the block that will confirm this transaction.
  }

  HashBlock(previousBlockHash, currentBlock, nonce) {
    const hash = sha256(`${previousBlockHash}${nonce.toString()}${JSON.stringify(currentBlock)}`);
    return hash;
  }

  ProofOfWork(previousBlockHash, currentBlock) {
    let nonce = 0;
    let hash = this.HashBlock(previousBlockHash, currentBlock, nonce);
    let first4 = hash.slice(0, 4);
    while (first4 !== '0000') {
      hash = this.HashBlock(previousBlockHash, currentBlock, ++nonce);
      first4 = hash.slice(0, 4);
    }
    console.log(`Block ${hash} Mined Succesfully! Nonce: ${nonce}`);
    return this.CreateNewBlock(nonce, previousBlockHash, hash);
  }
}

module.exports = Blockchain;
