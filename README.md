![Img](header.png)

# TypeScript Solidity Boilerplate Starter Kit

A BoilerPlate Template Project To Start Solidity Development With Hardhat and Typescript.
All you have to do is create a new repository from the template and start coding your smart contracts.

## Table of content
- [TypeScript Solidity Boilerplate Starter Kit](#typescript-solidity-boilerplate-starter-kit)
  - [Table of content](#table-of-content)
  - [Hardhat Configuration](#hardhat-configuration)
  - [Supported Networks](#supported-networks)
- [1. Getting started](#1-getting-started)
  - [1.1. Install Dependencies](#11-install-dependencies)
  - [2. Environment Setup](#2-environment-setup)
  - [3. Create and compile your Contracts](#3-create-and-compile-your-contracts)
  - [4. Deploy and Verify your smart contract](#4-deploy-and-verify-your-smart-contract)
    - [4.1. Deploy contract](#41-deploy-contract)
    - [4.2. Verify the contract on Mainnet](#42-verify-the-contract-on-mainnet)
  - [5. Utils](#5-utils)
    - [5.1 Airdrop your token](#51-airdrop-your-token)
  - [6. Blocked with your code?](#6-blocked-with-your-code)
- [Appendix](#appendix)
  - [Appendix 1: Project Structure](#appendix-1-project-structure)
  - [Appedix 2: Testing](#appedix-2-testing)
    - [Run Tests](#run-tests)
    - [Run Coverage](#run-coverage)
  - [Appendix 3: Project Hygiene](#appendix-3-project-hygiene)
    - [Prettier - Non Solidity Files](#prettier---non-solidity-files)
    - [Lint - Non Solidity Files](#lint---non-solidity-files)
    - [Prettier - Solidity](#prettier---solidity)
    - [Solhint - Enforcing styles and security best practices](#solhint---enforcing-styles-and-security-best-practices)
- [Credits](#credits)

## Hardhat Configuration

-   [Typechain](https://github.com/dethcrypto/TypeChain) plugin enabled (typescript type bindings for smart contracts)
-   [hardhat-deploy](https://github.com/wighawag/hardhat-deploy) plugin enabled
-   Testing environment configured and operational, with test coverage
-   Prettier and eslint configured for project files and solidity smart contract
-   [Solhint](https://github.com/protofire/solhint) configured for enforcing best practices
-   Github actions workflows prepared for CI/CD
-   Prepared Smart Contract Examples, Tests, Deployments and Tasks for Common ERC Standards (ERC20, ERC721, ERC1155)

Check the Hardhat documentation for more information.

https://hardhat.org/getting-started/

## Supported Networks

**Ethereum**
- [x] Ethereum Mainnet
- [x] Ethereum Sepolia Testnet

**Base**
- [x] Base Mainnet
- [x] Base Sepolia Testnet

**Polygon**
- [x] Polygon Mainnet
- [x] Polygon Mumbai Testnet
  
**Local development**
- [x] Hardhat Network (localhost)

Feel free to add more networks in `hardhat.config.ts` file.

# 1. Getting started

## 1.1. Install Dependencies

```shell
npm install
```

## 2. Environment Setup

Copy `.env.example` to  `.env` and edit it.
Make sure you include either `MNEMONIC` or `PRIVATE_KEY` in your `.env` file.

## 3. Create and compile your Contracts
Add your contract in the folder `/contracts` (see the demo example), and your tests in `/test`.

Then compile your Solidity contract to verify you have no error.
```shell
npm run compile
```

## 4. Deploy and Verify your smart contract

### 4.1. Deploy contract

To deploy on Base Sepolia Testnet
```
npx hardhat run scripts/deploy.ts --network base-sepolia
```

To deploy on Base Mainnet
```
npx hardhat run scripts/deploy.ts --network base-mainnet
```

### 4.2. Verify the contract on Mainnet
To Verify your contract on Base Sepolia Testnet
```
npx hardhat verify --network base-sepolia <contract address>
```

To Verify your contract on Base Mainnet
```
npx hardhat verify --network base-mainnet <contract address>
```

## 5. Utils
This framework comes with few utility scripts to help you to test your solution.

### 5.1 Airdrop your token

The `scripts/airdrop.ts` allows you to enter a list of recipients and the amount of token for each of them.

To airdrop on Base Sepolia
```
npx hardhat run scripts/airdrop.ts --network base-sepolia
```

To airdrop on Base Sepolia
```
npx hardhat run scripts/airdrop.ts --network base-mainnet
```

## 6. Blocked with your code? 
We have tailored a ChatGPT only for Base: "[Build on Base Assistant](https://chat.openai.com/g/g-lRcJhlY7q-build-on-base-assistant)".  
This GPT is made to know Base tokens and contract addresses, as well to help you in all steps of your development.


# Appendix
## Appendix 1: Project Structure

```text
.
├── contracts
│   └── DemoERC20Token.sol
├── deployments
├── hardhat.config.ts
├── scripts
│   ├── airdrop.ts
│   └── deploy.ts
├── tasks
│   └── utils
│       ├── account.ts
│       ├── balance.ts
│       ├── block-numbers.ts
│       └── send-eth.ts
└── test
    └── DemoERC20Token.ts
```

## Appedix 2: Testing

### Run Tests

```shell
npm run test
```

### Run Coverage

```shell
npm run coverage
```

## Appendix 3: Project Hygiene

### Prettier - Non Solidity Files

```shell
npm run format:check
npm run format:write
```

### Lint - Non Solidity Files

```shell
npm run lint:check
npm run lint:fix
```

### Prettier - Solidity

```shell
npm run sol:format:check
npm run sol:format:write
```

### Solhint - Enforcing styles and security best practices

```shell
npm run solhint
```

# Credits
All credit for this framework goes to:
* [Protokol](https://www.protokol.com) for their original project [solidity-typescript-hardhat-template](https://github.com/protokol/solidity-typescript-hardhat-template) we forked. 
* Base team for the Tutorial "[Deploying a smart contract using Hardhat](https://docs.base.org/tutorials/deploy-with-hardhat)"
