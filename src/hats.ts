import {
  BigInt,
  Address,
  log,
  Bytes,
  dataSource,
  json,
  JSONValue,
  DataSourceContext,
} from "@graphprotocol/graph-ts";
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
  TransferSingle,
  TopHatLinkRequested,
  TopHatLinked,
  WearerStandingChanged,
} from "../generated/Hats/Hats";
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
  HatImageURIChangedEvent,
  TopHatLinkRequestedEvent,
  TopHatLinkedEvent,
  WearerStandingChangedEvent,
  HatDetailsMetadata,
} from "../generated/schema";
import { HatDetailsMetadata as HatDetailsMetadataTemplate } from "../generated/templates";
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

export function handleHatCreated(event: HatCreated): void {
  // create new hat
  let hat = new Hat(hatIdToHex(event.params.id));
  hat.prettyId = hatIdToPrettyId(event.params.id);
  hat.createdAt = event.block.timestamp;
  hat.wearers = [];
  hat.details = event.params.details;
  hat.maxSupply = event.params.maxSupply;
  hat.eligibility = event.params.eligibility.toHexString();
  hat.toggle = event.params.toggle.toHexString();
  hat.mutable = event.params.mutable_;
  hat.imageUri = event.params.imageURI;
  hat.status = true;
  hat.levelAtLocalTree = hatLevelLocal(event.address, event.params.id);
  hat.currentSupply = BigInt.fromU32(0);
  hat.badStandings = [];

  // handle hat metadata
  if (hat.details.slice(0, 7) == "ipfs://") {
    const cid = hat.details.slice(7);
    let context = new DataSourceContext();
    context.setString("hatId", hatIdToHex(event.params.id));
    context.setString("cid", cid);
    //hat.detailsMetadata = cid;
    HatDetailsMetadataTemplate.createWithContext(cid, context);
  }

  if (hat.levelAtLocalTree == 0) {
    // top hat is its own admin
    hat.admin = hat.id;
    // create a new tree
    let tree = new Tree(topHatDomain(event.params.id));
    tree.linkedToHat = null;
    tree.childOfTree = null;
    hat.tree = tree.id;
    tree.save();
  } else {
    let adminId = getHatAdmin(
      event.address,
      event.params.id,
      hat.levelAtLocalTree - 1
    );
    let adminHat = Hat.load(adminId);
    // if admin hat dont exist, create dummy hats for any non existent hat along the admin chain
    if (adminHat === null) {
      createDummyHats(adminId, event.address);
    }
    hat.admin = adminId;
    hat.tree = topHatDomain(event.params.id);
  }

  hat.save();

  // create new HatCreatedEvent
  let hatCreatedEvent = new HatCreatedEvent(createEventID(event, "HatCreated"));
  hatCreatedEvent.blockNumber = event.block.number.toI32();
  hatCreatedEvent.timestamp = event.block.timestamp;
  hatCreatedEvent.transactionID = event.transaction.hash;
  hatCreatedEvent.hatDetails = event.params.details;
  hatCreatedEvent.hatMaxSupply = event.params.maxSupply;
  hatCreatedEvent.hatEligibility = event.params.eligibility.toHexString();
  hatCreatedEvent.hatToggle = event.params.toggle.toHexString();
  hatCreatedEvent.hatMutable = event.params.mutable_;
  hatCreatedEvent.hatImageUri = event.params.imageURI;
  hatCreatedEvent.tree = topHatDomain(event.params.id);
  hatCreatedEvent.hat = hatIdToHex(event.params.id);
  hatCreatedEvent.save();
}

