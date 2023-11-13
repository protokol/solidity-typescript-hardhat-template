import { task } from "hardhat/config"

/**
 Example:
 hardhat erc721-base-uri \
 --contract 0x77337983A7D1699FaF51a5f43b9907fB7B614097 \
 --uri https://ipfs.io/ipfs/new-base-uri-ipfs-hash/ \
 --network sepolia
 */
task("erc721-base-uri", "Set new base URI for BasicERC721 Smart Contract")
	.addParam<string>("contract", "BasicERC721 Smart Contract Address")
	.addParam<string>("uri", "New Base URI")
	.setAction(async (taskArgs, { ethers }) => {
		const contract = await ethers.getContractAt("BasicERC721", taskArgs.contract)

		const trx = await contract.setBaseURI(taskArgs.uri)

		console.log(`Transaction Hash: ${trx.hash}`)
		await trx.wait(2)
		console.log("Transaction confirmed")
	})
