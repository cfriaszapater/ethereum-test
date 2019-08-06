/*jshint esversion: 8 */

var Web3 = require('web3');

const {
    getBlockNumber,
    getBalance
} = require("./ethUtils");


// Connect to geth or parity running locally:
var web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

var myAccount;
var myContract;
web3.eth.getAccounts().then((accounts) => {
    console.log('accounts: ', accounts);
    myAccount = accounts[0];

    const contractAddress = '0xab4eA7B12505dA2F94A04aAE6F2745dc5f00Cc9e';
    const abi = [{
            "constant": false,
            "inputs": [{
                "internalType": "uint256",
                "name": "x",
                "type": "uint256"
            }],
            "name": "set",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "get",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "hello",
            "outputs": [{
                "internalType": "string",
                "name": "",
                "type": "string"
            }],
            "payable": false,
            "stateMutability": "pure",
            "type": "function"
        }
    ];

    myContract = new web3.eth.Contract(abi, contractAddress, {from: myAccount});
});

interactWithEth();

async function interactWithEth() {
    try {
        await getBlockNumber(web3);
        await getBalance(web3, myAccount);
        await hello();
        await set();
        await get();
    } catch (error) {
        console.error(error);
    }
}

async function set() {
    return myContract.methods.set(1313).send()
        .once('transactionHash', (transactionHash) => console.log('set transactionHash: ', transactionHash))
        .on('confirmation', (confirmation) => {
            console.log('set confirmation: ', confirmation);
        })
        .on('set error', (error) => console.error(error))
        .then((receipt) => {
            console.log('set receipt: ', receipt);
        });
}

async function get() {
    try {
        const result = await myContract.methods.get().call();
        return console.log('get: ', result);
    } catch (error) {
        console.error('get error: ', error);
        throw error;
    }
}

async function hello() {
    const result = await myContract.methods.hello().call();
    return console.log('hello: ', result);
}