export function handleHatDetailsChanged(event: HatDetailsChanged): void {
  // load hat and update the details field
  let hat = Hat.load(hatIdToHex(event.params.hatId)) as Hat;
  hat.details = event.params.newDetails;
  hat.save();

  // create new HatDetailsChangedEvent
  let hatDetailsChangedEvent = new HatDetailsChangedEvent(
    createEventID(event, "HatDetailsChanged")
  );
  hatDetailsChangedEvent.blockNumber = event.block.number.toI32();
  hatDetailsChangedEvent.timestamp = event.block.timestamp;
  hatDetailsChangedEvent.transactionID = event.transaction.hash;
  hatDetailsChangedEvent.hatNewDetails = event.params.newDetails;
  hatDetailsChangedEvent.tree = topHatDomain(event.params.hatId);
  hatDetailsChangedEvent.hat = hatIdToHex(event.params.hatId);
  hatDetailsChangedEvent.save();
}

export function handleHatEligibilityChanged(
  event: HatEligibilityChanged
): void {
  // load hat and update the eligibility field
  let hat = Hat.load(hatIdToHex(event.params.hatId)) as Hat;
  hat.eligibility = event.params.newEligibility.toHexString();
  hat.save();

  // create new HatEligibilityChangedEvent
  let hatEligibilityChangedEvent = new HatEligibilityChangedEvent(
    createEventID(event, "HatEligibilityChanged")
  );
  hatEligibilityChangedEvent.blockNumber = event.block.number.toI32();
  hatEligibilityChangedEvent.timestamp = event.block.timestamp;
  hatEligibilityChangedEvent.transactionID = event.transaction.hash;
  hatEligibilityChangedEvent.hatNewEligibility =
    event.params.newEligibility.toHexString();
  hatEligibilityChangedEvent.tree = topHatDomain(event.params.hatId);
  hatEligibilityChangedEvent.hat = hatIdToHex(event.params.hatId);
  hatEligibilityChangedEvent.save();
}

export function handleHatImageURIChanged(event: HatImageURIChanged): void {
  // load hat and update the imageUri field
  let hat = Hat.load(hatIdToHex(event.params.hatId)) as Hat;
  hat.imageUri = event.params.newImageURI;
  hat.save();

  // create new HatImageURIChangedEvent
  let hatImageURIChangedEvent = new HatImageURIChangedEvent(
    createEventID(event, "HatImageURIChanged")
  );
  hatImageURIChangedEvent.blockNumber = event.block.number.toI32();
  hatImageURIChangedEvent.timestamp = event.block.timestamp;
  hatImageURIChangedEvent.transactionID = event.transaction.hash;
  hatImageURIChangedEvent.hatNewImageURI = event.params.newImageURI;
  hatImageURIChangedEvent.tree = topHatDomain(event.params.hatId);
  hatImageURIChangedEvent.hat = hatIdToHex(event.params.hatId);
  hatImageURIChangedEvent.save();
}

export function handleHatMaxSupplyChanged(event: HatMaxSupplyChanged): void {
  // load hat and update the maxSupply field
  let hat = Hat.load(hatIdToHex(event.params.hatId)) as Hat;
  hat.maxSupply = event.params.newMaxSupply;
  hat.save();

  // create new HatMaxSupplyChangedEvent
  let hatMaxSupplyChangedEvent = new HatMaxSupplyChangedEvent(
    createEventID(event, "HatMaxSupplyChanged")
  );
  hatMaxSupplyChangedEvent.blockNumber = event.block.number.toI32();
  hatMaxSupplyChangedEvent.timestamp = event.block.timestamp;
  hatMaxSupplyChangedEvent.transactionID = event.transaction.hash;
  hatMaxSupplyChangedEvent.hatNewMaxSupply = event.params.newMaxSupply;
  hatMaxSupplyChangedEvent.tree = topHatDomain(event.params.hatId);
  hatMaxSupplyChangedEvent.hat = hatIdToHex(event.params.hatId);
  hatMaxSupplyChangedEvent.save();
}

