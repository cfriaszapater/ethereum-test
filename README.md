# ethereum-test

Try an interaction with smart contract in ethereum ropsten test network using [web3js API](https://github.com/ethereum/web3.js/).

## Run

Create account with parity in ropsten:

```sh
parity account new --chain ropsten --keys-path /Users/c.friaszapater/Library/Application\ Support/io.parity.ethereum/keys
```

Start parity ethereum node on ropsten in light mode (to reduce sync time and disk usage), unlocking the created account:

```sh
parity --chain ropsten --unlock "0xf8003cf271dee578778267161134b57de2ecb240" --password pwd.txt --bootnodes "enode://6332792c4a00e3e4ee0926ed89e0d27ef985424d97b6a45bf0f23e51f0dcb5e66b875777506458aea7af6f9e4ffb69f43f3778ee73c81ed9d34c51c4b16b0b0f@52.232.243.152:30303,enode://94c15d1b9e2fe7ce56e458b9a3b672ef11894ddedd0c6f247e0f1d3487f52b66208fb4aeb8179fce6e3a749ea93ed147c37976d67af557508d199d9594c35f09@192.81.208.223:30303" --light
```

Interact with ethereum using web3 javascript API:

```sh
node main.js
```

## See also

[Argentlabs contract](https://github.com/argentlabs/application)
