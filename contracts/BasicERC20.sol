// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";

contract BasicERC20 is ERC20, ERC20Burnable, ERC20Pausable, Ownable {
	constructor(
		string memory name,
		string memory symbol,
		address initialOwner
	) ERC20(name, symbol) Ownable(initialOwner) {}

	function pause() public onlyOwner {
		_pause();
	}

	function unpause() public onlyOwner {
		_unpause();
	}

	function mint(address to, uint256 amount) public onlyOwner {
		_mint(to, amount);
	}

	function _update(
		address from,
		address to,
		uint256 value
	) internal override(ERC20, ERC20Pausable) {
		super._update(from, to, value);
	}
}
