import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";

task(
    "block-number",
    "Prints the current block number",
    async (_, { ethers }) => {
        await ethers.provider.getBlockNumber().then((blockNumber) => {
            console.log("Current block number: " + blockNumber);
        });
    }
);

export default {
    solidity: "0.8.4",
};
