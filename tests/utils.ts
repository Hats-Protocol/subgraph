import {
  Address,
  BigInt,
  ethereum,
  Bytes,
  ByteArray,
  log,
} from "@graphprotocol/graph-ts";
import {
  HatCreated,
  TransferSingle,
  HatDetailsChanged,
  HatEligibilityChanged,
  HatToggleChanged,
  HatImageURIChanged,
  HatMaxSupplyChanged,
  HatMutabilityChanged,
  HatStatusChanged,
  TopHatLinkRequested,
  TopHatLinked,
  WearerStandingChanged,
} from "../generated/Hats/Hats";
import {
  HatsClaimabilitySet,
  HatClaimabilitySet,
} from "../generated/templates/MultiClaimsHatter/MultiClaimsHatter";
import { HatsModuleFactory_ModuleDeployed as HatsModuleFactory_ModuleDeployedV0_6_0 } from "../generated/HatsModuleFactoryV0_6_0/HatsModuleFactoryV0_6_0";
import { HatsModuleFactory_ModuleDeployed as HatsModuleFactory_ModuleDeployedV0_7_0 } from "../generated/HatsModuleFactoryV0_7_0/HatsModuleFactoryV0_7_0";
import { newMockEvent, createMockedFunction } from "matchstick-as";

export function mockTopHatLinkRequestedEvent(
  domain: string,
  newAdmin: string
): TopHatLinkRequested {
  // prepare event parameters array
  let domainParam = new ethereum.EventParam(
    "domain",
    ethereum.Value.fromUnsignedBigInt(
      BigInt.fromUnsignedBytes(Bytes.fromHexString(changeEndianness(domain)))
    )
  );
  let newAdminParam = new ethereum.EventParam(
    "newAdmin",
    ethereum.Value.fromUnsignedBigInt(
      BigInt.fromUnsignedBytes(Bytes.fromHexString(changeEndianness(newAdmin)))
    )
  );

  // create mocked event
  let mockEvent = newMockEvent();
  let topHatLinkRequestedEvent = new TopHatLinkRequested(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  topHatLinkRequestedEvent.parameters = new Array<ethereum.EventParam>();
  topHatLinkRequestedEvent.parameters.push(domainParam);
  topHatLinkRequestedEvent.parameters.push(newAdminParam);

  let level = 0;
  for (let i = 10; i < newAdmin.length; i += 4) {
    let currentHatId = newAdmin.substring(0, i).padEnd(66, "0");
    let prevHatId = newAdmin.substring(0, i - 4).padEnd(66, "0");
    createMockedFunction(
      topHatLinkRequestedEvent.address,
      "getLocalHatLevel",
      "getLocalHatLevel(uint256):(uint32)"
    )
      .withArgs([
        ethereum.Value.fromUnsignedBigInt(
          BigInt.fromByteArray(
            ByteArray.fromHexString(changeEndianness(currentHatId))
          )
        ),
      ])
      .returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromU32(level))]);

    if (level > 0) {
      createMockedFunction(
        topHatLinkRequestedEvent.address,
        "getAdminAtLocalLevel",
        "getAdminAtLocalLevel(uint256,uint32):(uint256)"
      )
        .withArgs([
          ethereum.Value.fromUnsignedBigInt(
            BigInt.fromByteArray(
              ByteArray.fromHexString(changeEndianness(currentHatId))
            )
          ),
          ethereum.Value.fromUnsignedBigInt(BigInt.fromU32(level - 1)),
        ])
        .returns([
          ethereum.Value.fromUnsignedBigInt(
            BigInt.fromByteArray(
              ByteArray.fromHexString(changeEndianness(prevHatId))
            )
          ),
        ]);
    }

    let domainAtNextLevel = newAdmin.substring(i, i + 4);
    if (domainAtNextLevel == "0000") {
      break;
    }
    level += 1;
  }

  return topHatLinkRequestedEvent;
}

