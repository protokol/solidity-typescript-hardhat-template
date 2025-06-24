import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"

/**
 * BasicERC1155Module for deploying the BasicERC1155 token contract
 */
const BasicERC1155Module = buildModule("BasicERC1155Module", (m) => {
	// Account index 0 is the owner and deployer
	const owner = m.getAccount(0)

	const basicERC1155 = m.contract(
		"BasicERC1155",
		["ProtoToken", "PT", "ipfs://base-uri/", "ipfs://contract-uri", owner],
		{
			from: owner,
		}
	)

	return { basicERC1155 }
})

export default BasicERC1155Module