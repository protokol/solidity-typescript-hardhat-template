import { task } from "hardhat/config"

/**
 Example:
 hardhat erc1155-contract-uri \
 --contract 0x320bd6de80d3D5361e1c9bB4CF1D7D9Ef24F3Ac7 \
 --uri https://ipfs.io/ipfs/new-contract-uri-ipfs-hash \
 --network sepolia
 */
task("erc1155-contract-uri", "Set new Contract URI for BasicERC1155 Smart Contract")
	.addParam<string>("contract", "BasicERC1155 Smart Contract Address")
	.addParam<string>("uri", "New Contract URI")
	.setAction(async (taskArgs, { ethers }) => {
		const contract = await ethers.getContractAt("BasicERC1155", taskArgs.contract)

		console.log(`Current Contract URI: ${await contract.contractURI()}`)

		const trx = await contract.setContractURI(taskArgs.uri)

		console.log(`Transaction Hash: ${trx.hash}`)
		await trx.wait(2)
		console.log("Transaction confirmed")

		console.log(`New Contract URI: ${await contract.contractURI()}`)
	})
