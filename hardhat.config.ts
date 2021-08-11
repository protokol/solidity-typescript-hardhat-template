/**
 * @type import('hardhat/config').HardhatUserConfig
 */

import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-solhint";
import "@typechain/hardhat";
import "dotenv/config";
import "hardhat-deploy";
import "solidity-coverage";

import "./tasks/accounts";
import "./tasks/balance";
import "./tasks/block-number";
import "./tasks/create-collectibles";

const MAINNET_RPC_URL =
    process.env.MAINNET_RPC_URL ||
    process.env.ALCHEMY_MAINNET_RPC_URL ||
    "https://eth-mainnet.alchemyapi.io/v2/your-api-key";
const RINKEBY_RPC_URL =
    process.env.RINKEBY_RPC_URL ||
    "https://eth-rinkeby.alchemyapi.io/v2/your-api-key";
const KOVAN_RPC_URL =
    process.env.KOVAN_RPC_URL ||
    "https://eth-kovan.alchemyapi.io/v2/your-api-key";
const MNEMONIC = process.env.MNEMONIC || "your mnemonic";
const ETHERSCAN_API_KEY =
    process.env.ETHERSCAN_API_KEY || "Your etherscan API key";
// optional
const PRIVATE_KEY = process.env.PRIVATE_KEY || "your private key";
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_API_SECRET = process.env.PINATA_API_SECRET;

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            // // If you want to do some forking, uncomment this
            // forking: {
            //   url: MAINNET_RPC_URL
            // }
        },
        localhost: {},
        kovan: {
            url: KOVAN_RPC_URL,
            // accounts: [PRIVATE_KEY],
            accounts: {
                mnemonic: MNEMONIC,
            },
            saveDeployments: true,
        },
        rinkeby: {
            url: RINKEBY_RPC_URL,
            // accounts: [PRIVATE_KEY],
            accounts: {
                mnemonic: MNEMONIC,
            },
            saveDeployments: true,
        },
        ganache: {
            url: "http://localhost:8545",
            accounts: {
                mnemonic: MNEMONIC,
            },
        },
    },
    etherscan: {
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: ETHERSCAN_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            1: 0, // similarly on mainnet it will take the first account as deployer.
        },
        feeCollector: {
            default: 1,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.4",
            },
        ],
    },
    mocha: {
        timeout: 100000,
    },
};
