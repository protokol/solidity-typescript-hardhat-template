import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"

/**
 * BasicERC20Module for deploying the BasicERC20 token contract
 */
const BasicERC20Module = buildModule("BasicERC20Module", (m) => {
	// Account index 0 is the owner and deployer
	const owner = m.getAccount(0)

	const basicERC20 = m.contract("BasicERC20", ["ProtoToken", "PT", owner], {
		from: owner,
	})

	return { basicERC20 }
})

export default BasicERC20Module
