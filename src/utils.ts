import { BigInt, Address, ethereum } from "@graphprotocol/graph-ts"
import { Hats } from "../generated/Hats/Hats"


export function hatLevel(contractAddress: Address, hatId: BigInt): i32 {
    let hatsContract = Hats.bind(contractAddress);
    return hatsContract.getHatLevel(hatId);
}

export function hatIdToHex(hatId: BigInt): string {
    return '0x' + hatId.toHexString().slice(2).padStart(64, '0');
}

export function hatIdToPrettyId(hatId: BigInt): string {
    let hexId = hatIdToHex(hatId);
    let prettyId = hexId.substring(0, 10);
    for (let i = 10; i < hexId.length; i += 2) {
        let domainAtLevel = hexId.substring(i, i + 2);
        if (domainAtLevel == "00") {
            break;
        }
        prettyId += "." + domainAtLevel;
    }
    return prettyId;
}

export function topHatDomain(hatId: BigInt): string {
    let hatIdHex = hatIdToHex(hatId);
    return hatIdHex.substring(0, 10);
}

export function createEventID(event: ethereum.Event, name: string): string {
    return name.concat('-').concat(event.block.number.toString()).concat('-').concat(event.logIndex.toString());
}

export function getHatAdmin(contractAddress: Address, hatId: BigInt, level: i32): string {
    let hatsContract = Hats.bind(contractAddress);
    let admin = hatsContract.getAdminAtLevel(hatId, level);
    return hatIdToHex(admin);
}

