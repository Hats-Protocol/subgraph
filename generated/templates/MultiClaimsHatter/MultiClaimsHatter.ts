// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class HatClaimabilityEdited extends ethereum.Event {
  get params(): HatClaimabilityEdited__Params {
    return new HatClaimabilityEdited__Params(this);
  }
}

export class HatClaimabilityEdited__Params {
  _event: HatClaimabilityEdited;

  constructor(event: HatClaimabilityEdited) {
    this._event = event;
  }

  get hatId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get claimType(): i32 {
    return this._event.parameters[1].value.toI32();
  }
}

export class HatsClaimabilityEdited extends ethereum.Event {
  get params(): HatsClaimabilityEdited__Params {
    return new HatsClaimabilityEdited__Params(this);
  }
}

export class HatsClaimabilityEdited__Params {
  _event: HatsClaimabilityEdited;

  constructor(event: HatsClaimabilityEdited) {
    this._event = event;
  }

  get hatIds(): Array<BigInt> {
    return this._event.parameters[0].value.toBigIntArray();
  }

  get claimTypes(): Array<i32> {
    return this._event.parameters[1].value.toI32Array();
  }
}

export class Initialized extends ethereum.Event {
  get params(): Initialized__Params {
    return new Initialized__Params(this);
  }
}

export class Initialized__Params {
  _event: Initialized;

  constructor(event: Initialized) {
    this._event = event;
  }

  get version(): i32 {
    return this._event.parameters[0].value.toI32();
  }
}

export class MultiClaimsHatter extends ethereum.SmartContract {
  static bind(address: Address): MultiClaimsHatter {
    return new MultiClaimsHatter("MultiClaimsHatter", address);
  }

  HATS(): Address {
    let result = super.call("HATS", "HATS():(address)", []);

    return result[0].toAddress();
  }

  try_HATS(): ethereum.CallResult<Address> {
    let result = super.tryCall("HATS", "HATS():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  IMPLEMENTATION(): Address {
    let result = super.call("IMPLEMENTATION", "IMPLEMENTATION():(address)", []);

    return result[0].toAddress();
  }

  try_IMPLEMENTATION(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "IMPLEMENTATION",
      "IMPLEMENTATION():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  accountCanClaim(_account: Address, _hatId: BigInt): boolean {
    let result = super.call(
      "accountCanClaim",
      "accountCanClaim(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(_account),
        ethereum.Value.fromUnsignedBigInt(_hatId)
      ]
    );

    return result[0].toBoolean();
  }

