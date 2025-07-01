![Img](header.png)

# TypeScript Solidity Boilerplate Starter Kit

A BoilerPlate Template Project To Start Solidity Development With Hardhat and Typescript.
All you have to do is create a new repository from the template and start coding your smart contracts.

## Hardhat Configuration

- [Typechain](https://github.com/dethcrypto/TypeChain) plugin enabled (typescript type bindings for smart contracts)
- [Ignition](https://hardhat.org/ignition/docs/getting-started) for contract deployment
- Testing environment configured and operational, with test coverage
- Prettier and eslint configured for project files and solidity smart contract
- [Solhint](https://github.com/protofire/solhint) configured for enforcing best practices
- Github actions workflows prepared for CI/CD
- Prepared Smart Contract Examples, Tests, Deployments and Tasks for Common ERC Standards (ERC20, ERC721, ERC1155)

Check the Hardhat documentation for more information.

https://hardhat.org/getting-started/

## Project Structure

```text
.
├── contracts
│   ├── BasicERC1155.sol
│   ├── BasicERC20.sol
│   └── BasicERC721.sol
├── ignition
│   ├── deployments
│   ├── modules
│   │   ├── BasicERC1155Module.ts
│   │   ├── BasicERC20Module.ts
│   │   └── BasicERC721Module.ts
│   └── parameters
│       └── custom.json
├── tasks
│   ├── erc1155
│   │   ├── base-uri.ts
│   │   ├── contract-uri.ts
│   │   └── mint.ts
│   ├── erc20
│   │   └── mint.ts
│   ├── erc721
│   │   ├── base-uri.ts
│   │   ├── contract-uri.ts
│   │   └── mint.ts
│   └── utils
│       ├── accounts.ts
│       ├── balance.ts
│       ├── block-number.ts
│       └── send-eth.ts
├── test
│   ├── BasicERC1155.ts
│   ├── BasicERC20.ts
│   └── BasicERC721.ts
└── hardhat.config.ts
```

## Supported Networks

- Hardhat Network (localhost)
- Ethereum Mainnet
- Ethereum Sepolia Testnet
- Polygon Mainnet
- Polygon Mumbai Testnet

Feel free to add more networks in `hardhat.config.ts` file.

## Hardhat Shorthand

We recommend installing `hh autocomplete` so you can use `hh` shorthand globally.

```shell
npm i -g hardhat-shorthand
```

https://hardhat.org/guides/shorthand.html

### Common Shorthand Commands

- `hh compile` - to compile smart contract and generate typechain ts bindings
- `hh test` - to run tests
- `hh igntion` - to deploy smart contracts
- `hh node` - to run a localhost node
- `hh help` - to see all available commands
- `hh TABTAB` - to use autocomplete

## Usage

### Setup

#### 1. Install Dependencies

```shell
npm install
```

#### 2. Compile Contracts

```shell
npm run compile
```

#### 3. Environment Setup

Create `.env` file and add your environment variables. You can use `.env.example` as a template.

If you are going to use public network, make sure you include the right RPC provider for that network.

Make sure you include either `MNEMONIC` or `PRIVATE_KEY` in your `.env` file.

### Example Flow - Deploy ERC721 Token

> This is an example flow to deploy an ERC721 token to a public network and interact with it.

#### 1.1 Deploy BasicERC721 Contract

```shell
hh ignition deploy ignition/modules/BasicERC721Module.ts --network sepolia
```

**Verify contract**

```shell
hh ignition verify chain-11155111
```

#### 1.2 Deploy and Verify

```shell
hh ignition deploy ignition/modules/BasicERC721Module.ts --network sepolia --verify
```

#### 1.3 Deploy and Verify with Custom Parameters

Look at `ignition/parameters/custom.json` to see how to adjust contract parameters

```shell
hh ignition deploy ignition/modules/BasicERC721Module.ts --network sepolia --verify --parameters ignition/parameters/custom.json
```

#### 2. Interact With Contract - Mint

```shell
hh erc721-mint \
 --contract 0x1FEB5675Be6F256c4680BE447D6C353E02e04fb9 \
 --recipient 0x73faDd7E476a9Bc2dA6D1512A528366A3E50c3cF \
 --network sepolia
```

---

### Testing

#### Run Tests

```shell
npm run test
```

#### Run Coverage

```shell
npm run coverage
```

---

### Project Hygiene

#### Prettier - Non Solidity Files

```shell
npm run format:check
npm run format:write
```

#### Lint - Non Solidity Files

```shell
npm run lint:check
npm run lint:fix
```

#### Prettier - Solidity

```shell
npm run sol:format:check
npm run sol:format:write
```

#### Solhint - Enforcing styles and security best practices

```shell
npm run solhint
```

<br>

## Contact Protokol

**Need additional help with your solidity project?**

Protokol builds custom blockchain and web3 solutions for organisations of all sizes. We build everything from smart contracts, to dApps, to fully bespoke web3 solutions.

Reach out at [protokol.com/contact](https://www.protokol.com/contact/) to learn how our web3 development services could help bring your project to life.

<br>

## Join Protokol

**Looking for an exciting new role in web3?**

Head over to [protokol.com/careers](https://www.protokol.com/careers/) to discover the roles we have available or to submit your résumé.
