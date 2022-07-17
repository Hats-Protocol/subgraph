import { BigInt } from '@graphprotocol/graph-ts';
import {
  HatsFactory,
  ApprovalForAll,
  HatCreated,
  HatRenounced,
  HatStatusChanged,
  TransferBatch,
  TransferSingle,
  URI,
  WearerStatus,
} from '../generated/HatsFactory/HatsFactory';
import { ExampleEntity } from '../generated/schema';

export function handleApprovalForAll(event: ApprovalForAll): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex());

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex());

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0);
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count.plus(BigInt.fromI32(1));

  // Entity fields can be set based on event parameters
  entity.owner = event.params.owner;
  entity.operator = event.params.operator;

  // Entities can be written to the store with `.save()`
  entity.save();

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.badStandings(...)
  // - contract.balanceOf(...)
  // - contract.balanceOfBatch(...)
  // - contract.createHat(...)
  // - contract.createTopHatAndHat(...)
  // - contract.getAdminAtLevel(...)
  // - contract.getHatLevel(...)
  // - contract.hatSupply(...)
  // - contract.isActive(...)
  // - contract.isAdminOfHat(...)
  // - contract.isApprovedForAll(...)
  // - contract.isInGoodStanding(...)
  // - contract.isTopHat(...)
  // - contract.isWearerOfHat(...)
  // - contract.lastTopHatId(...)
  // - contract.mintHat(...)
  // - contract.mintTopHat(...)
  // - contract.pullHatStatusFromConditions(...)
  // - contract.pullHatWearerStatusFromOracle(...)
  // - contract.setHatStatus(...)
  // - contract.setHatWearerStatus(...)
  // - contract.supportsInterface(...)
  // - contract.uri(...)
  // - contract.viewHat(...)
}

export function handleHatCreated(event: HatCreated): void {}

export function handleHatRenounced(event: HatRenounced): void {}

export function handleHatStatusChanged(event: HatStatusChanged): void {}

export function handleTransferBatch(event: TransferBatch): void {}

export function handleTransferSingle(event: TransferSingle): void {}

export function handleURI(event: URI): void {}

export function handleWearerStatus(event: WearerStatus): void {}
