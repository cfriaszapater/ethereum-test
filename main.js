var Web3 = require('web3');
var keccak256 = require('keccak256');

// infura:
// var web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io/v3/0c11a25aa9e54429b4e26feb89c86e83");
// geth or parity:
var web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

//web3.eth.getAccounts().then(console.log);

//web3.eth.defaultAccount = web3.eth.accounts[0];
//console.log('defaultAccount:');
//console.log(web3.eth.defaultAccount);

// geth:
// var myAccount = '0x840c0B0cC918873e514c957B5792Ea97204a2e50';
// parity:
var myAccount = '0xf8003cf271dee578778267161134b57de2ecb240';
// infura:
// var myAccount = '';

var myContract = new web3.eth.Contract([{
        "constant": false,
        "inputs": [{
            "name": "hash",
            "type": "bytes32"
        }],
        "name": "apply",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
            "name": "email",
            "type": "string"
        }],
        "name": "getApplicationID",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
], '0xcbbfbafedb0eb83016d2a96a4e80d30b20fa3e30', {
    from: myAccount
});
console.log(myContract);

interactWithEth();


async function interactWithEth() {
    try {
        await getBlockNumber();
        await getBalance();
        await apply();
        await getApplicationID();
    } catch (error) {
        (error) => console.error(error);
    }
}

async function getBlockNumber() {
    const result = await web3.eth.getBlockNumber();
    return console.log('last block number: ', result);
}

async function getBalance() {
    try {
        const result = await web3.eth.getBalance(myAccount);
        console.log('balance: ', result);
    } catch (error) {
        console.error('getBalance error: ', error);
        throw error;
    }
}
function apply() {
    return myContract.methods.apply(keccak256('carlos.frias.zapater@gmail.com')).send()
        .on('receipt', function (receipt) {
            // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
            console.log('receipt: ', receipt);
        })
        .on('transactionHash', (transactionHash) => console.error('apply transactionHash: ', transactionHash))
        .on('confirmation', (confirmation) => console.error('apply confirmation: ', confirmation))
        .on('error', (error) => console.error('apply error: ', error));
}

async function getApplicationID() {
    try {
        const result = await myContract.methods.getApplicationID('carlos.frias.zapater@gmail.com').call();
        return console.log('getApplicationID: ', result);
    } catch (error) {
        console.error('getApplicationID error: ', error);
        throw error;
    }
}
