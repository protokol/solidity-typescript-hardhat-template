import { task } from "hardhat/config"

/**
 Example:
 npx hardhat erc721-mint \
 --contract 0x77337983A7D1699FaF51a5f43b9907fB7B614097 \
 --recipient 0x73faDd7E476a9Bc2dA6D1512A528366A3E50c3cF \
 --network sepolia
 */
export const erc721MintTask = task("erc721-mint", "Mint token for BasicERC721 Smart Contract")
	.addOption({ name: "contract", description: "BasicERC721 Smart Contract Address", defaultValue: "" })
	.addOption({ name: "recipient", description: "NFT Token Recipient", defaultValue: "" })
	.setAction(async (taskArgs, hre) => {
		const { ethers } = await hre.network.connect()
		const contract = await ethers.getContractAt("BasicERC721", taskArgs.contract)

		const mintTrx = await contract.safeMint(taskArgs.recipient)

		console.log(`Transaction Hash: ${mintTrx.hash}`)
		await mintTrx.wait(2)
		console.log("Transaction confirmed")
	})
	.build()
