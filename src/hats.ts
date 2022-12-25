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
import {
  Hat,
  Wearer,
  Tree,
  HatCreatedEvent,
  HatMintedEvent,
  HatBurnedEvent,
  HatStatusChangedEvent,
  HatDetailsChangedEvent,
  HatEligibilityChangedEvent,
  HatToggleChangedEvent,
  HatMutabilityChangedEvent,
  HatMaxSupplyChangedEvent,
  HatImageURIChangedEvent
} from "../generated/schema"
import {
  hatLevel,
  hatIdToHex,
  topHatDomain,
  isTopHat,
  createEventID,
  getHatAdmin,
  hatIdToPrettyId
} from "./utils"


export function handleHatCreated(event: HatCreated): void {
  // create new hat
  let hat = new Hat(hatIdToPrettyId(event.params.id));
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
  hat.currentSupply = BigInt.fromU32(0);
  if (hat.level == 0) {
    hat.admin = hat.id;
  } else {
    hat.admin = getHatAdmin(event.address, event.params.id, hat.level - 1);
  }

  // if the hat is a top hat, create a new tree
  if (isTopHat(event.address, event.params.id)) {
    let tree = new Tree(topHatDomain(event.params.id))
    hat.tree = tree.id;
    tree.save();
  }
  else {
    hat.tree = topHatDomain(event.params.id);
  }
  hat.save();

  // create new HatCreatedEvent
  let hatCreatedEvent = new HatCreatedEvent(createEventID(event));
  hatCreatedEvent.blockNumber = event.block.number.toI32();
  hatCreatedEvent.timestamp = event.block.timestamp;
  hatCreatedEvent.transactionID = event.transaction.hash;
  hatCreatedEvent.hatId = hatIdToPrettyId(event.params.id);
  hatCreatedEvent.hatDetails = event.params.details;
  hatCreatedEvent.hatMaxSupply = event.params.maxSupply;
  hatCreatedEvent.hatEligibility = event.params.eligibility.toHexString();
  hatCreatedEvent.hatToggle = event.params.toggle.toHexString();
  hatCreatedEvent.hatMutable = event.params.mutable_;
  hatCreatedEvent.hatImageUri = event.params.imageURI;
  hatCreatedEvent.tree = topHatDomain(event.params.id);
  hatCreatedEvent.hat = hatIdToPrettyId(event.params.id);
  hatCreatedEvent.save();
}

export function handleHatDetailsChanged(event: HatDetailsChanged): void {
  // load hat and update the details field
  let hat = Hat.load(hatIdToPrettyId(event.params.hatId)) as Hat;
  hat.details = event.params.newDetails;
  hat.save();

  // create new HatDetailsChangedEvent 
  let hatDetailsChangedEvent = new HatDetailsChangedEvent(createEventID(event));
  hatDetailsChangedEvent.blockNumber = event.block.number.toI32();
  hatDetailsChangedEvent.timestamp = event.block.timestamp;
  hatDetailsChangedEvent.transactionID = event.transaction.hash;
  hatDetailsChangedEvent.hatId = hatIdToPrettyId(event.params.hatId);
  hatDetailsChangedEvent.hatNewDetails = event.params.newDetails;
  hatDetailsChangedEvent.tree = topHatDomain(event.params.hatId);
  hatDetailsChangedEvent.hat = hatIdToPrettyId(event.params.hatId);
  hatDetailsChangedEvent.save();
}

export function handleHatEligibilityChanged(
  event: HatEligibilityChanged
): void {
  // load hat and update the eligibility field
  let hat = Hat.load(hatIdToPrettyId(event.params.hatId)) as Hat;
  hat.eligibility = event.params.newEligibility.toHexString();
  hat.save();

  // create new HatEligibilityChangedEvent 
  let hatEligibilityChangedEvent = new HatEligibilityChangedEvent(createEventID(event));
  hatEligibilityChangedEvent.blockNumber = event.block.number.toI32();
  hatEligibilityChangedEvent.timestamp = event.block.timestamp;
  hatEligibilityChangedEvent.transactionID = event.transaction.hash;
  hatEligibilityChangedEvent.hatId = hatIdToPrettyId(event.params.hatId);
  hatEligibilityChangedEvent.hatNewEligibility = event.params.newEligibility.toHexString();
  hatEligibilityChangedEvent.tree = topHatDomain(event.params.hatId);
  hatEligibilityChangedEvent.hat = hatIdToPrettyId(event.params.hatId);
  hatEligibilityChangedEvent.save();
}

