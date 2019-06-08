const SHA256= require('crypto-js/SHA256');

class Block{
    constructor(index,timestamp, data, previousHash=''){
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
        this.nonce=0;


    }

     calculateHash(){
         return  SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)+this.nonce).toString();

     }
     mineblock(difficulty){
         while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
             this.nonce++;
             this.hash=this.calculateHash();
         }
         console.log("Block mined"+ this.hash);
     }

} 
class BlockChain{
    constructor(){
        this.chain=[this.createGenesisBlock( )];
        this.difficulty=2;
    }
    createGenesisBlock(){
        return new Block(0,"02/06/2019","Genesis Block","0");
    }
    getlatestBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock){
         newBlock.previousHash = this.getlatestBlock().hash; 
         newBlock.mineblock(this.difficulty);
         this.chain.push(newBlock); 

    }
}

let dc = new BlockChain();
console.log('Mining Block 1....')
dc.addBlock(new Block(1,"07/06/2019",{amount: 4}));
console.log('Mining Block 2....')
dc.addBlock(new Block(2,"12/06/2018",{amount: 10}));

