import { expect } from "chai"
import { deployments, ethers, getNamedAccounts } from "hardhat"

describe("BasicERC20", () => {
	const setupFixture = deployments.createFixture(async () => {
		await deployments.fixture()
		const signers = await getNamedAccounts()

		const name = "ProtoToken"
		const symbol = "PT"
		const owner = signers.deployer

		const contract = await ethers.deployContract(
			"BasicERC20",
			[name, symbol, owner],
			await ethers.getSigner(signers.deployer)
		)

		return {
			contract,
			contractAddress: await contract.getAddress(),
			deployer: signers.deployer,
			accounts: await ethers.getSigners(),
			contractConstructor: {
				name,
				symbol,
				owner,
			},
		}
	})

	it("Should Return Valid Contract Configurations Passed In Constructor", async () => {
		const { contractConstructor, contract } = await setupFixture()

		expect(await contract.name()).to.equal(contractConstructor.name)
		expect(await contract.symbol()).to.equal(contractConstructor.symbol)
		expect(await contract.owner()).to.equal(contractConstructor.owner)
	})

	describe("Minting Functionality", () => {
		it("Should Increase Total Supply and User Supply When Minting", async () => {
			const { contract, accounts } = await setupFixture()

			expect(await contract.totalSupply()).to.equal(0)

			await contract.mint(accounts[0].address, 1000)
			await contract.mint(accounts[1].address, 2000)

			expect(await contract.totalSupply()).to.equal(3000)
			expect(await contract.balanceOf(accounts[0].address)).to.equal(1000)
			expect(await contract.balanceOf(accounts[1].address)).to.equal(2000)
		})

		it("Should Allow Only Owner to Mint Tokens", async () => {
			const { contract, accounts } = await setupFixture()

			await expect(contract.connect(accounts[1]).mint(accounts[1].address, 1000))
				.to.be.revertedWithCustomError(contract, "OwnableUnauthorizedAccount")
				.withArgs(await accounts[1].getAddress())
		})
	})
})
