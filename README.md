# vault-velas-controller

## Install

`npm install --save @getsafle/vault-velas-controller`

## Initialize the Velas Controller class

```
const controller = require('@getsafle/vault-velas-controller');

const velasController = new controller({
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

### Sign Typed Data (EIP-712)

```
const signedData = await velasController.signTypedMessage (msgParams);
```