export function handleHatMutabilityChanged(event: HatMutabilityChanged): void {
  // load hat and update the mutability field
  let hat = Hat.load(hatIdToHex(event.params.hatId)) as Hat;
  hat.mutable = false;
  hat.save();

  // create new HatMaxSupplyChangedEvent
  let hatMutabilityChangedEvent = new HatMutabilityChangedEvent(
    createEventID(event, "HatMutabilityChanged")
  );
  hatMutabilityChangedEvent.blockNumber = event.block.number.toI32();
  hatMutabilityChangedEvent.timestamp = event.block.timestamp;
  hatMutabilityChangedEvent.transactionID = event.transaction.hash;
  hatMutabilityChangedEvent.tree = topHatDomain(event.params.hatId);
  hatMutabilityChangedEvent.hat = hatIdToHex(event.params.hatId);
  hatMutabilityChangedEvent.save();
}

export function handleHatStatusChanged(event: HatStatusChanged): void {
  // load hat and update the status field
  let hat = Hat.load(hatIdToHex(event.params.hatId)) as Hat;
  hat.status = event.params.newStatus;
  hat.save();

  // create new HatStatusChangedEvent
  let hatStatusChangedEvent = new HatStatusChangedEvent(
    createEventID(event, "HatStatusChanged")
  );
  hatStatusChangedEvent.blockNumber = event.block.number.toI32();
  hatStatusChangedEvent.timestamp = event.block.timestamp;
  hatStatusChangedEvent.transactionID = event.transaction.hash;
  hatStatusChangedEvent.hatNewStatus = event.params.newStatus;
  hatStatusChangedEvent.tree = topHatDomain(event.params.hatId);
  hatStatusChangedEvent.hat = hatIdToHex(event.params.hatId);
  hatStatusChangedEvent.save();
}

export function handleHatToggleChanged(event: HatToggleChanged): void {
  // load hat and update the toggle field
  let hat = Hat.load(hatIdToHex(event.params.hatId)) as Hat;
  hat.toggle = event.params.newToggle.toHexString();
  hat.save();

  // create new HatToggleChangedEvent
  let hatToggleChangedEvent = new HatToggleChangedEvent(
    createEventID(event, "HatToggleChanged")
  );
  hatToggleChangedEvent.blockNumber = event.block.number.toI32();
  hatToggleChangedEvent.timestamp = event.block.timestamp;
  hatToggleChangedEvent.transactionID = event.transaction.hash;
  hatToggleChangedEvent.hatNewToggle = event.params.newToggle.toHexString();
  hatToggleChangedEvent.tree = topHatDomain(event.params.hatId);
  hatToggleChangedEvent.hat = hatIdToHex(event.params.hatId);
  hatToggleChangedEvent.save();
}

export function handleTransferSingle(event: TransferSingle): void {
  let hat = Hat.load(hatIdToHex(event.params.id)) as Hat;
  if (
    event.params.from != Address.zero() &&
    event.params.to != Address.zero()
  ) {
    //transfer event
    giveHat(hat, event);
    removeHat(hat, event);
  } else if (
    event.params.from == Address.zero() &&
    event.params.to != Address.zero()
  ) {
    // mint event
    giveHat(hat, event);
  } else if (
    event.params.from != Address.zero() &&
    event.params.to == Address.zero()
  ) {
    // burn event
    removeHat(hat, event);
  }
}

