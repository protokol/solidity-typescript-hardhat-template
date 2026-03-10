import { task } from "hardhat/config"

/**
 Example:
 npx hardhat erc721-base-uri \
 --contract 0x77337983A7D1699FaF51a5f43b9907fB7B614097 \
 --uri https://ipfs.io/ipfs/new-base-uri-ipfs-hash/ \
 --network sepolia
 */
export const erc721BaseUriTask = task("erc721-base-uri", "Set new base URI for BasicERC721 Smart Contract")
	.addOption({ name: "contract", description: "BasicERC721 Smart Contract Address", defaultValue: "" })
	.addOption({ name: "uri", description: "New Base URI", defaultValue: "" })
	.setInlineAction(async (taskArgs, hre) => {
		const { ethers } = await hre.network.connect()
		const contract = await ethers.getContractAt("BasicERC721", taskArgs.contract)

		const trx = await contract.setBaseURI(taskArgs.uri)

		console.log(`Transaction Hash: ${trx.hash}`)
		await trx.wait(2)
		console.log("Transaction confirmed")
	})
	.build()
