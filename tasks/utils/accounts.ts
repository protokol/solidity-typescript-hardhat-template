import { task } from "hardhat/config"

/**
 Example:
 npx hardhat accounts
 */
export const accountsTask = task("accounts", "Prints the list of accounts")
	.setAction(async (_taskArgs, hre) => {
		const { ethers } = await hre.network.connect()
		const accounts = await ethers.getSigners()

		for (const account of accounts) {
			console.log(await account.getAddress())
		}
	})
	.build()