export function handleWearerStandingChanged(
  event: WearerStandingChanged
): void {
  // load hat and update the badStandings array
  let hat = Hat.load(hatIdToHex(event.params.hatId)) as Hat;
  let wearer = Wearer.load(event.params.wearer.toHexString()) as Wearer;
  let badStandings = hat.badStandings;
  if (event.params.wearerStanding) {
    let index = badStandings.indexOf(wearer.id);
    badStandings.splice(index, 1);
    hat.badStandings = badStandings;
  } else {
    badStandings.push(wearer.id);
    hat.badStandings = badStandings;
  }
  hat.save();

  // create new WearerStandingChangedEvent
  let wearerStandingChangedEvent = new WearerStandingChangedEvent(
    createEventID(event, "WearerStandingChanged")
  );
  wearerStandingChangedEvent.tree = topHatDomain(event.params.hatId);
  wearerStandingChangedEvent.hat = hatIdToHex(event.params.hatId);
  wearerStandingChangedEvent.blockNumber = event.block.number.toI32();
  wearerStandingChangedEvent.timestamp = event.block.timestamp;
  wearerStandingChangedEvent.transactionID = event.transaction.hash;
  wearerStandingChangedEvent.wearer = wearer.id;
  wearerStandingChangedEvent.wearerStanding = event.params.wearerStanding;
  wearerStandingChangedEvent.save();
}

export function handleTopHatLinkRequested(event: TopHatLinkRequested): void {
  let requestingTree = Tree.load(
    topHatDomainToHex(event.params.domain)
  ) as Tree;

  // load tree of new admin and create dummy if don't exist
  let newAdminTree = Tree.load(topHatDomain(event.params.newAdmin));
  if (newAdminTree === null) {
    createDummyTree(topHatDomain(event.params.newAdmin));
    newAdminTree = Tree.load(topHatDomain(event.params.newAdmin)) as Tree;
  }
  // load new admin hat. If not exist, create dummmy hats for the whole admin chain
  let newAdminHat = Hat.load(hatIdToHex(event.params.newAdmin));
  if (newAdminHat === null) {
    createDummyHats(hatIdToHex(event.params.newAdmin), event.address);
    newAdminHat = Hat.load(hatIdToHex(event.params.newAdmin)) as Hat;
  }

  requestingTree.requestedLinkToTree = newAdminTree.id;
  requestingTree.requestedLinkToHat = newAdminHat.id;
  requestingTree.save();

  // create new TopHatLinkRequestedEvent
  let topHatLinkRequestedEvent = new TopHatLinkRequestedEvent(
    createEventID(event, "TopHatLinkRequested")
  );
  topHatLinkRequestedEvent.tree = topHatDomainToHex(event.params.domain);
  topHatLinkRequestedEvent.hat = topHatDomainToHatId(event.params.domain);
  topHatLinkRequestedEvent.blockNumber = event.block.number.toI32();
  topHatLinkRequestedEvent.timestamp = event.block.timestamp;
  topHatLinkRequestedEvent.transactionID = event.transaction.hash;
  topHatLinkRequestedEvent.newAdmin = hatIdToHex(event.params.newAdmin);
  topHatLinkRequestedEvent.save();
}

