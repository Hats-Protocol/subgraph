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
import {
  TopHat,
  TopHatTree,
  Hat,
  Wearer,
  WearerProfile,
  WearerTransferReceipt,
  HatTree,
} from '../generated/schema';

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleHatCreated(event: HatCreated): void {}

export function handleHatRenounced(event: HatRenounced): void {}

export function handleHatStatusChanged(event: HatStatusChanged): void {}

export function handleTransferBatch(event: TransferBatch): void {}

export function handleTransferSingle(event: TransferSingle): void {}

export function handleURI(event: URI): void {}

export function handleWearerStatus(event: WearerStatus): void {}
