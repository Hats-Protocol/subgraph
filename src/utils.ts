import { BigInt, Address, ethereum } from "@graphprotocol/graph-ts";
import { Hats } from "../generated/Hats/Hats";

export function hatLevel(contractAddress: Address, hatId: BigInt): i32 {
  let hatsContract = Hats.bind(contractAddress);
  return hatsContract.getHatLevel(hatId);
}

export function hatLevelLocal(hatId: BigInt): i32 {
  let prettyId = hatIdToPrettyId(hatId);
  if (prettyId.length == 10) {
    return 0;
  }
  return ((prettyId.length - 10) / 4);
}

export function hatIdToHex(hatId: BigInt): string {
  return "0x" + hatId.toHexString().slice(2).padStart(64, "0");
}

export function topHatDomainToHatId(domain: BigInt): string {
  let hexDomain = topHatDomainToHex(domain);
  return hexDomain.padEnd(66, "0");
}

export function hatIdToPrettyId(hatId: BigInt): string {
  let hexId = hatIdToHex(hatId);
  let prettyId = hexId.substring(0, 10);
  for (let i = 10; i < hexId.length; i += 4) {
    let domainAtLevel = hexId.substring(i, i + 4);
    if (domainAtLevel == "0000") {
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

export function topHatDomainToHex(domain: BigInt): string {
  return "0x" + domain.toHexString().slice(2).padStart(8, "0");
}

export function createEventID(event: ethereum.Event, name: string): string {
  return name
    .concat("-")
    .concat(event.block.number.toString())
    .concat("-")
    .concat(event.logIndex.toString());
}

export function getHatAdmin(
  contractAddress: Address,
  hatId: BigInt,
  level: i32
): string {
  let hatsContract = Hats.bind(contractAddress);
  let admin = hatsContract.getTreeAdminAtLevel(hatId, level);
  return hatIdToHex(admin);
}
