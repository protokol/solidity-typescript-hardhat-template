import { task } from "hardhat/config"

/**
 Example:
 hardhat erc20-mint \
 --contract 0xca6C5326076fe4a1a2369D5Ed8Dd7162c922CD1D \
 --recipient 0x73faDd7E476a9Bc2dA6D1512A528366A3E50c3cF \
 --amount 10000 \
 --network sepolia
 */
task("erc20-mint", "Mint tokens for BasicERC20 Smart Contract")
	.addParam<string>("contract", "BasicERC20 Smart Contract Address")
	.addParam<string>("recipient", "ERC20 Tokens Recipient")
	.addParam<string>("amount", "ERC20 Tokens Amount")
	.setAction(async (taskArgs, { ethers }) => {
		const contract = await ethers.getContractAt("BasicERC20", taskArgs.contract)

		const mintTrx = await contract.mint(taskArgs.recipient, taskArgs.amount)

		console.log(`Transaction Hash: ${mintTrx.hash}`)
		await mintTrx.wait(2)
		console.log("Transaction confirmed")
	})
