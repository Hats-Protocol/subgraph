//import { log } from "@graphprotocol/graph-ts";
import {
  HatsClaimabilityEdited,
  HatClaimabilityEdited,
} from "../generated/templates/MultiClaimsHatter/MultiClaimsHatter";
import { ClaimsHatter } from "../generated/schema";
import { hatIdToHex } from "./utils";

export function handleHatClaimabilityEdited(
  event: HatClaimabilityEdited
): void {
  const claimsHatter = ClaimsHatter.load(
    event.address.toHexString()
  ) as ClaimsHatter;

  const hatId = hatIdToHex(event.params.hatId);
  const hatIsCurrentlyClaimable = claimsHatter.claimableHats.includes(hatId);
  const hatIsCurrentlyClaimableFor =
    claimsHatter.claimableForHats.includes(hatId);

  if (event.params.claimType == 0) {
    if (hatIsCurrentlyClaimable) {
      removeClaimableHat(claimsHatter, hatId);
    }
    if (hatIsCurrentlyClaimableFor) {
      removeClaimableForHat(claimsHatter, hatId);
    }
  } else if (event.params.claimType == 1) {
    if (!hatIsCurrentlyClaimable) {
      addClaimableHat(claimsHatter, hatId);
    }
    if (hatIsCurrentlyClaimableFor) {
      removeClaimableForHat(claimsHatter, hatId);
    }
  } else if (event.params.claimType == 2) {
    if (!hatIsCurrentlyClaimable) {
      addClaimableHat(claimsHatter, hatId);
    }
    if (!hatIsCurrentlyClaimableFor) {
      addClaimableForHat(claimsHatter, hatId);
    }
  }

  claimsHatter.save();
}

export function handleHatsClaimabilityEdited(
  event: HatsClaimabilityEdited
): void {
  const claimsHatter = ClaimsHatter.load(
    event.address.toHexString()
  ) as ClaimsHatter;

  for (let i = 0; i < event.params.hatIds.length; i++) {
    const hatId = hatIdToHex(event.params.hatIds[i]);
    const hatIsCurrentlyClaimable = claimsHatter.claimableHats.includes(hatId);
    const hatIsCurrentlyClaimableFor =
      claimsHatter.claimableForHats.includes(hatId);

    if (event.params.claimTypes[i] == 0) {
      if (hatIsCurrentlyClaimable) {
        removeClaimableHat(claimsHatter, hatId);
      }
      if (hatIsCurrentlyClaimableFor) {
        removeClaimableForHat(claimsHatter, hatId);
      }
    } else if (event.params.claimTypes[i] == 1) {
      if (!hatIsCurrentlyClaimable) {
        addClaimableHat(claimsHatter, hatId);
      }
      if (hatIsCurrentlyClaimableFor) {
        removeClaimableForHat(claimsHatter, hatId);
      }
    } else if (event.params.claimTypes[i] == 2) {
      if (!hatIsCurrentlyClaimable) {
        addClaimableHat(claimsHatter, hatId);
      }
      if (!hatIsCurrentlyClaimableFor) {
        addClaimableForHat(claimsHatter, hatId);
      }
    }
  }

  claimsHatter.save();
}

function removeClaimableHat(claimsHatter: ClaimsHatter, hatId: string): void {
  const currentClaimableHats = claimsHatter.claimableHats;
  const index = currentClaimableHats.indexOf(hatId);
  currentClaimableHats.splice(index, 1);
  claimsHatter.claimableHats = currentClaimableHats;
}

function removeClaimableForHat(
  claimsHatter: ClaimsHatter,
  hatId: string
): void {
  const currentClaimableForHats = claimsHatter.claimableForHats;
  const index = currentClaimableForHats.indexOf(hatId);
  currentClaimableForHats.splice(index, 1);
  claimsHatter.claimableForHats = currentClaimableForHats;
}

function addClaimableHat(claimsHatter: ClaimsHatter, hatId: string): void {
  const currentClaimableHats = claimsHatter.claimableHats;
  currentClaimableHats.push(hatId);
  claimsHatter.claimableHats = currentClaimableHats;
}

function addClaimableForHat(claimsHatter: ClaimsHatter, hatId: string): void {
  const currentClaimableForHats = claimsHatter.claimableForHats;
  currentClaimableForHats.push(hatId);
  claimsHatter.claimableForHats = currentClaimableForHats;
}
