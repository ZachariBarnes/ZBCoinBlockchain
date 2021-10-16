// const sha256 = require('sha256');
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
            nonce, //Proof that this block was created legitmately
            hash,
            preciousBlockHash
        };
    
        this.pendingTransactions = [];
        this.chain.push(newBlock);
        return newBlock;
    }

    GetLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    //Notes: Supporting multiple token types requires tokenId
    //Possible override usecase: To support sending multiple token types or two way exchanges at once requires this to accept an array.
    CreateNewTransaction(amount, /*tokenId,*/ sender, recipient) {
        const newTransaction = {
            amount,
            sender,
            recipient
        };
        this.pendingTransactions.push(newTransaction);
        return this.GetLastBlock()[index]+1; //Return the index of the block that will confirm this transaction.
    }
}

module.exports = Blockchain;