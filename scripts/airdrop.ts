/* Airdrop token to early adopters */

import { ethers } from "hardhat"

async function main() {
	const tokenName = "<contract name ex: DemoERC20Token>"
	const tokenAddress = "<token address: 0x..... format>"

	// Define list of recipients and amounts
	const airdropList = [
		{ recipient: "0xa82960A14834996A9B1b82C65fdafcBC75900001", amount: "1000000" },
		// { recipient: "0xE884A70241381Ee09fDbDd6cF7Eed4B800200002", amount: "100000" },
		// { recipient: "0xD09BCCc473B066b947F61326988B6aCe63c00003", amount: "50000" },
		// { recipient: "0x77b7c37f6F2881dBf85ee83b66da064730500004", amount: "5000" },
		// { recipient: "0xa2B674f13998e72C1Dfe88Fe280af7D6eeD00005", amount: "1000" },
	]

	const [deployer] = await ethers.getSigners()

	// Attach to the already deployed contract
	const contract = await ethers.getContractAt(tokenName, tokenAddress)

	// Send tokens to each recipient
	for (const payment of airdropList) {
		const amountInWei = ethers.parseUnits(payment.amount, 18) // Assuming uses 18 decimals
		const transferTx = await contract.transfer(payment.recipient, amountInWei)
		await transferTx.wait()
		console.log(`Transferred ${payment.amount} tokens to ${payment.recipient} (tx: ${transferTx.hash})`)
	}
}

main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})
