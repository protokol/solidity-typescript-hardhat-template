import { task } from "hardhat/config"
import * as fs from "fs"
import * as path from "path"

import boringVaultAbi from "../../externalArtifacts/boringVault.json"
import rolesAuthorityAbi from "../../externalArtifacts/rolesAuthority.json"

const mintRole = 2;

// Block as of time this code was written
const CURRENT_BLOCK = 22_647_887
const BLOCKS_IN_SIX_MONTHS = Math.round(86_400 * 182 / 12) // 6 months in seconds, divided by average block time of 12 seconds
const FIRST_BLOCK = CURRENT_BLOCK - BLOCKS_IN_SIX_MONTHS    // Arbitrary starting point, before which the Plasma teller probably was not deployed

const DEFAULT_SEARCH_BLOCK_COUNT = 500; // Default number of blocks to search for tellers at a time
const DEFAULT_SEARCH_REPETITIONS = 50; // Default number of times to repeat the search for tellers

/**
 Example:
 hardhat find-tellers \
 --network mainnet
 */
task("find-tellers", "Given an array of valid authorities, find tellers associated with those authorities with permissions to mint tokens")
    .setAction(async (taskArgs, { ethers }) => {
        const startTime = Date.now();

        // Fetch vaults
        const vaultsPath = path.resolve(__dirname, '../../data/scannedVaults.json');
        const tellersPath = path.resolve(__dirname, '../../data/scannedTellers.json');

        const vaultData = JSON.parse(fs.readFileSync(vaultsPath, 'utf-8'));
        let tellersData = JSON.parse(fs.readFileSync(tellersPath, 'utf-8'));

        initializeTellersData(tellersData);

        const sampleAuthority = await ethers.getContractAt(rolesAuthorityAbi, vaultData.authorityAddresses[0]);
        const roleUpdateTopicHash = sampleAuthority.interface.getEvent("UserRoleUpdated")!.topicHash;

        let activeTellers: Set<string> = new Set(tellersData.activeTellers);
        let inactiveTellers: Set<string> = new Set(tellersData.inactiveTellers);
        for (let i = 0; i < DEFAULT_SEARCH_REPETITIONS; i++) {
            console.log(`Searching for tellers in blocks ${tellersData.lastScannedBlock + 1 + i * DEFAULT_SEARCH_BLOCK_COUNT} to ${tellersData.lastScannedBlock + (i + 1) * DEFAULT_SEARCH_BLOCK_COUNT}`);

            for (let authorityAddress of vaultData.authorityAddresses) {
                const logs = await ethers.provider.getLogs({
                    address: authorityAddress,
                    fromBlock: tellersData.lastScannedBlock + 1,
                    toBlock: tellersData.lastScannedBlock + DEFAULT_SEARCH_BLOCK_COUNT,
                    topics: [
                        roleUpdateTopicHash
                    ],
                });

                for (const log of logs) {
                    const parsedLog = sampleAuthority.interface.parseLog({
                        topics: log.topics as string[],
                        data: log.data,
                    })!;
                    if (parsedLog.args.role != mintRole) {
                        console.log('Found role update for non-mint role, skipping');
                        continue
                    }
                    if (parsedLog.args.enabled) {
                        console.log('role granted to ', parsedLog.args.user);
                        inactiveTellers.delete(parsedLog.args.user);
                        activeTellers.add(parsedLog.args.user);
                    } else {
                        console.log('role revoked from ', parsedLog.args.user);
                        activeTellers.delete(parsedLog.args.user);
                        inactiveTellers.add(parsedLog.args.user);
                    }
                }
            }
        }

        // Update last scanned block
        tellersData.lastScannedBlock = tellersData.lastScannedBlock + DEFAULT_SEARCH_BLOCK_COUNT;

        // Update active and inactive tellers
        tellersData.activeTellers = Array.from(activeTellers);
        tellersData.inactiveTellers = Array.from(inactiveTellers);

        fs.writeFileSync(tellersPath, JSON.stringify(tellersData));

        const endTime = Date.now();
        console.log(`scanned ${DEFAULT_SEARCH_BLOCK_COUNT * DEFAULT_SEARCH_REPETITIONS} blocks in ${((endTime - startTime) / 1000).toFixed(2)} seconds`);
    })

function initializeTellersData(data: any) {
    if (!data.lastScannedBlock || data.lastScannedBlock < FIRST_BLOCK - 1) {
        data.lastScannedBlock = FIRST_BLOCK - 1;
    }

    if (!data.activeTellers) {
        data.activeTellers = [];
    }

    if (!data.inactiveTellers) {
        data.inactiveTellers = [];
    }
}
