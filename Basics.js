const SHA256= require('crypto-js/SHA256');

class Block{
    constructor(index,timestamp, data, previousHash=''){
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();


    }

     calculateHash(){
         return  SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();

     }

} 
class BlockChain{
    constructor(){
        this.chain=[this.createGenesisBlock( )];
    }
    createGenesisBlock(){
        return new Block(0,"02/06/2019","Genesis Block","0");
    }
    getlatestBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock){
         newBlock.previousHash = this.getlatestBlock().hash; 
         newBlock.hash=newBlock.calculateHash();
         this.chain.push(newBlock); 

    }
}

let dc = new BlockChain();
dc.addBlock(new Block(1,"07/06/2019",{amount: 4}));
dc.addBlock(new Block(2,"12/06/2018",{amount: 10}));

console.log(JSON.stringify(dc,null, 4));