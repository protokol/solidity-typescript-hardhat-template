import { task } from "hardhat/config"

/**
 Example:
 npx hardhat erc20-mint \
 --contract 0xe48A08C8C941c86D671D17EF50892D518D6f2bf0 \
 --recipient 0x73faDd7E476a9Bc2dA6D1512A528366A3E50c3cF \
 --amount 10000 \
 --network sepolia
 */
export const erc20MintTask = task("erc20-mint", "Mint tokens for BasicERC20 Smart Contract")
	.addOption({ name: "contract", description: "BasicERC20 Smart Contract Address", defaultValue: "" })
	.addOption({ name: "recipient", description: "ERC20 Tokens Recipient", defaultValue: "" })
	.addOption({ name: "amount", description: "ERC20 Tokens Amount", defaultValue: "" })
	.setAction(async (taskArgs, hre) => {
		const { ethers } = await hre.network.connect()
		const contract = await ethers.getContractAt("BasicERC20", taskArgs.contract)

		const mintTrx = await contract.mint(taskArgs.recipient, taskArgs.amount)

		console.log(`Transaction Hash: ${mintTrx.hash}`)
		await mintTrx.wait(2)
		console.log("Transaction confirmed")
	})
	.build()
