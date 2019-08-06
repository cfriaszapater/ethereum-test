/*jshint esversion: 8 */

const { getBlockNumber, getBalance } = require("./ethUtils");

var Web3 = require('web3');
var keccak256 = require('keccak256');

// Connect to geth or parity running locally:
var web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

var myAccount = '0xf8003cf271dee578778267161134b57de2ecb240';

var contract = new web3.eth.Contract([{
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
console.log(contract);

interactWithEth();


async function interactWithEth() {
    try {
        await getBlockNumber(web3);
        await getBalance(web3, myAccount);
        await apply();
        await getApplicationID();
    } catch (error) {
        console.error(error);
    }
}

function apply() {
    return contract.methods.apply(keccak256('carlos.frias.zapater@gmail.com')).send()
        .on('receipt', (receipt) => console.log('receipt: ', receipt))
        .on('transactionHash', (transactionHash) => console.log('apply transactionHash: ', transactionHash))
        .on('confirmation', (confirmation) => console.log('apply confirmation: ', confirmation))
        .on('error', (error) => console.error('apply error: ', error));
}

async function getApplicationID() {
    try {
        const result = await contract.methods.getApplicationID('carlos.frias.zapater@gmail.com').call();
        return console.log('getApplicationID: ', result);
    } catch (error) {
        console.error('getApplicationID error: ', error);
        throw error;
    }
}
