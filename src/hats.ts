import { BigInt, Address } from "@graphprotocol/graph-ts"
import {
  Hats,
  HatCreated,
  HatDetailsChanged,
  HatEligibilityChanged,
  HatImageURIChanged,
  HatMaxSupplyChanged,
  HatMutabilityChanged,
  HatStatusChanged,
  HatToggleChanged,
  TransferSingle
} from "../generated/Hats/Hats"
import { Hat, Wearer, Tree } from "../generated/schema"
import { hatLevel, hatIdToHex, topHatDomain, isTopHat } from "./utils"


export function handleHatCreated(event: HatCreated): void {
  let hat = new Hat(hatIdToHex(event.params.id));
  hat.createdAt = event.block.timestamp;
  hat.wearers = [];
  hat.details = event.params.details;
  hat.maxSupply = event.params.maxSupply;
  hat.eligibility = event.params.eligibility.toHexString();
  hat.toggle = event.params.toggle.toHexString();
  hat.mutable = event.params.mutable_;
  hat.imageUri = event.params.imageURI;
  hat.status = true;
  hat.level = hatLevel(event.address, event.params.id);

  if (isTopHat(event.address, event.params.id)) {
    let tree = new Tree(topHatDomain(event.params.id))
    hat.tree = tree.id;
    tree.save();
  }
  else {
    hat.tree = topHatDomain(event.params.id);
  }
  hat.save();
}

export function handleHatDetailsChanged(event: HatDetailsChanged): void {
  let hat = Hat.load(hatIdToHex(event.params.hatId)) as Hat;
  hat.details = event.params.newDetails;
  hat.save();
}

export function handleHatEligibilityChanged(
  event: HatEligibilityChanged
): void {
  let hat = Hat.load(hatIdToHex(event.params.hatId)) as Hat;
  hat.eligibility = event.params.newEligibility.toHexString();
  hat.save();
}

export function handleHatImageURIChanged(event: HatImageURIChanged): void {
  let hat = Hat.load(hatIdToHex(event.params.hatId)) as Hat;
  hat.imageUri = event.params.newImageURI;
  hat.save();
}

export function handleHatMaxSupplyChanged(event: HatMaxSupplyChanged): void {
  let hat = Hat.load(hatIdToHex(event.params.hatId)) as Hat;
  hat.maxSupply = event.params.newMaxSupply;
  hat.save();
}

export function handleHatMutabilityChanged(event: HatMutabilityChanged): void {
  let hat = Hat.load(hatIdToHex(event.params.hatId)) as Hat;
  hat.mutable = false;
  hat.save();
}

export function handleHatStatusChanged(event: HatStatusChanged): void {
  let hat = Hat.load(hatIdToHex(event.params.hatId)) as Hat;
  hat.status = event.params.newStatus;
  hat.save();
}

export function handleHatToggleChanged(event: HatToggleChanged): void {
  let hat = Hat.load(hatIdToHex(event.params.hatId)) as Hat;
  hat.toggle = event.params.newToggle.toHexString();
  hat.save();
}

export function handleTransferSingle(event: TransferSingle): void {
  let hat = Hat.load(hatIdToHex(event.params.id)) as Hat;
  if (event.params.to != Address.zero()) {
    giveHat(hat, event);
  }
  if (event.params.from != Address.zero()) {
    removeHat(hat, event);
  }
}

function giveHat(hat: Hat, event: TransferSingle): void {
  let to = Wearer.load(event.params.to.toHexString());
  if (to == null) {
    to = new Wearer(event.params.to.toHexString());
    to.save();
  }
  let wearers = hat.wearers;
  wearers.push(to.id);
  hat.wearers = wearers;
  hat.save();
}

function removeHat(hat: Hat, event: TransferSingle): void {
  let from = Wearer.load(event.params.from.toHexString()) as Wearer;
  let index = hat.wearers.indexOf(from.id);
  hat.wearers.splice(index, 1);
  hat.save();
}