export function handleHatImageURIChanged(event: HatImageURIChanged): void {
  // load hat and update the imageUri field
  let hat = Hat.load(hatIdToPrettyId(event.params.hatId)) as Hat;
  hat.imageUri = event.params.newImageURI;
  hat.save();

  // create new HatImageURIChangedEvent 
  let hatImageURIChangedEvent = new HatImageURIChangedEvent(createEventID(event));
  hatImageURIChangedEvent.blockNumber = event.block.number.toI32();
  hatImageURIChangedEvent.timestamp = event.block.timestamp;
  hatImageURIChangedEvent.transactionID = event.transaction.hash;
  hatImageURIChangedEvent.hatId = hatIdToPrettyId(event.params.hatId);
  hatImageURIChangedEvent.hatNewImageURI = event.params.newImageURI;
  hatImageURIChangedEvent.tree = topHatDomain(event.params.hatId);
  hatImageURIChangedEvent.hat = hatIdToPrettyId(event.params.hatId);
  hatImageURIChangedEvent.save();
}

export function handleHatMaxSupplyChanged(event: HatMaxSupplyChanged): void {
  // load hat and update the maxSupply field
  let hat = Hat.load(hatIdToPrettyId(event.params.hatId)) as Hat;
  hat.maxSupply = event.params.newMaxSupply;
  hat.save();

  // create new HatMaxSupplyChangedEvent 
  let hatMaxSupplyChangedEvent = new HatMaxSupplyChangedEvent(createEventID(event));
  hatMaxSupplyChangedEvent.blockNumber = event.block.number.toI32();
  hatMaxSupplyChangedEvent.timestamp = event.block.timestamp;
  hatMaxSupplyChangedEvent.transactionID = event.transaction.hash;
  hatMaxSupplyChangedEvent.hatId = hatIdToPrettyId(event.params.hatId);
  hatMaxSupplyChangedEvent.hatNewMaxSupply = event.params.newMaxSupply;
  hatMaxSupplyChangedEvent.tree = topHatDomain(event.params.hatId);
  hatMaxSupplyChangedEvent.hat = hatIdToPrettyId(event.params.hatId);
  hatMaxSupplyChangedEvent.save();
}

export function handleHatMutabilityChanged(event: HatMutabilityChanged): void {
  // load hat and update the mutability field
  let hat = Hat.load(hatIdToPrettyId(event.params.hatId)) as Hat;
  hat.mutable = false;
  hat.save();

  // create new HatMaxSupplyChangedEvent 
  let hatMutabilityChangedEvent = new HatMutabilityChangedEvent(createEventID(event));
  hatMutabilityChangedEvent.blockNumber = event.block.number.toI32();
  hatMutabilityChangedEvent.timestamp = event.block.timestamp;
  hatMutabilityChangedEvent.transactionID = event.transaction.hash;
  hatMutabilityChangedEvent.hatId = hatIdToPrettyId(event.params.hatId);
  hatMutabilityChangedEvent.tree = topHatDomain(event.params.hatId);
  hatMutabilityChangedEvent.hat = hatIdToPrettyId(event.params.hatId);
  hatMutabilityChangedEvent.save();
}

export function handleHatStatusChanged(event: HatStatusChanged): void {
  // load hat and update the status field
  let hat = Hat.load(hatIdToPrettyId(event.params.hatId)) as Hat;
  hat.status = event.params.newStatus;
  hat.save();

  // create new HatStatusChangedEvent 
  let hatStatusChangedEvent = new HatStatusChangedEvent(createEventID(event));
  hatStatusChangedEvent.blockNumber = event.block.number.toI32();
  hatStatusChangedEvent.timestamp = event.block.timestamp;
  hatStatusChangedEvent.transactionID = event.transaction.hash;
  hatStatusChangedEvent.hatId = hatIdToPrettyId(event.params.hatId);
  hatStatusChangedEvent.hatNewStatus = event.params.newStatus;
  hatStatusChangedEvent.tree = topHatDomain(event.params.hatId);
  hatStatusChangedEvent.hat = hatIdToPrettyId(event.params.hatId);
  hatStatusChangedEvent.save();
}

