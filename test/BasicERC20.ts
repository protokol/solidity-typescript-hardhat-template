import { expect } from "chai"
import { ethers } from "hardhat"
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers"

describe("BasicERC20", () => {
	const setupFixture = async () => {
		const signers = await ethers.getSigners()

		const name = "ProtoToken"
		const symbol = "PT"
		const owner = signers[0].address

		const BasicERC20 = await ethers.getContractFactory("BasicERC20")
		const contract = await BasicERC20.deploy(name, symbol, owner, {
			from: owner,
		})

		return {
			contract,
			contractAddress: await contract.getAddress(),
			deployer: owner,
			accounts: await ethers.getSigners(),
			contractConstructor: {
				name,
				symbol,
				owner,
			},
		}
	}

	it("Should Return Valid Contract Configurations Passed In Constructor", async () => {
		const { contractConstructor, contract } = await loadFixture(setupFixture)

		expect(await contract.name()).to.equal(contractConstructor.name)
		expect(await contract.symbol()).to.equal(contractConstructor.symbol)
		expect(await contract.owner()).to.equal(contractConstructor.owner)
	})

	describe("Minting Functionality", () => {
		it("Should Increase Total Supply and User Supply When Minting", async () => {
			const { contract, accounts } = await loadFixture(setupFixture)

			expect(await contract.totalSupply()).to.equal(0)

			await contract.mint(accounts[0].address, 1000)
			await contract.mint(accounts[1].address, 2000)

			expect(await contract.totalSupply()).to.equal(3000)
			expect(await contract.balanceOf(accounts[0].address)).to.equal(1000)
			expect(await contract.balanceOf(accounts[1].address)).to.equal(2000)
		})

		it("Should Allow Only Owner to Mint Tokens", async () => {
			const { contract, accounts } = await loadFixture(setupFixture)

			await expect(contract.connect(accounts[1]).mint(accounts[1].address, 1000))
				.to.be.revertedWithCustomError(contract, "OwnableUnauthorizedAccount")
				.withArgs(await accounts[1].getAddress())
		})
	})
})
