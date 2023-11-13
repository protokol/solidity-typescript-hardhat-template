// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ERC1155 } from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import { ERC1155Pausable } from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import { ERC1155Burnable } from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import { ERC1155Supply } from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

/**
 * This file was generated with Openzeppelin Wizard and later modified.
 * GO TO: https://wizard.openzeppelin.com/#erc1155
 */
contract BasicERC1155 is
	ERC1155,
	Ownable,
	ERC1155Pausable,
	ERC1155Burnable,
	ERC1155Supply
{
	using Strings for uint256;

	string public name;
	string public symbol;

	string private _contractURI;

	constructor(
		string memory _name,
		string memory _symbol,
		string memory baseURI,
		string memory contractURI_,
		address initialOwner
	) ERC1155(baseURI) Ownable(initialOwner) {
		name = _name;
		symbol = _symbol;
		_contractURI = contractURI_;
	}

	function setContractURI(string memory contractURI_) external onlyOwner {
		_contractURI = contractURI_;
	}

	function setURI(string memory newuri) external onlyOwner {
		_setURI(newuri);
	}

	function pause() external onlyOwner {
		_pause();
	}

	function unpause() external onlyOwner {
		_unpause();
	}

	function mint(
		address account,
		uint256 id,
		uint256 amount
	) external onlyOwner {
		_mint(account, id, amount, "");
	}

	function mintBatch(
		address to,
		uint256[] memory ids,
		uint256[] memory amounts
	) external onlyOwner {
		_mintBatch(to, ids, amounts, "");
	}

	function contractURI() external view returns (string memory) {
		return _contractURI;
	}

	/**
	 * @dev Returns base uri and adds .json suffix
	 * This is useful for metadata published on ipfs where files have .json suffix
	 */
	function uri(uint256 id) public view override returns (string memory) {
		return
			bytes(super.uri(id)).length > 0
				? string(
					abi.encodePacked(super.uri(id), id.toString(), ".json")
				)
				: "";
	}

	function _update(
		address from,
		address to,
		uint256[] memory ids,
		uint256[] memory values
	) internal override(ERC1155, ERC1155Pausable, ERC1155Supply) {
		super._update(from, to, ids, values);
	}
}
