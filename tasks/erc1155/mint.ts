import { task } from "hardhat/config"

/**
 Example:
 npx hardhat erc1155-mint \
 --contract 0x320bd6de80d3D5361e1c9bB4CF1D7D9Ef24F3Ac7 \
 --recipient 0x73faDd7E476a9Bc2dA6D1512A528366A3E50c3cF \
 --id 1 \
 --amount 10 \
 --network sepolia
 */
export const erc1155MintTask = task("erc1155-mint", "Mint tokens for BasicERC1155 Smart Contract")
	.addOption({ name: "contract", description: "BasicERC1155 Smart Contract Address", defaultValue: "" })
	.addOption({ name: "recipient", description: "Token Recipient", defaultValue: "" })
	.addOption({ name: "id", description: "Token ID", defaultValue: "" })
	.addOption({ name: "amount", description: "Token Amount", defaultValue: "" })
	.setInlineAction(async (taskArgs, hre) => {
		const { ethers } = await hre.network.connect()
		const contract = await ethers.getContractAt("BasicERC1155", taskArgs.contract)

		const mintTrx = await contract.mint(taskArgs.recipient, taskArgs.id, taskArgs.amount)

		console.log(`Transaction Hash: ${mintTrx.hash}`)
		await mintTrx.wait(2)
		console.log("Transaction confirmed")
	})
	.build()
