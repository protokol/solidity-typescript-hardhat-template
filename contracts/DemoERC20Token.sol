// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DemoERC20Token is ERC20, ERC20Permit, Ownable {
	constructor()
		ERC20("Demo ERC20 Token", "DET")
		ERC20Permit("Demo ERC20 Token")
		Ownable(msg.sender)
	{
		_mint(msg.sender, 1_000_000 * 10 ** decimals());
	}
}
