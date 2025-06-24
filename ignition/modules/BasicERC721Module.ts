import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"

/**
 * BasicERC721Module for deploying the BasicERC721 token contract
 */
const BasicERC721Module = buildModule("BasicERC721Module", (m) => {
	// Account index 0 is the owner and deployer
	const owner = m.getAccount(0)

	const basicERC721 = m.contract(
		"BasicERC721",
		["ProtoToken", "PT", "ipfs://base-uri/", "ipfs://contract-uri", owner],
		{
			from: owner,
		}
	)

	return { basicERC721 }
})

export default BasicERC721Module
