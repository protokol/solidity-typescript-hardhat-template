import { task } from "hardhat/config"

/**
 Example:
 npx hardhat balance --account 0x7B36b05B0E2Ee8A66816473AD848e0da073F7019 --network sepolia
 */

task("balance", "Prints an account's balance")
	.addParam("account", "The account's address")
	.setAction(async (taskArgs, { ethers }) => {
		const balance = await ethers.provider.getBalance(taskArgs.account)

		console.log(ethers.formatEther(balance), "ETH")
	})
