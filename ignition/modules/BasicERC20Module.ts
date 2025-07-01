import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"

/**
 * BasicERC20Module for deploying the BasicERC20 token contract
 */
const BasicERC20Module = buildModule("BasicERC20Module", (m) => {
	// Contract parameters
	const tokenName = m.getParameter("name", "Default Token Name")
	const tokenSymbol = m.getParameter("symbol", "DTN")
	// Account index 0 is the owner and deployer
	const owner = m.getAccount(0)

	const basicERC20 = m.contract("BasicERC20", [tokenName, tokenSymbol, owner], {
		from: owner,
	})

	return { basicERC20 }
})

export default BasicERC20Module