export function handleHatToggleChanged(event: HatToggleChanged): void {
  // load hat and update the toggle field
  let hat = Hat.load(hatIdToPrettyId(event.params.hatId)) as Hat;
  hat.toggle = event.params.newToggle.toHexString();
  hat.save();

  // create new HatToggleChangedEvent 
  let hatToggleChangedEvent = new HatToggleChangedEvent(createEventID(event));
  hatToggleChangedEvent.blockNumber = event.block.number.toI32();
  hatToggleChangedEvent.timestamp = event.block.timestamp;
  hatToggleChangedEvent.transactionID = event.transaction.hash;
  hatToggleChangedEvent.hatId = hatIdToPrettyId(event.params.hatId);
  hatToggleChangedEvent.hatNewToggle = event.params.newToggle.toHexString();
  hatToggleChangedEvent.tree = topHatDomain(event.params.hatId);
  hatToggleChangedEvent.hat = hatIdToPrettyId(event.params.hatId);
  hatToggleChangedEvent.save();
}

export function handleTransferSingle(event: TransferSingle): void {
  let hat = Hat.load(hatIdToPrettyId(event.params.id)) as Hat;
  if (event.params.from != Address.zero() && event.params.to != Address.zero()) { //transfer event
    giveHat(hat, event);
    removeHat(hat, event);
  }
  else if (event.params.from == Address.zero() && event.params.to != Address.zero()) { // mint event
    giveHat(hat, event);
  }
  else if (event.params.from != Address.zero() && event.params.to == Address.zero()) { // burn event
    removeHat(hat, event);
  }
}

function giveHat(hat: Hat, event: TransferSingle): void {
  // if wearer not exist, create new
  let to = Wearer.load(event.params.to.toHexString());
  if (to == null) {
    to = new Wearer(event.params.to.toHexString());
    to.save();
  }

  // push wearer to the wearers array on the hat object
  let wearers = hat.wearers;
  wearers.push(to.id);
  hat.wearers = wearers;
  hat.currentSupply = hat.currentSupply.plus(BigInt.fromU32(1));
  hat.save();

  // create new HatMintedEvent 
  let hatMintedEvent = new HatMintedEvent(createEventID(event));
  hatMintedEvent.blockNumber = event.block.number.toI32();
  hatMintedEvent.timestamp = event.block.timestamp;
  hatMintedEvent.transactionID = event.transaction.hash;
  hatMintedEvent.hatId = hatIdToPrettyId(event.params.id);
  hatMintedEvent.wearer = to.id;
  hatMintedEvent.operator = event.params.operator.toHexString();
  hatMintedEvent.tree = topHatDomain(event.params.id);
  hatMintedEvent.hat = hatIdToPrettyId(event.params.id);
  hatMintedEvent.save();
}

function removeHat(hat: Hat, event: TransferSingle): void {
  // remove the wearer from the hat wearers array
  let from = Wearer.load(event.params.from.toHexString()) as Wearer;
  let currentWearers = hat.wearers;
  let index = currentWearers.indexOf(from.id);
  currentWearers.splice(index, 1);
  hat.wearers = currentWearers;
  hat.currentSupply = hat.currentSupply.minus(BigInt.fromU32(1));
  hat.save();

  // create new HatBurnedEvent 
  let hatBurnedEvent = new HatBurnedEvent(createEventID(event));
  hatBurnedEvent.blockNumber = event.block.number.toI32();
  hatBurnedEvent.timestamp = event.block.timestamp;
  hatBurnedEvent.transactionID = event.transaction.hash;
  hatBurnedEvent.hatId = hatIdToPrettyId(event.params.id);
  hatBurnedEvent.wearer = from.id;
  hatBurnedEvent.operator = event.params.operator.toHexString();
  hatBurnedEvent.tree = topHatDomain(event.params.id);
  hatBurnedEvent.hat = hatIdToPrettyId(event.params.id);
  hatBurnedEvent.save();
}

