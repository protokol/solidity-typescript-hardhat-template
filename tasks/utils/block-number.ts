import { task } from "hardhat/config"

/**
 Example:
 npx hardhat block-number --network sepolia
 */
export const blockNumberTask = task("block-number", "Prints the current block number")
	.setAction(async (_taskArgs, hre) => {
		const { ethers } = await hre.network.connect()
		const blockNumber = await ethers.provider.getBlockNumber()
		console.log("Current block number: " + blockNumber)
	})
	.build()