  try_accountCanClaim(
    _account: Address,
    _hatId: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "accountCanClaim",
      "accountCanClaim(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(_account),
        ethereum.Value.fromUnsignedBigInt(_hatId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  canClaimForAccount(_account: Address, _hatId: BigInt): boolean {
    let result = super.call(
      "canClaimForAccount",
      "canClaimForAccount(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(_account),
        ethereum.Value.fromUnsignedBigInt(_hatId)
      ]
    );

    return result[0].toBoolean();
  }

  try_canClaimForAccount(
    _account: Address,
    _hatId: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "canClaimForAccount",
      "canClaimForAccount(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(_account),
        ethereum.Value.fromUnsignedBigInt(_hatId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  hatExists(_hatId: BigInt): boolean {
    let result = super.call("hatExists", "hatExists(uint256):(bool)", [
      ethereum.Value.fromUnsignedBigInt(_hatId)
    ]);

    return result[0].toBoolean();
  }

  try_hatExists(_hatId: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall("hatExists", "hatExists(uint256):(bool)", [
      ethereum.Value.fromUnsignedBigInt(_hatId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  hatId(): BigInt {
    let result = super.call("hatId", "hatId():(uint256)", []);

    return result[0].toBigInt();
  }

  try_hatId(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("hatId", "hatId():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  hatIsClaimableBy(_hatId: BigInt): boolean {
    let result = super.call(
      "hatIsClaimableBy",
      "hatIsClaimableBy(uint256):(bool)",
      [ethereum.Value.fromUnsignedBigInt(_hatId)]
    );

    return result[0].toBoolean();
  }

  try_hatIsClaimableBy(_hatId: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "hatIsClaimableBy",
      "hatIsClaimableBy(uint256):(bool)",
      [ethereum.Value.fromUnsignedBigInt(_hatId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  hatIsClaimableFor(_hatId: BigInt): boolean {
    let result = super.call(
      "hatIsClaimableFor",
      "hatIsClaimableFor(uint256):(bool)",
      [ethereum.Value.fromUnsignedBigInt(_hatId)]
    );

    return result[0].toBoolean();
  }

  try_hatIsClaimableFor(_hatId: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "hatIsClaimableFor",
      "hatIsClaimableFor(uint256):(bool)",
      [ethereum.Value.fromUnsignedBigInt(_hatId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  hatToClaimType(hatId: BigInt): i32 {
    let result = super.call(
      "hatToClaimType",
      "hatToClaimType(uint256):(uint8)",
      [ethereum.Value.fromUnsignedBigInt(hatId)]
    );

    return result[0].toI32();
  }

  try_hatToClaimType(hatId: BigInt): ethereum.CallResult<i32> {
    let result = super.tryCall(
      "hatToClaimType",
      "hatToClaimType(uint256):(uint8)",
      [ethereum.Value.fromUnsignedBigInt(hatId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  setHatClaimabilityAndCreateModule(
    _factory: Address,
    _implementation: Address,
    _moduleHatId: BigInt,
    _otherImmutableArgs: Bytes,
    _initData: Bytes,
    _hatId: BigInt,
    _claimType: i32
  ): Address {
    let result = super.call(
      "setHatClaimabilityAndCreateModule",
      "setHatClaimabilityAndCreateModule(address,address,uint256,bytes,bytes,uint256,uint8):(address)",
      [
        ethereum.Value.fromAddress(_factory),
        ethereum.Value.fromAddress(_implementation),
        ethereum.Value.fromUnsignedBigInt(_moduleHatId),
        ethereum.Value.fromBytes(_otherImmutableArgs),
        ethereum.Value.fromBytes(_initData),
        ethereum.Value.fromUnsignedBigInt(_hatId),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_claimType))
      ]
    );

    return result[0].toAddress();
  }

  try_setHatClaimabilityAndCreateModule(
    _factory: Address,
    _implementation: Address,
    _moduleHatId: BigInt,
    _otherImmutableArgs: Bytes,
    _initData: Bytes,
    _hatId: BigInt,
    _claimType: i32
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "setHatClaimabilityAndCreateModule",
      "setHatClaimabilityAndCreateModule(address,address,uint256,bytes,bytes,uint256,uint8):(address)",
      [
        ethereum.Value.fromAddress(_factory),
        ethereum.Value.fromAddress(_implementation),
        ethereum.Value.fromUnsignedBigInt(_moduleHatId),
        ethereum.Value.fromBytes(_otherImmutableArgs),
        ethereum.Value.fromBytes(_initData),
        ethereum.Value.fromUnsignedBigInt(_hatId),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_claimType))
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  setHatsClaimabilityAndCreateModules(
    _factory: Address,
    _implementations: Array<Address>,
    _moduleHatIds: Array<BigInt>,
    _otherImmutableArgsArray: Array<Bytes>,
    _initDataArray: Array<Bytes>,
    _hatIds: Array<BigInt>,
    _claimTypes: Array<i32>
  ): boolean {
    let result = super.call(
      "setHatsClaimabilityAndCreateModules",
      "setHatsClaimabilityAndCreateModules(address,address[],uint256[],bytes[],bytes[],uint256[],uint8[]):(bool)",
      [
        ethereum.Value.fromAddress(_factory),
        ethereum.Value.fromAddressArray(_implementations),
        ethereum.Value.fromUnsignedBigIntArray(_moduleHatIds),
        ethereum.Value.fromBytesArray(_otherImmutableArgsArray),
        ethereum.Value.fromBytesArray(_initDataArray),
        ethereum.Value.fromUnsignedBigIntArray(_hatIds),
        ethereum.Value.fromI32Array(_claimTypes)
      ]
    );

    return result[0].toBoolean();
  }

  try_setHatsClaimabilityAndCreateModules(
    _factory: Address,
    _implementations: Array<Address>,
    _moduleHatIds: Array<BigInt>,
    _otherImmutableArgsArray: Array<Bytes>,
    _initDataArray: Array<Bytes>,
    _hatIds: Array<BigInt>,
    _claimTypes: Array<i32>
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "setHatsClaimabilityAndCreateModules",
      "setHatsClaimabilityAndCreateModules(address,address[],uint256[],bytes[],bytes[],uint256[],uint8[]):(bool)",
      [
        ethereum.Value.fromAddress(_factory),
        ethereum.Value.fromAddressArray(_implementations),
        ethereum.Value.fromUnsignedBigIntArray(_moduleHatIds),
        ethereum.Value.fromBytesArray(_otherImmutableArgsArray),
        ethereum.Value.fromBytesArray(_initDataArray),
        ethereum.Value.fromUnsignedBigIntArray(_hatIds),
        ethereum.Value.fromI32Array(_claimTypes)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  version(): string {
    let result = super.call("version", "version():(string)", []);

    return result[0].toString();
  }

  try_version(): ethereum.CallResult<string> {
    let result = super.tryCall("version", "version():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  version_(): string {
    let result = super.call("version_", "version_():(string)", []);

    return result[0].toString();
  }

  try_version_(): ethereum.CallResult<string> {
    let result = super.tryCall("version_", "version_():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  wearsAdmin(_hatId: BigInt): boolean {
    let result = super.call("wearsAdmin", "wearsAdmin(uint256):(bool)", [
      ethereum.Value.fromUnsignedBigInt(_hatId)
    ]);

    return result[0].toBoolean();
  }

  try_wearsAdmin(_hatId: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall("wearsAdmin", "wearsAdmin(uint256):(bool)", [
      ethereum.Value.fromUnsignedBigInt(_hatId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _version(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ClaimHatCall extends ethereum.Call {
  get inputs(): ClaimHatCall__Inputs {
    return new ClaimHatCall__Inputs(this);
  }

  get outputs(): ClaimHatCall__Outputs {
    return new ClaimHatCall__Outputs(this);
  }
}

export class ClaimHatCall__Inputs {
  _call: ClaimHatCall;

  constructor(call: ClaimHatCall) {
    this._call = call;
  }

  get _hatId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class ClaimHatCall__Outputs {
  _call: ClaimHatCall;

  constructor(call: ClaimHatCall) {
    this._call = call;
  }
}

export class ClaimHatForCall extends ethereum.Call {
  get inputs(): ClaimHatForCall__Inputs {
    return new ClaimHatForCall__Inputs(this);
  }

  get outputs(): ClaimHatForCall__Outputs {
    return new ClaimHatForCall__Outputs(this);
  }
}

export class ClaimHatForCall__Inputs {
  _call: ClaimHatForCall;

  constructor(call: ClaimHatForCall) {
    this._call = call;
  }

  get _hatId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ClaimHatForCall__Outputs {
  _call: ClaimHatForCall;

  constructor(call: ClaimHatForCall) {
    this._call = call;
  }
}

export class ClaimHatsCall extends ethereum.Call {
  get inputs(): ClaimHatsCall__Inputs {
    return new ClaimHatsCall__Inputs(this);
  }

  get outputs(): ClaimHatsCall__Outputs {
    return new ClaimHatsCall__Outputs(this);
  }
}

export class ClaimHatsCall__Inputs {
  _call: ClaimHatsCall;

  constructor(call: ClaimHatsCall) {
    this._call = call;
  }

  get _hatIds(): Array<BigInt> {
    return this._call.inputValues[0].value.toBigIntArray();
  }
}

export class ClaimHatsCall__Outputs {
  _call: ClaimHatsCall;

  constructor(call: ClaimHatsCall) {
    this._call = call;
  }
}

export class ClaimHatsForCall extends ethereum.Call {
  get inputs(): ClaimHatsForCall__Inputs {
    return new ClaimHatsForCall__Inputs(this);
  }

  get outputs(): ClaimHatsForCall__Outputs {
    return new ClaimHatsForCall__Outputs(this);
  }
}

export class ClaimHatsForCall__Inputs {
  _call: ClaimHatsForCall;

  constructor(call: ClaimHatsForCall) {
    this._call = call;
  }

  get _hatIds(): Array<BigInt> {
    return this._call.inputValues[0].value.toBigIntArray();
  }

  get _accounts(): Array<Address> {
    return this._call.inputValues[1].value.toAddressArray();
  }
}

export class ClaimHatsForCall__Outputs {
  _call: ClaimHatsForCall;

  constructor(call: ClaimHatsForCall) {
    this._call = call;
  }
}

export class SetHatClaimabilityCall extends ethereum.Call {
  get inputs(): SetHatClaimabilityCall__Inputs {
    return new SetHatClaimabilityCall__Inputs(this);
  }

  get outputs(): SetHatClaimabilityCall__Outputs {
    return new SetHatClaimabilityCall__Outputs(this);
  }
}

export class SetHatClaimabilityCall__Inputs {
  _call: SetHatClaimabilityCall;

  constructor(call: SetHatClaimabilityCall) {
    this._call = call;
  }

  get _hatId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _claimType(): i32 {
    return this._call.inputValues[1].value.toI32();
  }
}

export class SetHatClaimabilityCall__Outputs {
  _call: SetHatClaimabilityCall;

  constructor(call: SetHatClaimabilityCall) {
    this._call = call;
  }
}

export class SetHatClaimabilityAndCreateModuleCall extends ethereum.Call {
  get inputs(): SetHatClaimabilityAndCreateModuleCall__Inputs {
    return new SetHatClaimabilityAndCreateModuleCall__Inputs(this);
  }

  get outputs(): SetHatClaimabilityAndCreateModuleCall__Outputs {
    return new SetHatClaimabilityAndCreateModuleCall__Outputs(this);
  }
}

export class SetHatClaimabilityAndCreateModuleCall__Inputs {
  _call: SetHatClaimabilityAndCreateModuleCall;

  constructor(call: SetHatClaimabilityAndCreateModuleCall) {
    this._call = call;
  }

  get _factory(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _implementation(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _moduleHatId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _otherImmutableArgs(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }

  get _initData(): Bytes {
    return this._call.inputValues[4].value.toBytes();
  }

  get _hatId(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }

  get _claimType(): i32 {
    return this._call.inputValues[6].value.toI32();
  }
}

export class SetHatClaimabilityAndCreateModuleCall__Outputs {
  _call: SetHatClaimabilityAndCreateModuleCall;

  constructor(call: SetHatClaimabilityAndCreateModuleCall) {
    this._call = call;
  }

  get _instance(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}

export class SetHatsClaimabilityCall extends ethereum.Call {
  get inputs(): SetHatsClaimabilityCall__Inputs {
    return new SetHatsClaimabilityCall__Inputs(this);
  }

  get outputs(): SetHatsClaimabilityCall__Outputs {
    return new SetHatsClaimabilityCall__Outputs(this);
  }
}

export class SetHatsClaimabilityCall__Inputs {
  _call: SetHatsClaimabilityCall;

  constructor(call: SetHatsClaimabilityCall) {
    this._call = call;
  }

  get _hatIds(): Array<BigInt> {
    return this._call.inputValues[0].value.toBigIntArray();
  }

  get _claimTypes(): Array<i32> {
    return this._call.inputValues[1].value.toI32Array();
  }
}

export class SetHatsClaimabilityCall__Outputs {
  _call: SetHatsClaimabilityCall;

  constructor(call: SetHatsClaimabilityCall) {
    this._call = call;
  }
}

export class SetHatsClaimabilityAndCreateModulesCall extends ethereum.Call {
  get inputs(): SetHatsClaimabilityAndCreateModulesCall__Inputs {
    return new SetHatsClaimabilityAndCreateModulesCall__Inputs(this);
  }

  get outputs(): SetHatsClaimabilityAndCreateModulesCall__Outputs {
    return new SetHatsClaimabilityAndCreateModulesCall__Outputs(this);
  }
}

export class SetHatsClaimabilityAndCreateModulesCall__Inputs {
  _call: SetHatsClaimabilityAndCreateModulesCall;

  constructor(call: SetHatsClaimabilityAndCreateModulesCall) {
    this._call = call;
  }

  get _factory(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _implementations(): Array<Address> {
    return this._call.inputValues[1].value.toAddressArray();
  }

  get _moduleHatIds(): Array<BigInt> {
    return this._call.inputValues[2].value.toBigIntArray();
  }

  get _otherImmutableArgsArray(): Array<Bytes> {
    return this._call.inputValues[3].value.toBytesArray();
  }

  get _initDataArray(): Array<Bytes> {
    return this._call.inputValues[4].value.toBytesArray();
  }

  get _hatIds(): Array<BigInt> {
    return this._call.inputValues[5].value.toBigIntArray();
  }

  get _claimTypes(): Array<i32> {
    return this._call.inputValues[6].value.toI32Array();
  }
}

export class SetHatsClaimabilityAndCreateModulesCall__Outputs {
  _call: SetHatsClaimabilityAndCreateModulesCall;

  constructor(call: SetHatsClaimabilityAndCreateModulesCall) {
    this._call = call;
  }

  get success(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class SetUpCall extends ethereum.Call {
  get inputs(): SetUpCall__Inputs {
    return new SetUpCall__Inputs(this);
  }

  get outputs(): SetUpCall__Outputs {
    return new SetUpCall__Outputs(this);
  }
}

export class SetUpCall__Inputs {
  _call: SetUpCall;

  constructor(call: SetUpCall) {
    this._call = call;
  }

  get _initData(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class SetUpCall__Outputs {
  _call: SetUpCall;

  constructor(call: SetUpCall) {
    this._call = call;
  }
}
