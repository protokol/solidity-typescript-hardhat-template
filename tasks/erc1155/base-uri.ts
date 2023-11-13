import { task } from "hardhat/config"

/**
 Example:
 hardhat erc1155-base-uri \
 --contract 0x320bd6de80d3D5361e1c9bB4CF1D7D9Ef24F3Ac7 \
 --uri https://ipfs.io/ipfs/new-base-uri-ipfs-hash/ \
 --network sepolia
 */
task("erc1155-base-uri", "Set new base URI for BasicERC1155 Smart Contract")
	.addParam<string>("contract", "BasicERC1155 Smart Contract Address")
	.addParam<string>("uri", "New Base URI")
	.setAction(async (taskArgs, { ethers }) => {
		const contract = await ethers.getContractAt("BasicERC1155", taskArgs.contract)

		const trx = await contract.setURI(taskArgs.uri)

		console.log(`Transaction Hash: ${trx.hash}`)
		await trx.wait(2)
		console.log("Transaction confirmed")
	})
