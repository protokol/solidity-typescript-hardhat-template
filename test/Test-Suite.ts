import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signers";
import { Contract } from "ethers";
import { ethers } from "hardhat";

import { expect } from "./chai-setup";

describe("Token contract", function () {
    // Mocha has four functions that let you hook into the the test runner's
    // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

    // They're very useful to setup the environment for tests, and to clean it
    // up after they run.

    // A common pattern is to declare some variables, and assign them in the
    // `before` and `beforeEach` callbacks.

    let Token;
    let hardhatToken: Contract;
    let owner: SignerWithAddress;
    let addr1: SignerWithAddress;
    let addr2: SignerWithAddress;
    let addrs: SignerWithAddress[];

    // `beforeEach` will run before each test, re-deploying the contract every
    // time. It receives a callback, which can be async.
    beforeEach(async function () {
        // Get the ContractFactory and Signers here.
        Token = await ethers.getContractFactory("NFTToken");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        // To deploy our contract, we just have to call Token.deploy() and await
        // for it to be deployed(), which happens onces its transaction has been
        // mined.
        hardhatToken = await Token.deploy();
    });

    // You can nest describe calls to create subsections.
    describe("Deployment", function () {
        // `it` is another Mocha function. This is the one you use to define your
        // tests. It receives the test name, and a callback function.

        // If the callback function is async, Mocha will `await` it.
        it("Should set the right owner", async function () {
            // Expect receives a value, and wraps it in an Assertion object. These
            // objects have a lot of utility methods to assert values.

            // This test expects the owner variable stored in the contract to be equal
            // to our Signer's owner.
            expect(await hardhatToken.owner()).to.equal(owner.address);
        });

        it("Should Set Initial Token Supply To Zero", async function () {
            const factory = await ethers.getContractFactory("NFTToken");
            const phd = await factory.deploy();
            await phd.deployed();

            expect(await phd.totalSupply()).to.equal(0);
        });
    });

    describe("Transactions", function () {
        xit("Should transfer tokens between accounts", async function () {
            // Transfer 50 tokens from owner to addr1
            await hardhatToken.safeTransferFrom(
                addr1.address,
                addr2.address,
                1
            );
            const addr1Balance = await hardhatToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(50);

            // Transfer 50 tokens from addr1 to addr2
            // We use .connect(signer) to send a transaction from another account
            await hardhatToken.connect(addr1).transfer(addr2.address, 50);
            const addr2Balance = await hardhatToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);
        });

        xit("Should fail if sender doesn’t have enough tokens", async function () {
            const initialOwnerBalance = await hardhatToken.balanceOf(
                owner.address
            );

            // Try to send 1 token from addr1 (0 tokens) to owner (1000 tokens).
            // `require` will evaluate false and revert the transaction.
            await expect(
                hardhatToken.connect(addr1).transfer(owner.address, 1)
            ).to.be.revertedWith("Not enough tokens");

            // Owner balance shouldn't have changed.
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(
                initialOwnerBalance
            );
        });

        xit("Should update balances after transfers", async function () {
            const initialOwnerBalance = await hardhatToken.balanceOf(
                owner.address
            );

            // Transfer 100 tokens from owner to addr1.
            await hardhatToken.transfer(addr1.address, 100);

            // Transfer another 50 tokens from owner to addr2.
            await hardhatToken.transfer(addr2.address, 50);

            // Check balances.
            const finalOwnerBalance = await hardhatToken.balanceOf(
                owner.address
            );
            expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150);

            const addr1Balance = await hardhatToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(100);

            const addr2Balance = await hardhatToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);
        });
    });
});