export function mockTopHatLinkedEvent(
  domain: string,
  newAdmin: string
): TopHatLinked {
  // prepare event parameters array
  let domainParam = new ethereum.EventParam(
    "domain",
    ethereum.Value.fromUnsignedBigInt(
      BigInt.fromUnsignedBytes(Bytes.fromHexString(changeEndianness(domain)))
    )
  );
  let newAdminParam = new ethereum.EventParam(
    "newAdmin",
    ethereum.Value.fromUnsignedBigInt(
      BigInt.fromUnsignedBytes(Bytes.fromHexString(changeEndianness(newAdmin)))
    )
  );

  // create mocked event
  let mockEvent = newMockEvent();
  let topHatLinkedEvent = new TopHatLinked(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  topHatLinkedEvent.parameters = new Array<ethereum.EventParam>();
  topHatLinkedEvent.parameters.push(domainParam);
  topHatLinkedEvent.parameters.push(newAdminParam);

  return topHatLinkedEvent;
}

export function mockWearerStandingChangedEvent(
  id: string,
  wearer: Address,
  wearerStanding: boolean
): WearerStandingChanged {
  // prepare event parameters array
  let idParam = new ethereum.EventParam(
    "id",
    ethereum.Value.fromUnsignedBigInt(
      BigInt.fromUnsignedBytes(Bytes.fromHexString(changeEndianness(id)))
    )
  );
  let wearerParam = new ethereum.EventParam(
    "wearer",
    ethereum.Value.fromAddress(wearer)
  );
  let wearerStandingParam = new ethereum.EventParam(
    "wearerStanding",
    ethereum.Value.fromBoolean(wearerStanding)
  );

  // create mocked event
  let mockEvent = newMockEvent();
  let wearerStandingChangedEvent = new WearerStandingChanged(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  wearerStandingChangedEvent.parameters = new Array<ethereum.EventParam>();
  wearerStandingChangedEvent.parameters.push(idParam);
  wearerStandingChangedEvent.parameters.push(wearerParam);
  wearerStandingChangedEvent.parameters.push(wearerStandingParam);

  return wearerStandingChangedEvent;
}

export function mockHatStatusChangedEvent(
  id: string,
  status: boolean
): HatStatusChanged {
  // prepare event parameters array
  let idParam = new ethereum.EventParam(
    "id",
    ethereum.Value.fromUnsignedBigInt(
      BigInt.fromUnsignedBytes(Bytes.fromHexString(changeEndianness(id)))
    )
  );
  let newStatusParam = new ethereum.EventParam(
    "newStatus",
    ethereum.Value.fromBoolean(status)
  );

  // create mocked event
  let mockEvent = newMockEvent();
  let hatStatusChangedEvent = new HatStatusChanged(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  hatStatusChangedEvent.parameters = new Array<ethereum.EventParam>();
  hatStatusChangedEvent.parameters.push(idParam);
  hatStatusChangedEvent.parameters.push(newStatusParam);

  return hatStatusChangedEvent;
}

export function mockHatMutabilityChangedEvent(
  id: string
): HatMutabilityChanged {
  // prepare event parameters array
  let idParam = new ethereum.EventParam(
    "id",
    ethereum.Value.fromUnsignedBigInt(
      BigInt.fromUnsignedBytes(Bytes.fromHexString(changeEndianness(id)))
    )
  );

  // create mocked event
  let mockEvent = newMockEvent();
  let hatMutabilityChangedEvent = new HatMutabilityChanged(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  hatMutabilityChangedEvent.parameters = new Array<ethereum.EventParam>();
  hatMutabilityChangedEvent.parameters.push(idParam);

  return hatMutabilityChangedEvent;
}

export function mockHatMaxSupplyChangedEvent(
  id: string,
  maxSupply: BigInt
): HatMaxSupplyChanged {
  // prepare event parameters array
  let idParam = new ethereum.EventParam(
    "id",
    ethereum.Value.fromUnsignedBigInt(
      BigInt.fromUnsignedBytes(Bytes.fromHexString(changeEndianness(id)))
    )
  );
  let maxSupplyParam = new ethereum.EventParam(
    "maxSupply",
    ethereum.Value.fromUnsignedBigInt(maxSupply)
  );

  // create mocked event
  let mockEvent = newMockEvent();
  let hatMaxSupplyChangedEvent = new HatMaxSupplyChanged(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  hatMaxSupplyChangedEvent.parameters = new Array<ethereum.EventParam>();
  hatMaxSupplyChangedEvent.parameters.push(idParam);
  hatMaxSupplyChangedEvent.parameters.push(maxSupplyParam);

  return hatMaxSupplyChangedEvent;
}

export function mockHatImageUriChangedEvent(
  id: string,
  imageUri: string
): HatImageURIChanged {
  // prepare event parameters array
  let idParam = new ethereum.EventParam(
    "id",
    ethereum.Value.fromUnsignedBigInt(
      BigInt.fromUnsignedBytes(Bytes.fromHexString(changeEndianness(id)))
    )
  );
  let imageUriParam = new ethereum.EventParam(
    "imageUri",
    ethereum.Value.fromString(imageUri)
  );

  // create mocked event
  let mockEvent = newMockEvent();
  let hatImageUriChangedEvent = new HatImageURIChanged(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  hatImageUriChangedEvent.parameters = new Array<ethereum.EventParam>();
  hatImageUriChangedEvent.parameters.push(idParam);
  hatImageUriChangedEvent.parameters.push(imageUriParam);

  return hatImageUriChangedEvent;
}

export function mockHatToggleChangedEvent(
  id: string,
  toggle: Address
): HatToggleChanged {
  // prepare event parameters array
  let idParam = new ethereum.EventParam(
    "id",
    ethereum.Value.fromUnsignedBigInt(
      BigInt.fromUnsignedBytes(Bytes.fromHexString(changeEndianness(id)))
    )
  );
  let toggleParam = new ethereum.EventParam(
    "toggle",
    ethereum.Value.fromAddress(toggle)
  );

  // create mocked event
  let mockEvent = newMockEvent();
  let hatToggleChangedEvent = new HatToggleChanged(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  hatToggleChangedEvent.parameters = new Array<ethereum.EventParam>();
  hatToggleChangedEvent.parameters.push(idParam);
  hatToggleChangedEvent.parameters.push(toggleParam);

  return hatToggleChangedEvent;
}

export function mockHatEligibilityChangedEvent(
  id: string,
  eligibility: Address
): HatEligibilityChanged {
  // prepare event parameters array
  let idParam = new ethereum.EventParam(
    "id",
    ethereum.Value.fromUnsignedBigInt(
      BigInt.fromUnsignedBytes(Bytes.fromHexString(changeEndianness(id)))
    )
  );
  let eligibilityParam = new ethereum.EventParam(
    "eligibility",
    ethereum.Value.fromAddress(eligibility)
  );

  // create mocked event
  let mockEvent = newMockEvent();
  let hatEligibilityChangedEvent = new HatEligibilityChanged(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  hatEligibilityChangedEvent.parameters = new Array<ethereum.EventParam>();
  hatEligibilityChangedEvent.parameters.push(idParam);
  hatEligibilityChangedEvent.parameters.push(eligibilityParam);

  return hatEligibilityChangedEvent;
}

export function mockHatDetailsChangedEvent(
  id: string,
  details: string
): HatDetailsChanged {
  // prepare event parameters array
  let idParam = new ethereum.EventParam(
    "id",
    ethereum.Value.fromUnsignedBigInt(
      BigInt.fromUnsignedBytes(Bytes.fromHexString(changeEndianness(id)))
    )
  );
  let detailsParam = new ethereum.EventParam(
    "details",
    ethereum.Value.fromString(details)
  );

  // create mocked event
  let mockEvent = newMockEvent();
  let hatDetailsChangedEvent = new HatDetailsChanged(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  hatDetailsChangedEvent.parameters = new Array<ethereum.EventParam>();
  hatDetailsChangedEvent.parameters.push(idParam);
  hatDetailsChangedEvent.parameters.push(detailsParam);

  return hatDetailsChangedEvent;
}

export function mockTransferSingleEvent(
  operator: Address,
  from: Address,
  to: Address,
  id: string,
  amount: BigInt
): TransferSingle {
  // prepare event parameters array
  let operatorParam = new ethereum.EventParam(
    "operator",
    ethereum.Value.fromAddress(operator)
  );
  let fromParam = new ethereum.EventParam(
    "from",
    ethereum.Value.fromAddress(from)
  );
  let toParam = new ethereum.EventParam("to", ethereum.Value.fromAddress(to));
  let idParam = new ethereum.EventParam(
    "id",
    ethereum.Value.fromUnsignedBigInt(
      BigInt.fromUnsignedBytes(Bytes.fromHexString(changeEndianness(id)))
    )
  );
  let amountParam = new ethereum.EventParam(
    "amount",
    ethereum.Value.fromUnsignedBigInt(amount)
  );

  // create mocked event
  let mockEvent = newMockEvent();
  let transferSingleEvent = new TransferSingle(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  transferSingleEvent.parameters = new Array<ethereum.EventParam>();
  transferSingleEvent.parameters.push(operatorParam);
  transferSingleEvent.parameters.push(fromParam);
  transferSingleEvent.parameters.push(toParam);
  transferSingleEvent.parameters.push(idParam);
  transferSingleEvent.parameters.push(amountParam);

  return transferSingleEvent;
}

export function mockHatsCreatedEvent(
  id: BigInt,
  details: string,
  maxSupply: BigInt,
  eligibility: Address,
  toggle: Address,
  mutable: boolean,
  imageURI: string
): HatCreated {
  // prepare event parameters array
  let idParam = new ethereum.EventParam(
    "id",
    ethereum.Value.fromUnsignedBigInt(id)
  );
  let detailsParam = new ethereum.EventParam(
    "details",
    ethereum.Value.fromString(details)
  );
  let maxSupplyParam = new ethereum.EventParam(
    "maxSupply",
    ethereum.Value.fromSignedBigInt(maxSupply)
  );
  let eligibilityParam = new ethereum.EventParam(
    "eligibility",
    ethereum.Value.fromAddress(eligibility)
  );
  let toggleParam = new ethereum.EventParam(
    "toggle",
    ethereum.Value.fromAddress(toggle)
  );
  let mutableParam = new ethereum.EventParam(
    "mutable_",
    ethereum.Value.fromBoolean(mutable)
  );
  let imageUriParam = new ethereum.EventParam(
    "imageURI",
    ethereum.Value.fromString(imageURI)
  );

  // create mocked event
  let mockEvent = newMockEvent();
  let hatCreatedEvent = new HatCreated(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  hatCreatedEvent.parameters = new Array<ethereum.EventParam>();
  hatCreatedEvent.parameters.push(idParam);
  hatCreatedEvent.parameters.push(detailsParam);
  hatCreatedEvent.parameters.push(maxSupplyParam);
  hatCreatedEvent.parameters.push(eligibilityParam);
  hatCreatedEvent.parameters.push(toggleParam);
  hatCreatedEvent.parameters.push(mutableParam);
  hatCreatedEvent.parameters.push(imageUriParam);

  return hatCreatedEvent;
}

export function changeEndianness(s: string): string {
  const res = new Array<string>();
  res.push("0x");
  let pos = s.length - 2;
  while (pos >= 2) {
    res.push(s.substring(pos, pos + 2));
    pos -= 2;
  }
  return res.join("");
}

export function createHatCreatedEvent(
  id: string,
  details: string,
  maxSupply: BigInt,
  eligibility: Address,
  toggle: Address,
  mutable: boolean,
  imageURI: string,
  level: u32,
  admin: string
): HatCreated {
  // mock event
  let hatCreatedEvent = mockHatsCreatedEvent(
    BigInt.fromUnsignedBytes(Bytes.fromHexString(changeEndianness(id))),
    details,
    maxSupply,
    eligibility,
    toggle,
    mutable,
    imageURI
  );

  let currentLevel = 0;
  for (let i = 10; i < id.length; i += 4) {
    let currentHatId = id.substring(0, i).padEnd(66, "0");
    let prevHatId = id.substring(0, i - 4).padEnd(66, "0");
    createMockedFunction(
      hatCreatedEvent.address,
      "getLocalHatLevel",
      "getLocalHatLevel(uint256):(uint32)"
    )
      .withArgs([
        ethereum.Value.fromUnsignedBigInt(
          BigInt.fromByteArray(
            ByteArray.fromHexString(changeEndianness(currentHatId))
          )
        ),
      ])
      .returns([
        ethereum.Value.fromUnsignedBigInt(BigInt.fromU32(currentLevel)),
      ]);

    if (currentLevel > 0) {
      createMockedFunction(
        hatCreatedEvent.address,
        "getAdminAtLocalLevel",
        "getAdminAtLocalLevel(uint256,uint32):(uint256)"
      )
        .withArgs([
          ethereum.Value.fromUnsignedBigInt(
            BigInt.fromByteArray(
              ByteArray.fromHexString(changeEndianness(currentHatId))
            )
          ),
          ethereum.Value.fromUnsignedBigInt(BigInt.fromU32(currentLevel - 1)),
        ])
        .returns([
          ethereum.Value.fromUnsignedBigInt(
            BigInt.fromByteArray(
              ByteArray.fromHexString(changeEndianness(prevHatId))
            )
          ),
        ]);
    }

    let domainAtNextLevel = id.substring(i, i + 4);
    if (domainAtNextLevel == "0000") {
      break;
    }
    currentLevel += 1;
  }

  return hatCreatedEvent;
}

export function mockHatsModuleFactory_ModuleDeployedEventV0_6_0(
  implementation: Address,
  instance: Address,
  hatId: string,
  otherImmutableArgs: Bytes,
  initData: Bytes
): HatsModuleFactory_ModuleDeployedV0_6_0 {
  // prepare event parameters array
  let implementationParam = new ethereum.EventParam(
    "implementation",
    ethereum.Value.fromAddress(implementation)
  );
  let instanceParam = new ethereum.EventParam(
    "instance",
    ethereum.Value.fromAddress(instance)
  );
  let hatIdParam = new ethereum.EventParam(
    "hatId",
    ethereum.Value.fromUnsignedBigInt(
      BigInt.fromUnsignedBytes(Bytes.fromHexString(changeEndianness(hatId)))
    )
  );
  let otherImmutableArgsParam = new ethereum.EventParam(
    "otherImmutableArgs",
    ethereum.Value.fromBytes(otherImmutableArgs)
  );
  let initDataParam = new ethereum.EventParam(
    "initData",
    ethereum.Value.fromBytes(initData)
  );

  // create mocked event
  let mockEvent = newMockEvent();
  let moduleDeployedEvent = new HatsModuleFactory_ModuleDeployedV0_6_0(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  moduleDeployedEvent.parameters = new Array<ethereum.EventParam>();
  moduleDeployedEvent.parameters.push(implementationParam);
  moduleDeployedEvent.parameters.push(instanceParam);
  moduleDeployedEvent.parameters.push(hatIdParam);
  moduleDeployedEvent.parameters.push(otherImmutableArgsParam);
  moduleDeployedEvent.parameters.push(initDataParam);

  return moduleDeployedEvent;
}

export function mockHatsModuleFactory_ModuleDeployedEventV0_7_0(
  implementation: Address,
  instance: Address,
  hatId: string,
  otherImmutableArgs: Bytes,
  initData: Bytes,
  saltNonce: BigInt
): HatsModuleFactory_ModuleDeployedV0_7_0 {
  // prepare event parameters array
  let implementationParam = new ethereum.EventParam(
    "implementation",
    ethereum.Value.fromAddress(implementation)
  );
  let instanceParam = new ethereum.EventParam(
    "instance",
    ethereum.Value.fromAddress(instance)
  );
  let hatIdParam = new ethereum.EventParam(
    "hatId",
    ethereum.Value.fromUnsignedBigInt(
      BigInt.fromUnsignedBytes(Bytes.fromHexString(changeEndianness(hatId)))
    )
  );
  let otherImmutableArgsParam = new ethereum.EventParam(
    "otherImmutableArgs",
    ethereum.Value.fromBytes(otherImmutableArgs)
  );
  let initDataParam = new ethereum.EventParam(
    "initData",
    ethereum.Value.fromBytes(initData)
  );
  let saltNonceParam = new ethereum.EventParam(
    "saltNonce",
    ethereum.Value.fromUnsignedBigInt(saltNonce)
  );

  // create mocked event
  let mockEvent = newMockEvent();
  let moduleDeployedEvent = new HatsModuleFactory_ModuleDeployedV0_7_0(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  moduleDeployedEvent.parameters = new Array<ethereum.EventParam>();
  moduleDeployedEvent.parameters.push(implementationParam);
  moduleDeployedEvent.parameters.push(instanceParam);
  moduleDeployedEvent.parameters.push(hatIdParam);
  moduleDeployedEvent.parameters.push(otherImmutableArgsParam);
  moduleDeployedEvent.parameters.push(initDataParam);
  moduleDeployedEvent.parameters.push(saltNonceParam);

  return moduleDeployedEvent;
}

export function mockHatClaimabilitySetEvent(
  instance: Address,
  hatId: string,
  claimType: i32
): HatClaimabilitySet {
  // prepare event parameters array
  let hatIdParam = new ethereum.EventParam(
    "hatId",
    ethereum.Value.fromUnsignedBigInt(
      BigInt.fromUnsignedBytes(Bytes.fromHexString(changeEndianness(hatId)))
    )
  );
  let claimTypeParam = new ethereum.EventParam(
    "claimType",
    ethereum.Value.fromI32(claimType)
  );

  // create mocked event
  let mockEvent = newMockEvent();
  let hatClaimabilityEditedEvent = new HatClaimabilitySet(
    instance,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  hatClaimabilityEditedEvent.parameters = new Array<ethereum.EventParam>();
  hatClaimabilityEditedEvent.parameters.push(hatIdParam);
  hatClaimabilityEditedEvent.parameters.push(claimTypeParam);

  return hatClaimabilityEditedEvent;
}

export function mockHatsClaimabilityEditedEvent(
  instance: Address,
  hatIds: string[],
  claimTypes: i32[]
): HatsClaimabilitySet {
  // prepare event parameters array
  let hatIdsArray: BigInt[] = [];
  for (let i = 0; i < hatIds.length; i++) {
    hatIdsArray.push(
      BigInt.fromUnsignedBytes(Bytes.fromHexString(changeEndianness(hatIds[i])))
    );
  }

  let hatIdsParam = new ethereum.EventParam(
    "hatIds",
    ethereum.Value.fromUnsignedBigIntArray(hatIdsArray)
  );
  let claimTypesParam = new ethereum.EventParam(
    "claimTypes",
    ethereum.Value.fromI32Array(claimTypes)
  );

  // create mocked event
  let mockEvent = newMockEvent();
  let hatsClaimabilityEditedEvent = new HatsClaimabilitySet(
    instance,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  hatsClaimabilityEditedEvent.parameters = new Array<ethereum.EventParam>();
  hatsClaimabilityEditedEvent.parameters.push(hatIdsParam);
  hatsClaimabilityEditedEvent.parameters.push(claimTypesParam);

  return hatsClaimabilityEditedEvent;
}
