import { task } from "hardhat/config"

/**
 Example:
 npx hardhat send-eth --recipient 0x7B36b05B0E2Ee8A66816473AD848e0da073F7019 --value 0.1 --network sepolia
 */
export const sendEthTask = task("send-eth", "Send ETH to an address")
	.addOption({ name: "recipient", description: "Recipient of ETH", defaultValue: "" })
	.addOption({ name: "value", description: "Amount of ETH to send", defaultValue: "" })
	.setAction(async (taskArgs, hre) => {
		const { ethers } = await hre.network.connect()
		const account = (await ethers.getSigners())[0]
		const sendTrx = await account.sendTransaction({
			to: taskArgs.recipient,
			value: ethers.parseEther(taskArgs.value),
		})

		console.log(`Transaction Hash: ${sendTrx.hash}`)
		await sendTrx.wait(2)
		console.log("Transaction confirmed")
	})
	.build()
