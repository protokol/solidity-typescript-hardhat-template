import { task } from "hardhat/config"
import * as fs from "fs"
import * as path from "path"

/**
 Example:
 hardhat find-eligible-vaults \
 --network mainnet
 */
task("find-eligible-vaults", "Find vaults deployed by Veda")
	.setAction(async (taskArgs, { ethers }) => {
        scanVaults();
})

function scanVaults() {
    // Fetch vaults
    const filePath = path.resolve(__dirname, '../../data/scannedVaults.json');
    let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    if(!data.scanned) {
        data.scanned = [];
    }

    let unsorted = []
    for (let i = 0; i < data.unchecked.length; i++) {
        data.scanned.push(data.unchecked[i]);
        unsorted.push("Test")
    }

    fs.writeFileSync(filePath, JSON.stringify(data));
}
