// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Hat extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Hat entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Hat must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Hat", id.toString(), this);
    }
  }

  static load(id: string): Hat | null {
    return changetype<Hat | null>(store.get("Hat", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get prettyId(): string {
    let value = this.get("prettyId");
    return value!.toString();
  }

  set prettyId(value: string) {
    this.set("prettyId", Value.fromString(value));
  }

  get status(): boolean {
    let value = this.get("status");
    return value!.toBoolean();
  }

  set status(value: boolean) {
    this.set("status", Value.fromBoolean(value));
  }

  get createdAt(): BigInt | null {
    let value = this.get("createdAt");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set createdAt(value: BigInt | null) {
    if (!value) {
      this.unset("createdAt");
    } else {
      this.set("createdAt", Value.fromBigInt(<BigInt>value));
    }
  }

  get details(): string {
    let value = this.get("details");
    return value!.toString();
  }

  set details(value: string) {
    this.set("details", Value.fromString(value));
  }

  get maxSupply(): BigInt {
    let value = this.get("maxSupply");
    return value!.toBigInt();
  }

  set maxSupply(value: BigInt) {
    this.set("maxSupply", Value.fromBigInt(value));
  }

  get eligibility(): string {
    let value = this.get("eligibility");
    return value!.toString();
  }

  set eligibility(value: string) {
    this.set("eligibility", Value.fromString(value));
  }

  get toggle(): string {
    let value = this.get("toggle");
    return value!.toString();
  }

  set toggle(value: string) {
    this.set("toggle", Value.fromString(value));
  }

  get mutable(): boolean {
    let value = this.get("mutable");
    return value!.toBoolean();
  }

  set mutable(value: boolean) {
    this.set("mutable", Value.fromBoolean(value));
  }

  get imageUri(): string {
    let value = this.get("imageUri");
    return value!.toString();
  }

  set imageUri(value: string) {
    this.set("imageUri", Value.fromString(value));
  }

  get levelAtLocalTree(): i32 {
    let value = this.get("levelAtLocalTree");
    return value!.toI32();
  }

  set levelAtLocalTree(value: i32) {
    this.set("levelAtLocalTree", Value.fromI32(value));
  }

  get currentSupply(): BigInt {
    let value = this.get("currentSupply");
    return value!.toBigInt();
  }

  set currentSupply(value: BigInt) {
    this.set("currentSupply", Value.fromBigInt(value));
  }

  get tree(): string {
    let value = this.get("tree");
    return value!.toString();
  }

  set tree(value: string) {
    this.set("tree", Value.fromString(value));
  }

  get wearers(): Array<string> {
    let value = this.get("wearers");
    return value!.toStringArray();
  }

  set wearers(value: Array<string>) {
    this.set("wearers", Value.fromStringArray(value));
  }

  get admin(): string {
    let value = this.get("admin");
    return value!.toString();
  }

  set admin(value: string) {
    this.set("admin", Value.fromString(value));
  }

  get badStandings(): Array<string> {
    let value = this.get("badStandings");
    return value!.toStringArray();
  }

  set badStandings(value: Array<string>) {
    this.set("badStandings", Value.fromStringArray(value));
  }

  get linkRequestFromTree(): Array<string> {
    let value = this.get("linkRequestFromTree");
    return value!.toStringArray();
  }

  set linkRequestFromTree(value: Array<string>) {
    this.set("linkRequestFromTree", Value.fromStringArray(value));
  }

  get subHats(): Array<string> {
    let value = this.get("subHats");
    return value!.toStringArray();
  }

  set subHats(value: Array<string>) {
    this.set("subHats", Value.fromStringArray(value));
  }

  get linkedTrees(): Array<string> {
    let value = this.get("linkedTrees");
    return value!.toStringArray();
  }

  set linkedTrees(value: Array<string>) {
    this.set("linkedTrees", Value.fromStringArray(value));
  }

  get events(): Array<string> {
    let value = this.get("events");
    return value!.toStringArray();
  }

  set events(value: Array<string>) {
    this.set("events", Value.fromStringArray(value));
  }
}

export class Wearer extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Wearer entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Wearer must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Wearer", id.toString(), this);
    }
  }

  static load(id: string): Wearer | null {
    return changetype<Wearer | null>(store.get("Wearer", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get currentHats(): Array<string> {
    let value = this.get("currentHats");
    return value!.toStringArray();
  }

  set currentHats(value: Array<string>) {
    this.set("currentHats", Value.fromStringArray(value));
  }

  get mintEvent(): Array<string> {
    let value = this.get("mintEvent");
    return value!.toStringArray();
  }

  set mintEvent(value: Array<string>) {
    this.set("mintEvent", Value.fromStringArray(value));
  }

  get burnEvent(): Array<string> {
    let value = this.get("burnEvent");
    return value!.toStringArray();
  }

  set burnEvent(value: Array<string>) {
    this.set("burnEvent", Value.fromStringArray(value));
  }
}

export class Tree extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Tree entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Tree must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Tree", id.toString(), this);
    }
  }

  static load(id: string): Tree | null {
    return changetype<Tree | null>(store.get("Tree", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get childOfTree(): string | null {
    let value = this.get("childOfTree");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set childOfTree(value: string | null) {
    if (!value) {
      this.unset("childOfTree");
    } else {
      this.set("childOfTree", Value.fromString(<string>value));
    }
  }

  get linkedToHat(): string | null {
    let value = this.get("linkedToHat");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set linkedToHat(value: string | null) {
    if (!value) {
      this.unset("linkedToHat");
    } else {
      this.set("linkedToHat", Value.fromString(<string>value));
    }
  }

  get requestedLinkToTree(): string | null {
    let value = this.get("requestedLinkToTree");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set requestedLinkToTree(value: string | null) {
    if (!value) {
      this.unset("requestedLinkToTree");
    } else {
      this.set("requestedLinkToTree", Value.fromString(<string>value));
    }
  }

  get requestedLinkToHat(): string | null {
    let value = this.get("requestedLinkToHat");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set requestedLinkToHat(value: string | null) {
    if (!value) {
      this.unset("requestedLinkToHat");
    } else {
      this.set("requestedLinkToHat", Value.fromString(<string>value));
    }
  }

  get linkRequestFromTree(): Array<string> {
    let value = this.get("linkRequestFromTree");
    return value!.toStringArray();
  }

  set linkRequestFromTree(value: Array<string>) {
    this.set("linkRequestFromTree", Value.fromStringArray(value));
  }

  get hats(): Array<string> {
    let value = this.get("hats");
    return value!.toStringArray();
  }

  set hats(value: Array<string>) {
    this.set("hats", Value.fromStringArray(value));
  }

  get parentOfTrees(): Array<string> {
    let value = this.get("parentOfTrees");
    return value!.toStringArray();
  }

  set parentOfTrees(value: Array<string>) {
    this.set("parentOfTrees", Value.fromStringArray(value));
  }

  get events(): Array<string> {
    let value = this.get("events");
    return value!.toStringArray();
  }

  set events(value: Array<string>) {
    this.set("events", Value.fromStringArray(value));
  }
}

export class HatCreatedEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save HatCreatedEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type HatCreatedEvent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("HatCreatedEvent", id.toString(), this);
    }
  }

  static load(id: string): HatCreatedEvent | null {
    return changetype<HatCreatedEvent | null>(store.get("HatCreatedEvent", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tree(): string {
    let value = this.get("tree");
    return value!.toString();
  }

  set tree(value: string) {
    this.set("tree", Value.fromString(value));
  }

  get hat(): string {
    let value = this.get("hat");
    return value!.toString();
  }

  set hat(value: string) {
    this.set("hat", Value.fromString(value));
  }

  get blockNumber(): i32 {
    let value = this.get("blockNumber");
    return value!.toI32();
  }

  set blockNumber(value: i32) {
    this.set("blockNumber", Value.fromI32(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get transactionID(): Bytes {
    let value = this.get("transactionID");
    return value!.toBytes();
  }

  set transactionID(value: Bytes) {
    this.set("transactionID", Value.fromBytes(value));
  }

  get hatDetails(): string {
    let value = this.get("hatDetails");
    return value!.toString();
  }

  set hatDetails(value: string) {
    this.set("hatDetails", Value.fromString(value));
  }

  get hatMaxSupply(): BigInt {
    let value = this.get("hatMaxSupply");
    return value!.toBigInt();
  }

  set hatMaxSupply(value: BigInt) {
    this.set("hatMaxSupply", Value.fromBigInt(value));
  }

  get hatEligibility(): string {
    let value = this.get("hatEligibility");
    return value!.toString();
  }

  set hatEligibility(value: string) {
    this.set("hatEligibility", Value.fromString(value));
  }

  get hatToggle(): string {
    let value = this.get("hatToggle");
    return value!.toString();
  }

  set hatToggle(value: string) {
    this.set("hatToggle", Value.fromString(value));
  }

  get hatMutable(): boolean {
    let value = this.get("hatMutable");
    return value!.toBoolean();
  }

  set hatMutable(value: boolean) {
    this.set("hatMutable", Value.fromBoolean(value));
  }

  get hatImageUri(): string {
    let value = this.get("hatImageUri");
    return value!.toString();
  }

  set hatImageUri(value: string) {
    this.set("hatImageUri", Value.fromString(value));
  }
}

export class HatMintedEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save HatMintedEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type HatMintedEvent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("HatMintedEvent", id.toString(), this);
    }
  }

  static load(id: string): HatMintedEvent | null {
    return changetype<HatMintedEvent | null>(store.get("HatMintedEvent", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tree(): string {
    let value = this.get("tree");
    return value!.toString();
  }

  set tree(value: string) {
    this.set("tree", Value.fromString(value));
  }

  get hat(): string {
    let value = this.get("hat");
    return value!.toString();
  }

  set hat(value: string) {
    this.set("hat", Value.fromString(value));
  }

  get blockNumber(): i32 {
    let value = this.get("blockNumber");
    return value!.toI32();
  }

  set blockNumber(value: i32) {
    this.set("blockNumber", Value.fromI32(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get transactionID(): Bytes {
    let value = this.get("transactionID");
    return value!.toBytes();
  }

  set transactionID(value: Bytes) {
    this.set("transactionID", Value.fromBytes(value));
  }

  get wearer(): string {
    let value = this.get("wearer");
    return value!.toString();
  }

  set wearer(value: string) {
    this.set("wearer", Value.fromString(value));
  }

  get operator(): string {
    let value = this.get("operator");
    return value!.toString();
  }

  set operator(value: string) {
    this.set("operator", Value.fromString(value));
  }
}

export class HatBurnedEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save HatBurnedEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type HatBurnedEvent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("HatBurnedEvent", id.toString(), this);
    }
  }

  static load(id: string): HatBurnedEvent | null {
    return changetype<HatBurnedEvent | null>(store.get("HatBurnedEvent", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tree(): string {
    let value = this.get("tree");
    return value!.toString();
  }

  set tree(value: string) {
    this.set("tree", Value.fromString(value));
  }

  get hat(): string {
    let value = this.get("hat");
    return value!.toString();
  }

  set hat(value: string) {
    this.set("hat", Value.fromString(value));
  }

  get blockNumber(): i32 {
    let value = this.get("blockNumber");
    return value!.toI32();
  }

  set blockNumber(value: i32) {
    this.set("blockNumber", Value.fromI32(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get transactionID(): Bytes {
    let value = this.get("transactionID");
    return value!.toBytes();
  }

  set transactionID(value: Bytes) {
    this.set("transactionID", Value.fromBytes(value));
  }

  get wearer(): string {
    let value = this.get("wearer");
    return value!.toString();
  }

  set wearer(value: string) {
    this.set("wearer", Value.fromString(value));
  }

  get operator(): string {
    let value = this.get("operator");
    return value!.toString();
  }

  set operator(value: string) {
    this.set("operator", Value.fromString(value));
  }
}

export class HatStatusChangedEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save HatStatusChangedEvent entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type HatStatusChangedEvent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("HatStatusChangedEvent", id.toString(), this);
    }
  }

  static load(id: string): HatStatusChangedEvent | null {
    return changetype<HatStatusChangedEvent | null>(
      store.get("HatStatusChangedEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tree(): string {
    let value = this.get("tree");
    return value!.toString();
  }

  set tree(value: string) {
    this.set("tree", Value.fromString(value));
  }

  get hat(): string {
    let value = this.get("hat");
    return value!.toString();
  }

  set hat(value: string) {
    this.set("hat", Value.fromString(value));
  }

  get blockNumber(): i32 {
    let value = this.get("blockNumber");
    return value!.toI32();
  }

  set blockNumber(value: i32) {
    this.set("blockNumber", Value.fromI32(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get transactionID(): Bytes {
    let value = this.get("transactionID");
    return value!.toBytes();
  }

  set transactionID(value: Bytes) {
    this.set("transactionID", Value.fromBytes(value));
  }

  get hatNewStatus(): boolean {
    let value = this.get("hatNewStatus");
    return value!.toBoolean();
  }

  set hatNewStatus(value: boolean) {
    this.set("hatNewStatus", Value.fromBoolean(value));
  }
}

export class HatDetailsChangedEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save HatDetailsChangedEvent entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type HatDetailsChangedEvent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("HatDetailsChangedEvent", id.toString(), this);
    }
  }

  static load(id: string): HatDetailsChangedEvent | null {
    return changetype<HatDetailsChangedEvent | null>(
      store.get("HatDetailsChangedEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tree(): string {
    let value = this.get("tree");
    return value!.toString();
  }

  set tree(value: string) {
    this.set("tree", Value.fromString(value));
  }

  get hat(): string {
    let value = this.get("hat");
    return value!.toString();
  }

  set hat(value: string) {
    this.set("hat", Value.fromString(value));
  }

  get blockNumber(): i32 {
    let value = this.get("blockNumber");
    return value!.toI32();
  }

  set blockNumber(value: i32) {
    this.set("blockNumber", Value.fromI32(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get transactionID(): Bytes {
    let value = this.get("transactionID");
    return value!.toBytes();
  }

  set transactionID(value: Bytes) {
    this.set("transactionID", Value.fromBytes(value));
  }

  get hatNewDetails(): string {
    let value = this.get("hatNewDetails");
    return value!.toString();
  }

  set hatNewDetails(value: string) {
    this.set("hatNewDetails", Value.fromString(value));
  }
}

export class HatEligibilityChangedEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save HatEligibilityChangedEvent entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type HatEligibilityChangedEvent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("HatEligibilityChangedEvent", id.toString(), this);
    }
  }

  static load(id: string): HatEligibilityChangedEvent | null {
    return changetype<HatEligibilityChangedEvent | null>(
      store.get("HatEligibilityChangedEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tree(): string {
    let value = this.get("tree");
    return value!.toString();
  }

  set tree(value: string) {
    this.set("tree", Value.fromString(value));
  }

  get hat(): string {
    let value = this.get("hat");
    return value!.toString();
  }

  set hat(value: string) {
    this.set("hat", Value.fromString(value));
  }

  get blockNumber(): i32 {
    let value = this.get("blockNumber");
    return value!.toI32();
  }

  set blockNumber(value: i32) {
    this.set("blockNumber", Value.fromI32(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get transactionID(): Bytes {
    let value = this.get("transactionID");
    return value!.toBytes();
  }

  set transactionID(value: Bytes) {
    this.set("transactionID", Value.fromBytes(value));
  }

  get hatNewEligibility(): string {
    let value = this.get("hatNewEligibility");
    return value!.toString();
  }

  set hatNewEligibility(value: string) {
    this.set("hatNewEligibility", Value.fromString(value));
  }
}

export class HatToggleChangedEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save HatToggleChangedEvent entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type HatToggleChangedEvent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("HatToggleChangedEvent", id.toString(), this);
    }
  }

  static load(id: string): HatToggleChangedEvent | null {
    return changetype<HatToggleChangedEvent | null>(
      store.get("HatToggleChangedEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tree(): string {
    let value = this.get("tree");
    return value!.toString();
  }

  set tree(value: string) {
    this.set("tree", Value.fromString(value));
  }

  get hat(): string {
    let value = this.get("hat");
    return value!.toString();
  }

  set hat(value: string) {
    this.set("hat", Value.fromString(value));
  }

  get blockNumber(): i32 {
    let value = this.get("blockNumber");
    return value!.toI32();
  }

  set blockNumber(value: i32) {
    this.set("blockNumber", Value.fromI32(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get transactionID(): Bytes {
    let value = this.get("transactionID");
    return value!.toBytes();
  }

  set transactionID(value: Bytes) {
    this.set("transactionID", Value.fromBytes(value));
  }

  get hatNewToggle(): string {
    let value = this.get("hatNewToggle");
    return value!.toString();
  }

  set hatNewToggle(value: string) {
    this.set("hatNewToggle", Value.fromString(value));
  }
}

export class HatMutabilityChangedEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save HatMutabilityChangedEvent entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type HatMutabilityChangedEvent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("HatMutabilityChangedEvent", id.toString(), this);
    }
  }

  static load(id: string): HatMutabilityChangedEvent | null {
    return changetype<HatMutabilityChangedEvent | null>(
      store.get("HatMutabilityChangedEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tree(): string {
    let value = this.get("tree");
    return value!.toString();
  }

  set tree(value: string) {
    this.set("tree", Value.fromString(value));
  }

  get hat(): string {
    let value = this.get("hat");
    return value!.toString();
  }

  set hat(value: string) {
    this.set("hat", Value.fromString(value));
  }

  get blockNumber(): i32 {
    let value = this.get("blockNumber");
    return value!.toI32();
  }

  set blockNumber(value: i32) {
    this.set("blockNumber", Value.fromI32(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get transactionID(): Bytes {
    let value = this.get("transactionID");
    return value!.toBytes();
  }

  set transactionID(value: Bytes) {
    this.set("transactionID", Value.fromBytes(value));
  }
}

export class HatMaxSupplyChangedEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save HatMaxSupplyChangedEvent entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type HatMaxSupplyChangedEvent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("HatMaxSupplyChangedEvent", id.toString(), this);
    }
  }

  static load(id: string): HatMaxSupplyChangedEvent | null {
    return changetype<HatMaxSupplyChangedEvent | null>(
      store.get("HatMaxSupplyChangedEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tree(): string {
    let value = this.get("tree");
    return value!.toString();
  }

  set tree(value: string) {
    this.set("tree", Value.fromString(value));
  }

  get hat(): string {
    let value = this.get("hat");
    return value!.toString();
  }

  set hat(value: string) {
    this.set("hat", Value.fromString(value));
  }

  get blockNumber(): i32 {
    let value = this.get("blockNumber");
    return value!.toI32();
  }

  set blockNumber(value: i32) {
    this.set("blockNumber", Value.fromI32(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get transactionID(): Bytes {
    let value = this.get("transactionID");
    return value!.toBytes();
  }

  set transactionID(value: Bytes) {
    this.set("transactionID", Value.fromBytes(value));
  }

  get hatNewMaxSupply(): BigInt {
    let value = this.get("hatNewMaxSupply");
    return value!.toBigInt();
  }

  set hatNewMaxSupply(value: BigInt) {
    this.set("hatNewMaxSupply", Value.fromBigInt(value));
  }
}

export class HatImageURIChangedEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save HatImageURIChangedEvent entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type HatImageURIChangedEvent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("HatImageURIChangedEvent", id.toString(), this);
    }
  }

  static load(id: string): HatImageURIChangedEvent | null {
    return changetype<HatImageURIChangedEvent | null>(
      store.get("HatImageURIChangedEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tree(): string {
    let value = this.get("tree");
    return value!.toString();
  }

  set tree(value: string) {
    this.set("tree", Value.fromString(value));
  }

  get hat(): string {
    let value = this.get("hat");
    return value!.toString();
  }

  set hat(value: string) {
    this.set("hat", Value.fromString(value));
  }

  get blockNumber(): i32 {
    let value = this.get("blockNumber");
    return value!.toI32();
  }

  set blockNumber(value: i32) {
    this.set("blockNumber", Value.fromI32(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get transactionID(): Bytes {
    let value = this.get("transactionID");
    return value!.toBytes();
  }

  set transactionID(value: Bytes) {
    this.set("transactionID", Value.fromBytes(value));
  }

  get hatNewImageURI(): string {
    let value = this.get("hatNewImageURI");
    return value!.toString();
  }

  set hatNewImageURI(value: string) {
    this.set("hatNewImageURI", Value.fromString(value));
  }
}

export class TopHatLinkRequestedEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save TopHatLinkRequestedEvent entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TopHatLinkRequestedEvent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("TopHatLinkRequestedEvent", id.toString(), this);
    }
  }

  static load(id: string): TopHatLinkRequestedEvent | null {
    return changetype<TopHatLinkRequestedEvent | null>(
      store.get("TopHatLinkRequestedEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tree(): string {
    let value = this.get("tree");
    return value!.toString();
  }

  set tree(value: string) {
    this.set("tree", Value.fromString(value));
  }

  get hat(): string {
    let value = this.get("hat");
    return value!.toString();
  }

  set hat(value: string) {
    this.set("hat", Value.fromString(value));
  }

  get blockNumber(): i32 {
    let value = this.get("blockNumber");
    return value!.toI32();
  }

  set blockNumber(value: i32) {
    this.set("blockNumber", Value.fromI32(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get transactionID(): Bytes {
    let value = this.get("transactionID");
    return value!.toBytes();
  }

  set transactionID(value: Bytes) {
    this.set("transactionID", Value.fromBytes(value));
  }

  get newAdmin(): string {
    let value = this.get("newAdmin");
    return value!.toString();
  }

  set newAdmin(value: string) {
    this.set("newAdmin", Value.fromString(value));
  }
}

export class TopHatLinkedEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TopHatLinkedEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TopHatLinkedEvent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("TopHatLinkedEvent", id.toString(), this);
    }
  }

  static load(id: string): TopHatLinkedEvent | null {
    return changetype<TopHatLinkedEvent | null>(
      store.get("TopHatLinkedEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tree(): string {
    let value = this.get("tree");
    return value!.toString();
  }

  set tree(value: string) {
    this.set("tree", Value.fromString(value));
  }

  get hat(): string {
    let value = this.get("hat");
    return value!.toString();
  }

  set hat(value: string) {
    this.set("hat", Value.fromString(value));
  }

  get blockNumber(): i32 {
    let value = this.get("blockNumber");
    return value!.toI32();
  }

  set blockNumber(value: i32) {
    this.set("blockNumber", Value.fromI32(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get transactionID(): Bytes {
    let value = this.get("transactionID");
    return value!.toBytes();
  }

  set transactionID(value: Bytes) {
    this.set("transactionID", Value.fromBytes(value));
  }

  get newAdmin(): string {
    let value = this.get("newAdmin");
    return value!.toString();
  }

  set newAdmin(value: string) {
    this.set("newAdmin", Value.fromString(value));
  }
}

export class WearerStandingChangedEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save WearerStandingChangedEvent entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type WearerStandingChangedEvent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("WearerStandingChangedEvent", id.toString(), this);
    }
  }

  static load(id: string): WearerStandingChangedEvent | null {
    return changetype<WearerStandingChangedEvent | null>(
      store.get("WearerStandingChangedEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tree(): string {
    let value = this.get("tree");
    return value!.toString();
  }

  set tree(value: string) {
    this.set("tree", Value.fromString(value));
  }

  get hat(): string {
    let value = this.get("hat");
    return value!.toString();
  }

  set hat(value: string) {
    this.set("hat", Value.fromString(value));
  }

  get blockNumber(): i32 {
    let value = this.get("blockNumber");
    return value!.toI32();
  }

  set blockNumber(value: i32) {
    this.set("blockNumber", Value.fromI32(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get transactionID(): Bytes {
    let value = this.get("transactionID");
    return value!.toBytes();
  }

  set transactionID(value: Bytes) {
    this.set("transactionID", Value.fromBytes(value));
  }

  get wearer(): string {
    let value = this.get("wearer");
    return value!.toString();
  }

  set wearer(value: string) {
    this.set("wearer", Value.fromString(value));
  }

  get wearerStanding(): boolean {
    let value = this.get("wearerStanding");
    return value!.toBoolean();
  }

  set wearerStanding(value: boolean) {
    this.set("wearerStanding", Value.fromBoolean(value));
  }
}
