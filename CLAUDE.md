# CLAUDE.md — Project Instructions

## Project Overview

Solidity/TypeScript Hardhat v3 template with ERC20, ERC721, and ERC1155 token contracts using OpenZeppelin v5 patterns.

## Key Commands

```bash
npm run compile        # Compile Solidity contracts
npm run test           # Run Mocha/Chai test suite
npm run coverage       # Run tests with coverage report
npm run format:write   # Format TypeScript/config files with Prettier
npm run sol:format:write  # Format Solidity files with Prettier
npm run lint:fix       # Fix ESLint issues
npm run solhint        # Lint Solidity with Solhint
```

## Solidity Conventions

- **Solidity version:** `pragma solidity 0.8.28;` — use this exact version, not a range
- **OpenZeppelin v5:** Import from `@openzeppelin/contracts/` (v5.6.1)
- **Contract patterns:** Ownable + Pausable for access control; pass `initialOwner` to Ownable constructor
- **Naming:** PascalCase for contracts (e.g., `BasicERC20`), use SPDX license identifier `MIT`
- **Override pattern:** When inheriting multiple contracts with shared functions, use `override(Contract1, Contract2)` and call `super`

## Test Conventions

- **Framework:** Mocha + Chai with `expect` style assertions
- **Fixture pattern:** Each test file defines a `setupFixture` async function, used via `loadFixture(setupFixture)`
- **Hardhat setup:** Use top-level `await hre.network.connect()` to get `ethers` and `networkHelpers`
- **Test structure:** `describe` block per contract, nested `describe` for functionality groups
- **Assertions:** Use `revertedWithCustomError` for access control checks (OpenZeppelin v5 custom errors)
- **File naming:** Test file matches contract name (e.g., `BasicERC721.ts` tests `BasicERC721.sol`)

## Task Conventions

- Located in `tasks/` organized by token type (e.g., `tasks/erc20/`, `tasks/erc721/`)
- Use Hardhat v3 task API: `task().addOption().setInlineAction().build()`
- Export named const (e.g., `erc20MintTask`) and register in `hardhat.config.ts`
- Include usage example in JSDoc comment above the task

## Deployment Conventions

- **Hardhat Ignition** modules in `ignition/modules/`
- Module naming: `<ContractName>Module` (e.g., `BasicERC20Module`)
- Use `m.getParameter()` for configurable values with sensible defaults
- Use `m.getAccount(0)` for deployer/owner address
- Export module as default export

## File Structure

```
contracts/          # Solidity source files
test/               # Mocha test files (TypeScript)
tasks/              # Hardhat tasks organized by token type
ignition/modules/   # Hardhat Ignition deployment modules
types/              # TypeScript type definitions
```

## Important Rules

- **Never edit `.env`** — contains private keys/mnemonics. Use `.env.example` as reference
- **Never edit `package-lock.json`** — only changes via `npm install`
- **Never edit files in `artifacts/`, `cache/`, or `node_modules/`** — these are generated
- When adding a new contract, also create: test file, Ignition module, and relevant tasks
- Always run `npm run compile` after modifying Solidity files to verify they compile
- Always run `npm run test` after modifying tests or contracts
