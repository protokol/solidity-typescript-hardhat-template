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

// Ethereum
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL as string || "https://eth-mainnet.g.alchemy.com/v2/your-api-key"
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL as string || "https://eth-sepolia.g.alchemy.com/v2/your-api-key"


// Base
const BASE_MAINNET_RPC_URL = process.env.BASE_MAINNET_RPC_URL as string || "https://mainnet.base.org"
const BASE_SEPOLIA_RPC_URL = process.env.BASE_SEPOLIA_RPC_URL as string || "https://sepolia.base.org"

// Polygon
const MATIC_RPC_URL = process.env.MATIC_RPC_URL as string || "https://polygon-mainnet.g.alchemy.com/v2/your-api-key"
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL as string || "https://polygon-mumbai.g.alchemy.com/v2/v3/your-api-key"

// Blockchain explorers
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY as string || "api-key"
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY as string || "api-key"

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
			accounts: PRIVATE_KEY ? [PRIVATE_KEY] : { mnemonic: MNEMONIC },
			gasPrice: 1000000000,
		},
		sepolia: {
			url: SEPOLIA_RPC_URL,
			accounts: PRIVATE_KEY ? [PRIVATE_KEY] : { mnemonic: MNEMONIC },
		},
		'base-mainnet': {
			url: BASE_MAINNET_RPC_URL,
			accounts: PRIVATE_KEY ? [PRIVATE_KEY] : { mnemonic: MNEMONIC },
			gasPrice: 1000000000,
		},
		'base-sepolia': {
			url: BASE_SEPOLIA_RPC_URL,
			accounts: PRIVATE_KEY ? [PRIVATE_KEY] : { mnemonic: MNEMONIC },
			gasPrice: 1000000000,
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
			// Ethereum
			mainnet: ETHERSCAN_API_KEY,
			sepolia: ETHERSCAN_API_KEY,

			// Base
			"base-mainnet": ETHERSCAN_API_KEY,
			"base-sepolia": ETHERSCAN_API_KEY,
			
			// Polygon
			polygon: POLYGONSCAN_API_KEY,
			polygonMumbai: POLYGONSCAN_API_KEY,
		},
		customChains: [
			{
			  network: "base-mainnet",
			  chainId: 8453,
			  urls: {
			   apiURL: "https://api.basescan.org/api",
			   browserURL: "https://basescan.org"
			  }
			},
			{
			  network: "base-sepolia",
			  chainId: 84532,
			  urls: {
			   apiURL: "https://api-sepolia.basescan.org/api",
			   browserURL: "https://sepolia.basescan.org/"
			  }
			}
		  ]
	},
	sourcify: {
		// Doesn't need an API key
		enabled: false // False as Base is not supported
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
