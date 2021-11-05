const sha256 = require('sha256');

const HASH_PREFIX = '0000';

class Blockchain {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
    this.networkNodes = [];
    this.localUrl = '';
    // Create Genesis Block
    this.CreateNewBlock(0, 'ZTB', 'ZTB');
  }

  CreateNewBlock(nonce, previousBlockHash, hash) {
    if (this.chain.length > 1) {
      if (hash.slice(0, 4) !== HASH_PREFIX || previousBlockHash.slice(0, 4) !== HASH_PREFIX) {
        return null; // Invalid block, Don't Create a new block
      }
    }
    const newBlock = {
      index: this.chain.length + 1,
      timestap: Date.now(),
      transactions: this.pendingTransactions,
      nonce, // Proof that this block was created legitmately
      hash,
      previousBlockHash,
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
    return this.GetLastBlock().index + 1; // Return the index of the block that will confirm this transaction.
  }

  HashBlock(previousBlockHash, currentBlock, nonce) {
    const hash = sha256(`${previousBlockHash}${nonce.toString()}${JSON.stringify(currentBlock)}`);
    return hash;
  }

  ProofOfWork(previousBlockHash, currentBlock) {
    let nonce = 0;
    let hash = this.HashBlock(previousBlockHash, currentBlock, nonce);
    let first4 = hash.slice(0, 4);
    while (first4 !== HASH_PREFIX) {
      hash = this.HashBlock(previousBlockHash, currentBlock, ++nonce);
      first4 = hash.slice(0, 4);
    }
    // console.log(`Block ${hash} Mined Succesfully! Nonce: ${nonce}`);
    return nonce;
    // return this.CreateNewBlock(nonce, previousBlockHash, hash);
  }

  RegisterNode(address) {
    if (this.networkNodes.indexOf(address) === -1) {
      this.networkNodes.push(address);
    }
  }
}

module.exports = Blockchain;