export function handleTopHatLinked(event: TopHatLinked): void {
  let tree = Tree.load(topHatDomainToHex(event.params.domain)) as Tree;
  let topHat = Hat.load(topHatDomainToHatId(event.params.domain)) as Hat;
  if (event.params.newAdmin == BigInt.zero()) {
    // delink tree
    tree.linkedToHat = null;
    tree.childOfTree = null;
    topHat.admin = topHat.id; // tophat returns to be its own admin
    // non linked top hats have zero eligibility and toggle
    topHat.eligibility = Address.zero().toHexString();
    topHat.toggle = Address.zero().toHexString();
  } else {
    // link tree
    tree.linkedToHat = hatIdToHex(event.params.newAdmin);
    tree.childOfTree = topHatDomain(event.params.newAdmin);
    topHat.admin = hatIdToHex(event.params.newAdmin); // tophat is no longer its own admin after linkage

    // remove request
    tree.requestedLinkToHat = null;
    tree.requestedLinkToTree = null;
  }
  tree.save();
  topHat.save();

  // create new TopHatLinkedEvent
  let topHatLinkedEvent = new TopHatLinkedEvent(
    createEventID(event, "TopHatLinked")
  );
  topHatLinkedEvent.tree = topHatDomainToHex(event.params.domain);
  topHatLinkedEvent.hat = topHatDomainToHatId(event.params.domain);
  topHatLinkedEvent.blockNumber = event.block.number.toI32();
  topHatLinkedEvent.timestamp = event.block.timestamp;
  topHatLinkedEvent.transactionID = event.transaction.hash;
  topHatLinkedEvent.newAdmin = hatIdToHex(event.params.newAdmin);
  topHatLinkedEvent.save();
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
  let hatMintedEvent = new HatMintedEvent(createEventID(event, "HatMinted"));
  hatMintedEvent.blockNumber = event.block.number.toI32();
  hatMintedEvent.timestamp = event.block.timestamp;
  hatMintedEvent.transactionID = event.transaction.hash;
  hatMintedEvent.wearer = to.id;
  hatMintedEvent.operator = event.params.operator.toHexString();
  hatMintedEvent.tree = topHatDomain(event.params.id);
  hatMintedEvent.hat = hatIdToHex(event.params.id);
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
  let hatBurnedEvent = new HatBurnedEvent(createEventID(event, "HatBurned"));
  hatBurnedEvent.blockNumber = event.block.number.toI32();
  hatBurnedEvent.timestamp = event.block.timestamp;
  hatBurnedEvent.transactionID = event.transaction.hash;
  hatBurnedEvent.wearer = from.id;
  hatBurnedEvent.operator = event.params.operator.toHexString();
  hatBurnedEvent.tree = topHatDomain(event.params.id);
  hatBurnedEvent.hat = hatIdToHex(event.params.id);
  hatBurnedEvent.save();
}

function createDummyTree(treeDomain: string): void {
  let tree = new Tree(treeDomain);
  tree.save();
}

function createDummyHats(hatId: string, contractAddress: Address): void {
  for (let i = 10; i < hatId.length; i += 4) {
    let currentHatId = hatId.substring(0, i).padEnd(66, "0");
    let hat = Hat.load(currentHatId);
    if (hat === null) {
      createDummyHat(currentHatId, contractAddress);
    }

    let domainAtNextLevel = hatId.substring(i, i + 4);
    if (domainAtNextLevel == "0000") {
      break;
    }
  }
}

function createDummyHat(hatId: string, contractAddress: Address): void {
  let hat = new Hat(hatId);
  hat.prettyId = hatIdHexToPrettyId(hatId);
  hat.createdAt = null;
  hat.wearers = [];
  hat.details = "";
  hat.maxSupply = BigInt.fromI32(0);
  hat.eligibility = "0x0000000000000000000000000000000000000000";
  hat.toggle = "0x0000000000000000000000000000000000000000";
  hat.mutable = false;
  hat.imageUri = "";
  hat.status = false;
  hat.levelAtLocalTree = hatLevelLocal(
    contractAddress,
    BigInt.fromUnsignedBytes(Bytes.fromHexString(changeEndianness(hatId)))
  );
  hat.currentSupply = BigInt.fromI32(0);
  hat.badStandings = [];

  if (hat.levelAtLocalTree == 0) {
    hat.admin = hat.id;
  } else {
    hat.admin = getHatAdmin(
      contractAddress,
      BigInt.fromUnsignedBytes(Bytes.fromHexString(changeEndianness(hatId))),
      hat.levelAtLocalTree - 1
    );
  }

  hat.tree = hexTopHatDomain(hatId);

  hat.save();
}

