// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { ERC721Enumerable } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import { ERC721Pausable } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import { ERC721Burnable } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

/**
 * This file was generated with Openzeppelin Wizard and later modified.
 * GO TO: https://wizard.openzeppelin.com/#erc721
 */
contract BasicERC721 is
	ERC721,
	ERC721Enumerable,
	ERC721Pausable,
	Ownable,
	ERC721Burnable
{
	using Strings for uint256;

	uint256 private _nextTokenId;
	string private _tokenBaseURI;
	string private _contractURI;

	constructor(
		string memory name,
		string memory symbol,
		string memory tokenBaseURI,
		string memory contractURI_,
		address initialOwner
	) ERC721(name, symbol) Ownable(initialOwner) {
		_tokenBaseURI = tokenBaseURI;
		_contractURI = contractURI_;
	}

	function safeMint(address to) external onlyOwner {
		unchecked {
			_nextTokenId++;
		}
		_safeMint(to, _nextTokenId);
	}

	function pause() external onlyOwner {
		_pause();
	}

	function unpause() external onlyOwner {
		_unpause();
	}

	function setBaseURI(string memory baseURI) external onlyOwner {
		_tokenBaseURI = baseURI;
	}

	function setContractURI(string memory contractURI_) external onlyOwner {
		_contractURI = contractURI_;
	}

	function _baseURI() internal view override returns (string memory) {
		return _tokenBaseURI;
	}

	function contractURI() external view returns (string memory) {
		return _contractURI;
	}

	/**
	 * @dev Returns base uri and adds .json suffix
	 * This is useful for metadata published on ipfs where files have .json suffix
	 */
	function tokenURI(
		uint256 tokenId
	) public view override returns (string memory) {
		if (ownerOf(tokenId) == address(0))
			revert ERC721NonexistentToken(tokenId);

		return
			bytes(_baseURI()).length > 0
				? string(
					abi.encodePacked(_baseURI(), tokenId.toString(), ".json")
				)
				: "";
	}

	function _update(
		address to,
		uint256 tokenId,
		address auth
	)
		internal
		override(ERC721, ERC721Enumerable, ERC721Pausable)
		returns (address)
	{
		return super._update(to, tokenId, auth);
	}

	function _increaseBalance(
		address account,
		uint128 value
	) internal override(ERC721, ERC721Enumerable) {
		super._increaseBalance(account, value);
	}

	function supportsInterface(
		bytes4 interfaceId
	) public view override(ERC721, ERC721Enumerable) returns (bool) {
		return super.supportsInterface(interfaceId);
	}
}
