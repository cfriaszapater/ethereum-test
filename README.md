# ethereum-test

Try an interaction with smart contract in ethereum ropsten test network using [web3js API](https://github.com/ethereum/web3.js/).

## Run - Interact with argentlabs contract

Create account with parity in ropsten:

```sh
parity account new --chain ropsten --keys-path <path-to-keys>
# On my machine, path-to-keys was:
# /Users/c.friaszapater/Library/Application\ Support/io.parity.ethereum/keys
```

Start parity ethereum node on ropsten in light mode (to reduce sync time and disk usage), unlocking the created account:

```sh
parity --chain ropsten --unlock "0xf8003cf271dee578778267161134b57de2ecb240" --password pwd.txt --bootnodes "enode://6332792c4a00e3e4ee0926ed89e0d27ef985424d97b6a45bf0f23e51f0dcb5e66b875777506458aea7af6f9e4ffb69f43f3778ee73c81ed9d34c51c4b16b0b0f@52.232.243.152:30303,enode://94c15d1b9e2fe7ce56e458b9a3b672ef11894ddedd0c6f247e0f1d3487f52b66208fb4aeb8179fce6e3a749ea93ed147c37976d67af557508d199d9594c35f09@192.81.208.223:30303" --light
```

Fund your account with some ether: <https://faucet.ropsten.be/>

Interact with ethereum using web3 javascript API:

```sh
node app.js
```

## Run - Deploy a contract and interact with it

Add `--jsonrpc-cors=all` to the parity start command, to allow remix IDE to connect to it.

Use [remix IDE](http://remix.ethereum.org) to compile and deploy SimpleStorage.sol.

- Use "web3 provider" option and then set <http://localhost:8545> as URL.
- Deploy, check the transaction on [etherscan](https://ropsten.etherscan.io) and copy the contract address from there (eg: `0xab4ea7b12505da2f94a04aae6f2745dc5f00cc9e`).

Interact with the contract:

```sh
node simplestorage.js
```

## See also

- [Argentlabs contract](https://github.com/argentlabs/application)
- [Check transactions on ropster network](https://ropsten.etherscan.io/)
- [Parity FAQ](https://wiki.parity.io/FAQ)
