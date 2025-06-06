import { task } from "hardhat/config"
import * as fs from "fs"
import * as path from "path"

import boringVaultArtifact from "../../externalArtifacts/boringVault.json"

/**
 Example:
 hardhat find-eligible-vaults \
 --network mainnet
 */
task("find-eligible-vaults", "Find vaults deployed by Veda")
	.setAction(async (taskArgs, { ethers }) => {
    // Fetch vaults
    const filePath = path.resolve(__dirname, '../../data/scannedVaults.json');
    let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    if(!data.scanned) {
        data.scanned = [];
    }

    if(!data.existingDeposits) {
        data.existingDeposits = [];
    }

    let newUnchecked = [];
    for (let i = 0; i < data.unchecked.length; i++) {
        const vaultContract = await ethers.getContractAt(boringVaultArtifact, data.unchecked[i]);
        if ((await vaultContract.totalSupply()) > 0) {
            data.existingDeposits.push(data.unchecked[i]);
        } else {
            newUnchecked.push(data.unchecked[i]);
        }
    }

    data.unchecked = newUnchecked;

    fs.writeFileSync(filePath, JSON.stringify(data));
})
