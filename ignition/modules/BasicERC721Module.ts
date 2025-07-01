import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"

/**
 * BasicERC721Module for deploying the BasicERC721 token contract
 */
const BasicERC721Module = buildModule("BasicERC721Module", (m) => {
	// Contract parameters
	const tokenName = m.getParameter("name", "Default Token Name")
	const tokenSymbol = m.getParameter("symbol", "DTN")
	const baseUri = m.getParameter("baseUri", "ipfs://base-uri/")
	const contractUri = m.getParameter("contractUri", "ipfs://contract-uri")
	// Account index 0 is the owner and deployer
	const owner = m.getAccount(0)

	const basicERC721 = m.contract("BasicERC721", [tokenName, tokenSymbol, baseUri, contractUri, owner], {
		from: owner,
	})

	return { basicERC721 }
})

export default BasicERC721Module
