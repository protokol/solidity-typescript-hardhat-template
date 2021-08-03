import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";

task("create-collectibles", "Creates a new collectible item")
    .addParam("supply", "Number of Tokens To Generate")
    .addOptionalParam("contract", "The address of the ERC721 contract")
    .setAction(async (taskArgs, hre) => {
        const contractAddr =
            taskArgs.contract || process.env.NFT_CONTRACT_ADDRESS;
        const supply = taskArgs.supply;
        const ipfsFolderCID = process.env.IPFS_FOLDER_CID;

        console.log(
            `Creating ${supply} Collectibles via contract: ${contractAddr}  on network ${hre.network.name}`
        );
        const nftFactory = await hre.ethers.getContractFactory("NFTToken");

        // Get signer information
        const accounts = await hre.ethers.getSigners();
        const signer = accounts[0];

        const nftTokenContract = new hre.ethers.Contract(
            contractAddr,
            nftFactory.interface,
            signer
        );
        for (let i = 0; i < supply; i++) {
            const tokenURI = `https://ipfs.io/ipfs/${ipfsFolderCID}/${i}.json`;
            const createCollectibleTx = await nftTokenContract.safeMint(
                signer.address,
                tokenURI
            );
            console.log(
                `Contract ${contractAddr} created new item with tokenURI ${tokenURI}. Transaction Hash: ${createCollectibleTx.hash}`
            );
            // const transactionReceip = await createCollectibleTx.wait(2)
            // console.log(transactionReceip)
        }
    });

export default {
    solidity: "0.8.4",
};
