import { expect } from "chai"
import { ethers } from "hardhat"
import { makeInterfaceId } from "@openzeppelin/test-helpers"
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers"

describe("BasicERC721", () => {
	const setupFixture = async () => {
		const signers = await ethers.getSigners()

		const name = "ProtoToken"
		const symbol = "PT"
		const baseURI = "ipfs://base-uri/"
		const contractURI = "ipfs://contract-uri"
		const owner = signers[0].address

		const BasicERC721 = await ethers.getContractFactory("BasicERC721")
		const contract = await BasicERC721.deploy(name, symbol, baseURI, contractURI, owner, {
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
				baseURI,
				contractURI,
				owner,
			},
		}
	}

	it("Should Return Valid Contract Configurations Passed In Constructor", async () => {
		const { contractConstructor, contract } = await loadFixture(setupFixture)

		expect(await contract.name()).to.equal(contractConstructor.name)
		expect(await contract.symbol()).to.equal(contractConstructor.symbol)
		expect(await contract.contractURI()).to.equal(contractConstructor.contractURI)
		expect(await contract.owner()).to.equal(contractConstructor.owner)
	})

	describe("Minting Functionality", () => {
		it("Should Increase Total Supply When Minting", async () => {
			const { contract, deployer } = await loadFixture(setupFixture)

			expect(await contract.totalSupply()).to.equal(0)

			await contract.safeMint(deployer)

			await contract.safeMint(deployer)

			await contract.safeMint(deployer)

			expect(await contract.totalSupply()).to.equal(3)
		})

		it("Should Mint Tokens With Correct Token IDs", async () => {
			const { contract, accounts } = await loadFixture(setupFixture)

			await contract.safeMint(await accounts[0].getAddress())

			await contract.safeMint(await accounts[1].getAddress())

			await contract.safeMint(await accounts[2].getAddress())

			expect(await contract.ownerOf(1)).to.equal(await accounts[0].getAddress())
			expect(await contract.ownerOf(2)).to.equal(await accounts[1].getAddress())
			expect(await contract.ownerOf(3)).to.equal(await accounts[2].getAddress())
		})

		it("Should Allow Minting Only to Contract Owner", async () => {
			const { contract, accounts } = await loadFixture(setupFixture)

			await expect(contract.connect(accounts[1]).safeMint(await accounts[1].getAddress()))
				.to.be.revertedWithCustomError(contract, "OwnableUnauthorizedAccount")
				.withArgs(await accounts[1].getAddress())
		})
	})

	describe("Contract And Token Metadata", () => {
		it("Should Return Correct Token URI", async () => {
			const { contract, accounts, contractConstructor } = await loadFixture(setupFixture)

			await contract.safeMint(await accounts[0].getAddress())

			expect(await contract.tokenURI(1)).to.equal(`${contractConstructor.baseURI}1.json`)
		})

		it("Should Return Correct Token URI", async () => {
			const { contract } = await loadFixture(setupFixture)

			await expect(contract.tokenURI(1))
				.to.be.revertedWithCustomError(contract, "ERC721NonexistentToken")
				.withArgs(1)
		})

		it("Should Return Correct Contract URI", async () => {
			const { contract, contractConstructor } = await loadFixture(setupFixture)

			expect(await contract.contractURI()).to.equal(contractConstructor.contractURI)
		})
	})

	describe("InterfaceId", () => {
		it("Should Validate IERC721", async () => {
			const { contract } = await loadFixture(setupFixture)

			const erc721InterfaceId = makeInterfaceId.ERC165([
				"balanceOf(address)",
				"ownerOf(uint256)",
				"safeTransferFrom(address,address,uint256)",
				"transferFrom(address,address,uint256)",
				"approve(address,uint256)",
				"getApproved(uint256)",
				"setApprovalForAll(address,bool)",
				"isApprovedForAll(address,address)",
				"safeTransferFrom(address,address,uint256,bytes)",
			])

			expect(await contract.supportsInterface(erc721InterfaceId)).to.equal(true)
		})

		it("Should Validate IERC721Enumerable", async () => {
			const { contract } = await loadFixture(setupFixture)

			const erc721EnumerableInterfaceId = makeInterfaceId.ERC165([
				"totalSupply()",
				"tokenOfOwnerByIndex(address,uint256)",
				"tokenByIndex(uint256)",
			])

			expect(await contract.supportsInterface(erc721EnumerableInterfaceId)).to.equal(true)
		})
	})
})
