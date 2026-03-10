import { defineConfig, configVariable } from "hardhat/config"
import hardhatToolboxMochaEthers from "@nomicfoundation/hardhat-toolbox-mocha-ethers"

import { erc20MintTask } from "./tasks/erc20/mint.js"
import { erc721MintTask } from "./tasks/erc721/mint.js"
import { erc721BaseUriTask } from "./tasks/erc721/base-uri.js"
import { erc721ContractUriTask } from "./tasks/erc721/contract-uri.js"
import { erc1155MintTask } from "./tasks/erc1155/mint.js"
import { erc1155BaseUriTask } from "./tasks/erc1155/base-uri.js"
import { erc1155ContractUriTask } from "./tasks/erc1155/contract-uri.js"
import { accountsTask } from "./tasks/utils/accounts.js"
import { balanceTask } from "./tasks/utils/balance.js"
import { blockNumberTask } from "./tasks/utils/block-number.js"
import { sendEthTask } from "./tasks/utils/send-eth.js"

export default defineConfig({
	plugins: [hardhatToolboxMochaEthers],
	tasks: [
		erc20MintTask,
		erc721MintTask,
		erc721BaseUriTask,
		erc721ContractUriTask,
		erc1155MintTask,
		erc1155BaseUriTask,
		erc1155ContractUriTask,
		accountsTask,
		balanceTask,
		blockNumberTask,
		sendEthTask,
	],
	networks: {
		mainnet: {
			type: "http",
			url: configVariable("MAINNET_RPC_URL"),
			accounts: [configVariable("PRIVATE_KEY")],
		},
		sepolia: {
			type: "http",
			url: configVariable("SEPOLIA_RPC_URL"),
			accounts: [configVariable("PRIVATE_KEY")],
		},
		polygon: {
			type: "http",
			url: configVariable("POLYGON_RPC_URL"),
			accounts: [configVariable("PRIVATE_KEY")],
		},
		amoy: {
			type: "http",
			url: configVariable("AMOY_RPC_URL"),
			accounts: [configVariable("PRIVATE_KEY")],
		},
	},
	etherscan: {
		apiKey: {
			mainnet: configVariable("ETHERSCAN_API_KEY"),
			sepolia: configVariable("ETHERSCAN_API_KEY"),
			polygon: configVariable("POLYGONSCAN_API_KEY"),
			polygonAmoy: configVariable("POLYGONSCAN_API_KEY"),
		},
	},
	solidity: {
		compilers: [
			{
				version: "0.8.28",
			},
		],
	},
})
