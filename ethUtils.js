/* jshint esversion: 8 */

async function getBlockNumber (web3) {
  const result = await web3.eth.getBlockNumber();
  return console.log('last block number: ', result);
}
exports.getBlockNumber = getBlockNumber;

async function getBalance (web3, account) {
  try {
    const result = await web3.eth.getBalance(account);
    console.log('balance: ', result);
  } catch (error) {
    console.error('getBalance error: ', error);
    throw error;
  }
}
exports.getBalance = getBalance;
