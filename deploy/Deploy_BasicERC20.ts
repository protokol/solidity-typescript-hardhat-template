import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { deployer, owner } = await hre.getNamedAccounts()

	await hre.deployments.deploy("BasicERC20", {
		from: deployer,
		args: ["ProtoToken", "PT", owner],
		log: true,
	})
}
export default func
func.tags = ["erc20"]
