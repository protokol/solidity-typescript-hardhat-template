import { expect } from "chai";
import { Signer } from "ethers";
import { deployments, ethers } from "hardhat";

import { NFTToken, NFTToken__factory } from "../typechain";

describe("NFTToken", function () {
    let accounts: Signer[];
    let nftTokenContract: NFTToken;

    beforeEach(async function () {
        accounts = await ethers.getSigners();

        const nftTokenFactory = (await ethers.getContractFactory(
            "NFTToken",
            accounts[0]
        )) as NFTToken__factory;

        nftTokenContract = await nftTokenFactory.deploy();
    });

    it("Should Increase Total Supply When Minting", async function () {
        expect(await nftTokenContract.totalSupply()).to.equal(0);

        await nftTokenContract.safeMint(
            "0xd1ed25240ecfa47fD2d46D34584c91935c89546c",
            "http://base1.uri/"
        );

        await nftTokenContract.safeMint(
            "0xd1ed25240ecfa47fD2d46D34584c91935c89546c",
            "http://base2.uri/"
        );

        await nftTokenContract.safeMint(
            "0xd1ed25240ecfa47fD2d46D34584c91935c89546c",
            "http://base3.uri/"
        );

        expect(await nftTokenContract.totalSupply()).to.equal(3);
    });
});
