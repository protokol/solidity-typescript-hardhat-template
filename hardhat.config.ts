import "@nomicfoundation/hardhat-toolbox"

import { HardhatUserConfig } from "hardhat/config"

import "hardhat-deploy"
import "@nomiclabs/hardhat-solhint"
import "hardhat-deploy"
import "solidity-coverage"

import "dotenv/config"

import "./tasks/utils/accounts"
import "./tasks/utils/balance"
import "./tasks/utils/block-number"
import "./tasks/utils/send-eth"

import "./tasks/erc721/mint"
import "./tasks/erc721/base-uri"
import "./tasks/erc721/contract-uri"

import "./tasks/erc20/mint"

import "./tasks/erc1155/mint"
import "./tasks/erc1155/base-uri"
import "./tasks/erc1155/contract-uri"

const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL || "https://eth-mainnet.g.alchemy.com/v2/your-api-key"
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
const MATIC_RPC_URL = process.env.MATIC_RPC_URL || "https://polygon-mainnet.g.alchemy.com/v2/your-api-key"
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL || "https://polygon-mumbai.g.alchemy.com/v2/v3/your-api-key"

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "api-key"
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "api-key"

// Import MNEMONIC or single private key
const MNEMONIC = process.env.MNEMONIC || "your mnemonic"
const PRIVATE_KEY = process.env.PRIVATE_KEY

const config: HardhatUserConfig = {
	defaultNetwork: "hardhat",
	networks: {
		mainnet: {
			url: MAINNET_RPC_URL,
			accounts: PRIVATE_KEY ? [PRIVATE_KEY] : { mnemonic: MNEMONIC },
		},
		hardhat: {
			// // If you want to do some forking, uncomment this
			// forking: {
			//   url: MAINNET_RPC_URL
			// }
		},
		localhost: {
			url: "http://127.0.0.1:8545",
		},
		sepolia: {
			url: SEPOLIA_RPC_URL,
			accounts: PRIVATE_KEY ? [PRIVATE_KEY] : { mnemonic: MNEMONIC },
		},
		matic: {
			url: MATIC_RPC_URL,
			accounts: PRIVATE_KEY ? [PRIVATE_KEY] : { mnemonic: MNEMONIC },
		},
		mumbai: {
			url: MUMBAI_RPC_URL,
			accounts: PRIVATE_KEY ? [PRIVATE_KEY] : { mnemonic: MNEMONIC },
		},
	},
	etherscan: {
		// Your API key for Etherscan
		// Obtain one at https://etherscan.io/
		apiKey: {
			mainnet: ETHERSCAN_API_KEY,
			sepolia: ETHERSCAN_API_KEY,
			// Polygon
			polygon: POLYGONSCAN_API_KEY,
			polygonMumbai: POLYGONSCAN_API_KEY,
		},
	},
	namedAccounts: {
		deployer: {
			default: 0, // here this will by default take the first account as deployer
			mainnet: 0, // similarly on mainnet it will take the first account as deployer.
		},
		owner: {
			default: 0,
		},
	},
	solidity: {
		compilers: [
			{
				version: "0.8.20",
			},
		],
	},
}

export default config
