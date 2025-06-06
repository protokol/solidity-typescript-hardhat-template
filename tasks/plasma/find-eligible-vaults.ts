import { task } from "hardhat/config"
import * as fs from "fs"
import * as path from "path"

import boringVaultAbi from "../../externalArtifacts/boringVault.json"

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

    initializeData(data);

    // Sort unchecked vaults by whether they have existing deposits
    for (let i = 0; i < data.unchecked.length; i++) {
        const vaultContract = await ethers.getContractAt(boringVaultAbi, data.unchecked[i]);

        // console.log('enter() function signature: ', vaultContract.interface.getFunction('enter')!.format());
        // console.log('enter selector: ', vaultContract.interface.getFunction('enter')!.selector);
        // throw new Error('done');
        if ((await vaultContract.totalSupply()) > 0) {
            console.log(`Moving vault ${data.unchecked[i]} to existing deposits`);
            data.existingDeposits.push(data.unchecked[i]);
        } else {
            console.log(`Moving vault ${data.unchecked[i]} to valid unchecked vaults`);
            data.validUncheckedVaults.push(data.unchecked[i]);
        }
    }
    data.unchecked = [];


    // Sort vaults without deposits by whether they have an authority set. Record authorities
    if (data.validUncheckedVaults.length > 0) {
        let authorityAddresses: Set<string> = new Set(data.authorityAddresses || []);
        for (let i = 0; i < data.validUncheckedVaults.length; i++) {
            const vaultContract = await ethers.getContractAt(boringVaultAbi, data.validUncheckedVaults[i]);
            const authorityAddress = await vaultContract.authority();
            if (authorityAddress.toLowerCase() === ethers.ZeroAddress.toLowerCase()) {
                console.log(`Vault ${data.validUncheckedVaults[i]} has no authority set, moving to inactive vaults`);
                data.inactiveVaults.push(data.validUncheckedVaults[i]);
            } else {
                console.log(`Vault ${data.validUncheckedVaults[i]} has authority set to ${authorityAddress}, checking for mint role`);
                data.validCheckedVaults.push(data.validUncheckedVaults[i]);
                authorityAddresses.add(authorityAddress);
            }
        }
        data.validUncheckedVaults = [];
        data.authorityAddresses = Array.from(authorityAddresses);
    }

    fs.writeFileSync(filePath, JSON.stringify(data));
})

function initializeData(data: any) {
    if(!data.existingDeposits) {
        data.existingDeposits = [];
    }

    if (!data.validUncheckedVaults) {
        data.validUncheckedVaults = [];
    }

    if (!data.validCheckedVaults) {
        data.validCheckedVaults = [];
    }

    if (!data.unchecked) {
        data.unchecked = [];
    }

    if (!data.inactiveVaults) {
        data.inactiveVaults = [];
    }
}
