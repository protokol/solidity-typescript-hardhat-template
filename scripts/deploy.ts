/* Deploy the ERC-20 smart contract */

import { ethers } from "hardhat"

async function main() {
	const contractClassName = "DemoERC20Token"

	const erc20 = await ethers.deployContract(contractClassName)

	await erc20.waitForDeployment()

	console.log("Contract Deployed at " + erc20.target)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})
