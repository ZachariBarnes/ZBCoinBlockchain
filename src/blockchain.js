// const sha256 = require('sha256');
// const rewe;

class Blockchain {
    constructor() {
        this.chain = [];
        this.newTransactions = [];
    }

    CreateNewBlock(nonce, preciousBlockHash, hash) {
        const newBlock = {
            index: this.chain.length + 1,
            timestap: Date.now(),
            transactions: this.newTransactions,
            nonce,
            hash,
            preciousBlockHash
        };
    
        this.newTransactions = [];
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
        this.newTransactions.push(newTransaction);
    }
}

module.exports = Blockchain;