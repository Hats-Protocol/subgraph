import { BigInt, Address, log, Bytes, ethereum } from "@graphprotocol/graph-ts";
import { HatsModuleFactory_ModuleDeployed } from "../generated/HatsModuleFactory/HatsModuleFactory";
import {
  HatsClaimabilityEdited,
  HatClaimabilityEdited,
} from "../generated/templates/MultiClaimsHatter/MultiClaimsHatter";
import { Hat, ClaimsHatter } from "../generated/schema";
import {
  hatIdToHex,
  topHatDomain,
  createEventID,
  getHatAdmin,
  hatIdToPrettyId,
  topHatDomainToHex,
  topHatDomainToHatId,
  hatLevelLocal,
  hatIdHexToPrettyId,
  hexTopHatDomain,
  topHatDomainHexToHatId,
  changeEndianness,
} from "./utils";
import { MultiClaimsHatter } from "../generated/templates";

export function handleHatClaimabilityEdited(
  event: HatClaimabilityEdited
): void {
  let claimsHatter = ClaimsHatter.load(
    event.address.toHexString()
  ) as ClaimsHatter;

  const hatId = hatIdToHex(event.params.hatId);
  const hatIsCurrentlyClaimable = claimsHatter.claimableHats.includes(hatId);
  const hatIsCurrentlyClaimableFor =
    claimsHatter.claimableForHats.includes(hatId);

  if (event.params.claimType === 0) {
    if (hatIsCurrentlyClaimable) {
      removeClaimableHat(claimsHatter, hatId);
    }
    if (hatIsCurrentlyClaimableFor) {
      removeClaimableForHat(claimsHatter, hatId);
    }
  } else if (event.params.claimType === 1) {
  }

  claimsHatter.save();
}

function removeClaimableHat(claimsHatter: ClaimsHatter, hatId: string) {
  const currentClaimableHats = claimsHatter.claimableHats;
  let index = currentClaimableHats.indexOf(hatId);
  currentClaimableHats.splice(index, 1);
  claimsHatter.claimableHats = currentClaimableHats;
}

function removeClaimableForHat(claimsHatter: ClaimsHatter, hatId: string) {
  const currentClaimableForHats = claimsHatter.claimableForHats;
  let index = currentClaimableForHats.indexOf(hatId);
  currentClaimableForHats.splice(index, 1);
  claimsHatter.claimableForHats = currentClaimableForHats;
}

function addClaimableHat(claimsHatter: ClaimsHatter, hatId: string) {
  const currentClaimableHats = claimsHatter.claimableHats;
  let index = currentClaimableHats.indexOf(hatId);
  currentClaimableHats.splice(index, 1);
  claimsHatter.claimableHats = currentClaimableHats;
}
