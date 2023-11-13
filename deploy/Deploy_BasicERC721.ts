import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { deployer, owner } = await hre.getNamedAccounts()

	await hre.deployments.deploy("BasicERC721", {
		from: deployer,
		args: ["ProtoToken", "PT", "ipfs://base-uri/", "ipfs://contract-uri", owner],
		log: true,
	})
}
export default func
func.tags = ["erc721"]
