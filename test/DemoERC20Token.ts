import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { expect } from "chai"
import { ethers } from "hardhat"

describe("DemoERC20Token", () => {
	const DECIMALS = 18n

	async function deployFixture() {
		const contractName = "DemoERC20Token"
		const tokenName = "Demo ERC20 Token"
		const tokenSymbol = "DET"
		const supply = 1000000n ** DECIMALS
		const [owner, otherAccount] = await ethers.getSigners()
		const DemoERC20Token = await ethers.getContractFactory(contractName)
		const contract = await DemoERC20Token.deploy()
		return {
			contract,
			owner,
			otherAccount,
			contractName,
			tokenName,
			tokenSymbol,
			supply,
		}
	}

	it("Should has the correct name", async () => {
		const { contract, tokenName } = await loadFixture(deployFixture)
		const name = (await contract.name()) as string
		expect(name).to.equal(tokenName, "The name is wrong")
	})

	it("Should has the correct symbol", async () => {
		const { contract, tokenSymbol } = await loadFixture(deployFixture)
		const symbol = (await contract.symbol()) as string
		expect(symbol).to.equal(tokenSymbol, "The symbol is wrong")
	})

	it("Should has the correct decimals", async () => {
		const { contract } = await loadFixture(deployFixture)
		const decimals = await contract.decimals()
		expect(decimals).to.equal(DECIMALS, "The decimals are wrong")
	})

	it("Should transfer", async () => {
		const qty = 1n * 10n ** DECIMALS

		const { contract, owner, otherAccount } = await loadFixture(deployFixture)
		const balanceAdminBefore = await contract.balanceOf(owner.address)
		const balanceToBefore = await contract.balanceOf(otherAccount.address)

		await contract.transfer(otherAccount.address, qty)

		const balanceAdminNow = await contract.balanceOf(owner.address)
		const balanceToNow = await contract.balanceOf(otherAccount.address)

		expect(balanceAdminNow).to.equal(balanceAdminBefore - qty, "The admin balance is wrong")
		expect(balanceToNow).to.equal(balanceToBefore + qty, "The to balance is wrong")
	})

	it("Should approve", async () => {
		const qty = 1n * 10n ** DECIMALS

		const { contract, owner, otherAccount } = await loadFixture(deployFixture)
		await contract.approve(otherAccount.address, qty)
		const allowedAmount = await contract.allowance(owner.address, otherAccount.address)

		expect(qty).to.equal(allowedAmount, "The allowed amount is wrong")
		;``
	})

	it("Should transfer from", async () => {
		const qty = 1n * 10n ** DECIMALS

		const { contract, owner, otherAccount } = await loadFixture(deployFixture)
		const allowanceBefore = await contract.allowance(owner.address, otherAccount.address)
		const balanceAdminBefore = await contract.balanceOf(owner.address)
		const balanceToBefore = await contract.balanceOf(otherAccount.address)

		await contract.approve(otherAccount.address, qty)

		const instance = contract.connect(otherAccount)
		await instance.transferFrom(owner.address, otherAccount.address, qty)

		const allowanceNow = await contract.allowance(owner.address, otherAccount.address)
		const balanceAdminNow = await contract.balanceOf(owner.address)
		const balanceToNow = await contract.balanceOf(otherAccount.address)

		expect(allowanceBefore).to.equal(allowanceNow, "The allowance is wrong")
		expect(balanceAdminNow).to.equal(balanceAdminBefore - qty, "The admin balance is wrong")
		expect(balanceToNow).to.equal(balanceToBefore + qty, "The to balance is wrong")
	})

	it("Should NOT transfer from", async () => {
		const qty = 1n * 10n ** DECIMALS
		const { contract, owner, otherAccount } = await loadFixture(deployFixture)

		await expect(contract.transferFrom(owner.address, otherAccount.address, qty)).to.be.revertedWithCustomError(
			contract,
			"ERC20InsufficientAllowance"
		)
	})

	it("Should renounce ownership correctly", async () => {
		const { contract, owner } = await loadFixture(deployFixture)

		// Before renouncing, check that the owner is the deployer
		expect(await contract.owner()).to.equal(owner.address)

		// Owner renounces ownership
		await contract.connect(owner).renounceOwnership()

		// After renouncing, the owner should be the zero address
		expect(await contract.owner()).to.not.equal(owner.address)
		expect(await contract.owner()).to.equal("0x0000000000000000000000000000000000000000")
	})
})
