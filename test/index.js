var assert = require('assert');
const Web3 = require('web3')
const CryptoJS = require('crypto-js');
const { KeyringController: VelasKeyring, getBalance } = require('../src/index')

const {
    HD_WALLET_12_MNEMONIC,
    HD_WALLET_12_MNEMONIC_TEST_OTHER,
    HD_WALLET_24_MNEMONIC,
    TESTING_MESSAGE_1,
    TESTING_MESSAGE_2,
    TESTING_MESSAGE_3,
    EXTERNAL_ACCOUNT_PRIVATE_KEY,
    EXTERNAL_ACCOUNT_ADDRESS,
    EXTERNAL_ACCOUNT_WRONG_PRIVATE_KEY_1,
    EXTERNAL_ACCOUNT_WRONG_PRIVATE_KEY_3,
    VELAS_NETWORK: {
        TESTNET,
        MAINNET
    },
} = require('./constants');

const opts = {
    encryptor: {
        encrypt(pass, object) {
            const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(object), pass).toString();

            return ciphertext;
        },
        decrypt(pass, encryptedString) {
            const bytes = CryptoJS.AES.decrypt(encryptedString, pass);
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            return decryptedData;
        },
    },
}

const opts_empty = {}

const PASSWORD = "random_password"

describe('Initialize wallet ', () => {
    const velasKeyring = new VelasKeyring(opts)

    it("Create new vault and keychain", async () => {
        const res = await velasKeyring.createNewVaultAndKeychain(PASSWORD)
        console.log("res ", res)
    })

    it("Create new vault and restore", async () => {
        const res = await velasKeyring.createNewVaultAndRestore(PASSWORD, HD_WALLET_12_MNEMONIC)
        assert(velasKeyring.keyrings[0].mnemonic === HD_WALLET_12_MNEMONIC, "Wrong mnemonic")
    })

    it("Export account (privateKey)", async () => {
        const res = await velasKeyring.getAccounts()
        let account = res[0]
        const accRes = await velasKeyring.exportAccount(account)
        console.log("accRes ", accRes, Buffer.from(accRes, 'hex'))
    })

    it("Get accounts", async () => {
        const acc = await velasKeyring.getAccounts()
        console.log("acc ", acc)
    })

    it("Get fees with manual gasLimit", async () => {
        const accounts = await velasKeyring.getAccounts()
        const web3 = new Web3(TESTNET.URL);
        const tx = {
            gasLimit: 2100
        }
        const fees = await velasKeyring.getFees(tx, web3)
        console.log(" with manual gasLimit ", fees)

        const privateKey = await velasKeyring.exportAccount(accounts[0])
        const tx3 = await velasKeyring.sign(TESTING_MESSAGE_1, privateKey, web3)
        console.log("tx3 ", tx3)
    })

    it("Should import correct account ", async () => {
        const address = await velasKeyring.importWallet(EXTERNAL_ACCOUNT_PRIVATE_KEY)
        assert(address.toLowerCase() === EXTERNAL_ACCOUNT_ADDRESS.toLowerCase(), "Wrong address")
        assert(velasKeyring.importedWallets.length === 1, "Should have 1 imported wallet")
    })

    it("Get address balance", async () => {
        const accounts = await velasKeyring.getAccounts()
        const web3 = new Web3(TESTNET.URL);
        const balance = await getBalance(accounts[0], web3)
        console.log(" get balance ", balance, accounts)
    })
    
    it(" Should Sign a transaction", async() =>{
        const accounts = await velasKeyring.getAccounts()
        const from = accounts[0]
        const web3 = new Web3(MAINNET.URL);

        const count = await web3.eth.getTransactionCount(from);

        const defaultNonce = await web3.utils.toHex(count) + 1 ;
        
        rawTx= {
            to:'0x9E1447ea3F6abA7a5D344B360B95Fd9BAE049448', 
            from,                                                                    // sender address
            value: web3.utils.numberToHex(web3.utils.toWei('0.01', 'ether')),        // amount to send
            gas: web3.utils.numberToHex(25000),                                      // gas Limit of transaction
            gasPrice: web3.utils.numberToHex(web3.utils.toWei('55', 'gwei')),        // gasPrice
            data: '0x00',                                                            // data in hex to send
            nonce: defaultNonce,                                                     // transaction nonce
            chainId: 106,                                                            // chainID | 111 - TESTNET, 106 - MAINNET
          };

          const privateKey = await velasKeyring.exportAccount(accounts[0])
          const signedTX = await velasKeyring.signTransaction(rawTx, privateKey)
          console.log("signedTX ", signedTX)


    })

})