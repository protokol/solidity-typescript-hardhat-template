import { task } from "hardhat/config"

/**
 Example:
 npx hardhat accounts
 */

task("accounts", "Prints the list of accounts", async (_taskArgs, env) => {
	const accounts = await env.ethers.getSigners()

	for (const account of accounts) {
		console.log(await account.getAddress())
	}
})
