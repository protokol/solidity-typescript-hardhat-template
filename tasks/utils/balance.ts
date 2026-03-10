import { task } from "hardhat/config"

/**
 Example:
 npx hardhat balance --account 0x7B36b05B0E2Ee8A66816473AD848e0da073F7019 --network sepolia
 */
export const balanceTask = task("balance", "Prints an account's balance")
	.addOption({ name: "account", description: "The account's address", defaultValue: "" })
	.setInlineAction(async (taskArgs, hre) => {
		const { ethers } = await hre.network.connect()
		const balance = await ethers.provider.getBalance(taskArgs.account)

		console.log(ethers.formatEther(balance), "ETH")
	})
	.build()
