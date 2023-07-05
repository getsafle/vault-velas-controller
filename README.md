# Vault-velas-controller <code><a href="https://www.docker.com/" target="_blank"><img height="50" src="https://velas.com/assets/img/logo.svg"></a></code>

<img alt="Static Badge" src="https://img.shields.io/badge/version-v1.2.0-blue">  <img alt="Static Badge" src="https://img.shields.io/badge/nvm-v6.0.6-red">  <img alt="Static Badge" src="https://img.shields.io/badge/License-MIT-green">   [![Discussions][discussions-badge]][discussions-link]
 <img alt="Static Badge" src="https://img.shields.io/badge/Velas_controller-documentation-purple">   

A Module written in javascript for managing various keyrings of Velas accounts, encrypting them, and using them.

- [Installation](#installation)
- [Initialize the Velas Controller class](#initialize-the-velas-controller-class)
- [Methods](#methods)
  - [Generate Keyring with 1 account and encrypt](#generate-keyring-with-1-account-and-encrypt)
  - [Restore a keyring with the first account using a mnemonic](#restore-a-keyring-with-the-first-account-using-a-mnemonic)
  - [Add a new account to the keyring object](#add-a-new-account-to-the-keyring-object)
  - [Export the private key of an address present in the keyring](#export-the-private-key-of-an-address-present-in-the-keyring)
  - [Sign a transaction](#sign-a-transaction)
  - [Sign a message](#sign-a-message)
  - [Get balance](#get-balance)


## Installation
```
npm install --save @getsafle/vault-velas-controller
```
## Initialize the Velas Controller class

```
const { KeyringController, getBalance } = require('@getsafle/vault-velas-controller');

const velasController = new KeyringController({
  encryptor: {
    // An optional object for defining encryption schemes:
    // Defaults to Browser-native SubtleCrypto.
    encrypt(password, object) {
      return new Promise('encrypted!');
    },
    decrypt(password, encryptedString) {
      return new Promise({ foo: 'bar' });
    },
  },
});
```

## Methods

### Generate Keyring with 1 account and encrypt

```
const keyringState = await velasController.createNewVaultAndKeychain(password);
```

### Restore a keyring with the first account using a mnemonic

```
const keyringState = await velasController.createNewVaultAndRestore(password, mnemonic);
```

### Add a new account to the keyring object

```
const keyringState = await velasController.addNewAccount(keyringObject);
```

### Export the private key of an address present in the keyring

```
const privateKey = await velasController.exportAccount(address);
```

### Sign a transaction

```
const signedTx = await velasController.signTransaction(velasTx, _fromAddress);
```

### Sign a message

```
const signedMsg = await velasController.signMessage(msgParams);
```

### Sign a message

```
const signedObj = await velasController.sign(msgParams, pvtKey, web3Obj);
```

### Sign Typed Data (EIP-712)

```
const signedData = await velasController.signTypedMessage(msgParams);
```

#### Raw transaction object

```
rawTx: {
  to,                          // receiver address
  from,                        // sender address
  value,                       // amount to send
  gas,                         // gas Limit of transaction
  gasPrice,                    // gasPrice
  data,                        // data in hex to send
  nonce,                       // transaction nonce
  chainId,                     // chainID | 111 - TESTNET, 106 - MAINNET
}
```

### Get balance

```
const balance = await getBalance(address, web3);
```
[discussions-badge]: https://img.shields.io/badge/Code_Quality-passing-rgba
[discussions-link]: https://github.com/getsafle/vault-polygon-controller/actions
