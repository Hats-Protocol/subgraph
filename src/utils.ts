import { BigInt, Address } from "@graphprotocol/graph-ts"
import { Hats } from "../generated/Hats/Hats"


export function hatLevel(contractAddress: Address, hatId: BigInt): i32 {
    let hatsContract = Hats.bind(contractAddress);
    return hatsContract.getHatLevel(hatId);
}

export function isTopHat(contractAddress: Address, hatId: BigInt): boolean {
    let hatsContract = Hats.bind(contractAddress);
    return hatsContract.isTopHat(hatId);
}

export function hatIdToHex(hatId: BigInt): string {
    return '0x' + hatId.toHexString().slice(2).padStart(64, '0');
}

export function topHatDomain(hatId: BigInt): string {
    let hatIdHex = hatIdToHex(hatId);
    return hatIdHex.substring(0, 10);
}