export function handleHatDetailsMetadata(content: Bytes): void {
  const value = json.fromBytes(content).toObject();
  if (value) {
    const type = value.get("type");
    const rawData = value.get("data");

    if (type != null && rawData != null && type.toString() == "1.0") {
      let context = dataSource.context();
      let cid = context.getString("cid");
      let hatDetailsMetadata = new HatDetailsMetadata(cid);
      hatDetailsMetadata.type = "1.0";
      const data = rawData.toObject();

      //for (let i = 0; i < data.entries.length; i++) {
      //  const entry = data.entries[i];
      //  log.info("key: {}", [entry.key]);
      //}

      // parse name
      const name = data.get("name");
      if (name) {
        hatDetailsMetadata.name = name.toString();
      } else {
        hatDetailsMetadata.name = "";
      }

      // parse description
      const description = data.get("description");
      if (description) {
        hatDetailsMetadata.description = description.toString();
      } else {
        hatDetailsMetadata.description = "";
      }

      // parse guilds
      const guildsArray = data.get("guilds");
      if (guildsArray) {
        const guilds = guildsArray.toArray();
        const finalGuilds: string[] = [];
        for (let i = 0; i < guilds.length; i++) {
          finalGuilds.push(guilds[i].toString());
        }
        hatDetailsMetadata.guilds = finalGuilds;
      } else {
        hatDetailsMetadata.guilds = [];
      }

      // parse spaces
      const spacesArray = data.get("spaces");
      if (spacesArray) {
        const spaces = spacesArray.toArray();
        const finalSpaces: string[] = [];
        for (let i = 0; i < spaces.length; i++) {
          finalSpaces.push(spaces[i].toString());
        }
        hatDetailsMetadata.spaces = finalSpaces;
      } else {
        hatDetailsMetadata.spaces = [];
      }

      // parse responsabilities
      const responsabilitiesArray = data.get("responsibilities");
      if (responsabilitiesArray) {
        const responsabilities = responsabilitiesArray.toArray();
        const responsabilityLabels: string[] = [];
        const responsabilityDescriptions: string[] = [];
        const responsabilityLinks: string[] = [];
        const responsabilityImageUrls: string[] = [];

        for (let i = 0; i < responsabilities.length; i++) {
          const responsability = responsabilities[i].toObject();

          // parse label
          const label = responsability.get("label");
          if (label) {
            responsabilityLabels.push(label.toString());
          } else {
            responsabilityLabels.push("");
          }

          // parse description
          const description = responsability.get("description");
          if (description) {
            responsabilityDescriptions.push(description.toString());
          } else {
            responsabilityDescriptions.push("");
          }

          // parse link
          const link = responsability.get("link");
          if (link) {
            responsabilityLinks.push(link.toString());
          } else {
            responsabilityLinks.push("");
          }

          // parse images url
          const imageUrl = responsability.get("imageUrl");
          if (imageUrl) {
            responsabilityImageUrls.push(imageUrl.toString());
          } else {
            responsabilityImageUrls.push("");
          }
        }

        hatDetailsMetadata.responsabilityLabels = responsabilityLabels;
        hatDetailsMetadata.responsabilityDescriptions =
          responsabilityDescriptions;
        hatDetailsMetadata.responsabilityLinks = responsabilityLinks;
        hatDetailsMetadata.responsabilityImageUrls = responsabilityImageUrls;
      }

      // parse authorities
      const authoritiesArray = data.get("authorities");
      if (authoritiesArray) {
        const authorities = authoritiesArray.toArray();
        const authorityLabels: string[] = [];
        const authorityDescriptions: string[] = [];
        const authorityLinks: string[] = [];
        const authorityImageUrls: string[] = [];
        const authorityGates: string[] = [];

        for (let i = 0; i < authorities.length; i++) {
          const authority = authorities[i].toObject();

          // parse label
          const label = authority.get("label");
          if (label) {
            authorityLabels.push(label.toString());
          } else {
            authorityLabels.push("");
          }

          // parse description
          const description = authority.get("description");
          if (description) {
            authorityDescriptions.push(description.toString());
          } else {
            authorityDescriptions.push("");
          }

          // parse link
          const link = authority.get("link");
          if (link) {
            authorityLinks.push(link.toString());
          } else {
            authorityLinks.push("");
          }

          // parse images url
          const imageUrl = authority.get("imageUrl");
          if (imageUrl) {
            authorityImageUrls.push(imageUrl.toString());
          } else {
            authorityImageUrls.push("");
          }

          // parse gate
          const gate = authority.get("gate");
          if (gate) {
            authorityGates.push(gate.toString());
          } else {
            authorityGates.push("");
          }
        }

        hatDetailsMetadata.authorityLabels = authorityLabels;
        hatDetailsMetadata.authorityDescriptions = authorityDescriptions;
        hatDetailsMetadata.authorityLinks = authorityLinks;
        hatDetailsMetadata.authorityImageUrls = authorityImageUrls;
        hatDetailsMetadata.authorityGates = authorityGates;
      }

      // parse eligibility
      const eligibilityData = data.get("eligibility");
      if (eligibilityData) {
        const eligibility = eligibilityData.toObject();

        const eligibilityCriteriaLinks: string[] = [];
        const eligibilityCriteriaLabels: string[] = [];

        // parse criteria
        const criteriaArray = eligibility.get("criteria");
        if (criteriaArray) {
          const criterias = criteriaArray.toArray();
          for (let i = 0; i < criterias.length; i++) {
            const criteria = criterias[i].toObject();

            // parse link
            const link = criteria.get("link");
            if (link) {
              eligibilityCriteriaLinks.push(link.toString());
            } else {
              eligibilityCriteriaLinks.push("");
            }

            // parse label
            const label = criteria.get("label");
            if (label) {
              eligibilityCriteriaLabels.push(label.toString());
            } else {
              eligibilityCriteriaLabels.push("");
            }
          }
        }

        // parse manual
        const manual = eligibility.get("manual");
        if (manual) {
          hatDetailsMetadata.eligibilityManual = manual.toBool();
        } else {
          hatDetailsMetadata.eligibilityManual = true;
        }

        hatDetailsMetadata.eligibilityCriteriaLinks = eligibilityCriteriaLinks;
        hatDetailsMetadata.eligibilityCriteriaLabels =
          eligibilityCriteriaLabels;
      } else {
        hatDetailsMetadata.eligibilityManual = true;
        hatDetailsMetadata.eligibilityCriteriaLinks = [];
        hatDetailsMetadata.eligibilityCriteriaLabels = [];
      }

      // parse toggle
      const toggleData = data.get("toggle");
      if (toggleData) {
        const toggle = toggleData.toObject();

        const toggleCriteriaLinks: string[] = [];
        const toggleCriteriaLabels: string[] = [];

        // parse criteria
        const criteriaArray = toggle.get("criteria");
        if (criteriaArray) {
          const criterias = criteriaArray.toArray();
          for (let i = 0; i < criterias.length; i++) {
            const criteria = criterias[i].toObject();

            // parse link
            const link = criteria.get("link");
            if (link) {
              toggleCriteriaLinks.push(link.toString());
            } else {
              toggleCriteriaLinks.push("");
            }

            // parse label
            const label = criteria.get("label");
            if (label) {
              toggleCriteriaLabels.push(label.toString());
            } else {
              toggleCriteriaLabels.push("");
            }
          }
        }

        // parse manual
        const manual = toggle.get("manual");
        if (manual) {
          hatDetailsMetadata.toggleManual = manual.toBool();
        } else {
          hatDetailsMetadata.toggleManual = true;
        }

        hatDetailsMetadata.toggleCriteriaLinks = toggleCriteriaLinks;
        hatDetailsMetadata.toggleCriteriaLabels = toggleCriteriaLabels;
      } else {
        hatDetailsMetadata.toggleManual = true;
        hatDetailsMetadata.toggleCriteriaLinks = [];
        hatDetailsMetadata.toggleCriteriaLabels = [];
      }

      // update hat entity
      let hatId = context.getString("hatId");
      let hat = Hat.load(hatId) as Hat;
      hat.detailsMetadata = hatDetailsMetadata.id;

      hatDetailsMetadata.save();
      hat.save();
    }
  }
}
