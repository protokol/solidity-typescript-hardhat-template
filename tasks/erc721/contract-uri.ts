import { task } from "hardhat/config"

/**
 Example:
 hardhat erc721-contract-uri \
 --contract 0x77337983A7D1699FaF51a5f43b9907fB7B614097 \
 --uri https://ipfs.io/ipfs/new-contract-uri-ipfs-hash \
 --network sepolia
 */
task("erc721-contract-uri", "Set new Contract URI for BasicERC721 Smart Contract")
	.addParam<string>("contract", "BasicERC721 Smart Contract Address")
	.addParam<string>("uri", "New Contract URI")
	.setAction(async (taskArgs, { ethers }) => {
		const contract = await ethers.getContractAt("BasicERC721", taskArgs.contract)

		console.log(`Current Contract URI: ${await contract.contractURI()}`)

		const trx = await contract.setContractURI(taskArgs.uri)

		console.log(`Transaction Hash: ${trx.hash}`)
		await trx.wait(2)
		console.log("Transaction confirmed")

		console.log(`New Contract URI: ${await contract.contractURI()}`)
	})
