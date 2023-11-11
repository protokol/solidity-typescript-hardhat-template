import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { deployer } = await hre.getNamedAccounts()
	await hre.deployments.deploy("BasicERC721", {
		from: deployer,
		args: ["ProtoToken", "PT", "ipfs://base-uri/", deployer],
		log: true,
	})
}
export default func
func.id = "nft_basic_erc721"
func.tags = ["nft"]
