import { expect } from "chai"
import { deployments, ethers, getNamedAccounts } from "hardhat"

describe("BasicERC1155", () => {
	const setupFixture = deployments.createFixture(async () => {
		await deployments.fixture()
		const signers = await getNamedAccounts()

		const name = "ProtoToken"
		const symbol = "PT"
		const baseURI = "ipfs://base-uri/"
		const contractURI = "ipfs://contract-uri"
		const owner = signers.deployer

		const contract = await ethers.deployContract(
			"BasicERC1155",
			[name, symbol, baseURI, contractURI, owner],
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
				baseURI,
				contractURI,
				owner,
			},
		}
	})

	it("Should Return Valid Contract Configurations Passed In Constructor", async () => {
		const { contractConstructor, contract } = await setupFixture()

		expect(await contract.name()).to.equal(contractConstructor.name)
		expect(await contract.symbol()).to.equal(contractConstructor.symbol)
		expect(await contract.contractURI()).to.equal(contractConstructor.contractURI)
		expect(await contract.owner()).to.equal(contractConstructor.owner)
	})

	describe("Minting Functionality", () => {
		it("Should Increase Supply When Minting", async () => {
			const { contract, deployer } = await setupFixture()

			expect(await contract["totalSupply(uint256)"](1)).to.equal(0)
			expect(await contract["totalSupply(uint256)"](2)).to.equal(0)

			await contract.mintBatch(deployer, [1, 2], [2000, 4000])

			expect(await contract["totalSupply(uint256)"](1)).to.equal(2000)
			expect(await contract["totalSupply(uint256)"](2)).to.equal(4000)

			expect(await contract.balanceOf(deployer, 1)).to.equal(2000)
			expect(await contract.balanceOf(deployer, 2)).to.equal(4000)
		})

		it("Should Allow Minting Only to Contract Owner - mint", async () => {
			const { contract, accounts } = await setupFixture()

			await expect(contract.connect(accounts[1]).mint(accounts[1].address, 1, 1000))
				.to.be.revertedWithCustomError(contract, "OwnableUnauthorizedAccount")
				.withArgs(await accounts[1].getAddress())
		})

		it("Should Allow Minting Only to Contract Owner - mintBatch", async () => {
			const { contract, accounts } = await setupFixture()

			await expect(contract.connect(accounts[1]).mintBatch(accounts[1].address, [1], [1000]))
				.to.be.revertedWithCustomError(contract, "OwnableUnauthorizedAccount")
				.withArgs(await accounts[1].getAddress())
		})
	})

	describe("Contract And Token Metadata", () => {
		it("Should Return Correct Token URI", async () => {
			const { contract, contractConstructor } = await setupFixture()

			expect(await contract.uri(1)).to.equal(`${contractConstructor.baseURI}1.json`)
		})

		it("Should Return Correct Contract URI", async () => {
			const { contract, contractConstructor } = await setupFixture()

			expect(await contract.contractURI()).to.equal(contractConstructor.contractURI)
		})
	})
})
