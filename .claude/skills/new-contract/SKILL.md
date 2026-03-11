---
description: Scaffold a new Solidity contract with test, Ignition module, and tasks following project patterns
user-invocable: true
disable-model-invocation: true
---

# /new-contract

Scaffold a new Solidity contract following the project's existing patterns.

## Instructions

1. **Ask the user** for:
    - Contract name (PascalCase, e.g., `MyToken`)
    - Token standard (ERC20, ERC721, ERC1155, or custom)
    - Features needed (Ownable, Pausable, Burnable, etc.)

2. **Create the contract** in `contracts/<ContractName>.sol`:
    - Use `pragma solidity 0.8.28;`
    - Import from `@openzeppelin/contracts/`
    - Follow the patterns in existing contracts (e.g., `BasicERC20.sol`)
    - Pass `initialOwner` to `Ownable` constructor (OpenZeppelin v5 pattern)
    - Include SPDX-License-Identifier: MIT

3. **Create the test file** in `test/<ContractName>.ts`:
    - Use the `setupFixture` + `loadFixture` pattern from existing tests
    - Use top-level `await hre.network.connect()` for ethers/networkHelpers
    - Test constructor parameters, core functionality, and access control
    - Use `revertedWithCustomError` for OpenZeppelin error assertions

4. **Create the Ignition module** in `ignition/modules/<ContractName>Module.ts`:
    - Follow `buildModule` pattern from existing modules
    - Use `m.getParameter()` with sensible defaults
    - Use `m.getAccount(0)` for owner/deployer
    - Export as default

5. **Create task files** in `tasks/<token-type>/`:
    - Use Hardhat v3 task API: `task().addOption().setInlineAction().build()`
    - Include usage example in comment
    - Export named const

6. **Register tasks** in `hardhat.config.ts`:
    - Import the new task(s)
    - Add to the `tasks` array

7. **Verify everything works:**
    - Run `npm run compile` to verify the contract compiles
    - Run `npm run test` to verify tests pass
    - Run `npm run sol:format:write` to format the Solidity file
    - Run `npm run format:write` to format TypeScript files
