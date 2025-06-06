import { task } from "hardhat/config"
import * as fs from "fs"
import * as path from "path"

import tellerAbi from "../../externalArtifacts/teller.json"

// Addresses on mainnet
const USDT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const USDS_ADDRESS = "0xdC035D45d973E3EC169d2276DDab16f1e407384F";
const DAI_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

const SUPPORTED_TOKENS = [
    USDT_ADDRESS,
    USDC_ADDRESS,
    USDS_ADDRESS,
    DAI_ADDRESS
];

/**
 Example:
 hardhat filter-tellers \
 --network mainnet
 */
task("filter-tellers", "Given found tellers, filter by whether they support correct tokens")
    .setAction(async (taskArgs, { ethers }) => {
        const startTime = Date.now();

        // Fetch teller data
        const filteredTellersPath = path.resolve(__dirname, '../../data/filteredTellers.json');
        const allTellersPath = path.resolve(__dirname, '../../data/scannedTellers.json');

        const filteredTellersData = JSON.parse(fs.readFileSync(filteredTellersPath, 'utf-8'));
        let allTellersData = JSON.parse(fs.readFileSync(allTellersPath, 'utf-8'));

        initializeFilteredTellersData(filteredTellersData);

        // Find all unfiltered tellers
        const checkedTellersSet = new Set(filteredTellersData.supportingTellers.concat(filteredTellersData.unsupportingTellers).concat(filteredTellersData.invalidTellers));
        const uncheckedTellersSet = new Set<string>()
        for (const activeTeller of allTellersData.activeTellers) {
            if (!checkedTellersSet.has(activeTeller)) {
                uncheckedTellersSet.add(activeTeller);
            }
        }

        // Filter unfiltered tellers by whether they support all tokens in question
        for (const currentTeller of uncheckedTellersSet) {
            console.log(`Checking teller ${currentTeller}`);
            const tellerContract = await ethers.getContractAt(tellerAbi, currentTeller);

            let supportResult: boolean | undefined;
            for (const supportedAddress of SUPPORTED_TOKENS) {
                try {
                    supportResult = await tellerContract.isSupported(supportedAddress);
                } catch(error) {
                    break;
                }
                if (!supportResult) {
                    break;
                }
            }
            if (supportResult) {
                filteredTellersData.supportingTellers.push(currentTeller);
            } else if (supportResult === false) {
                filteredTellersData.unsupportingTellers.push(currentTeller);
            } else {
                filteredTellersData.invalidTellers.push(currentTeller);
            }
        }

        // Save the filtered tellers data
        fs.writeFileSync(filteredTellersPath, JSON.stringify(filteredTellersData));
    })

function initializeFilteredTellersData(data: any) {
    if (!data.supportingTellers) {
        data.supportingTellers = [];
    }

    if (!data.unsupportingTellers) {
        data.unsupportingTellers = [];
    }

    if (!data.invalidTellers) {
        data.invalidTellers = [];
    }
}
