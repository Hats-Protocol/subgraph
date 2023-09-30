import { Address, BigInt, Bytes, log } from "@graphprotocol/graph-ts";
import {
  beforeEach,
  describe,
  test,
  assert,
  logStore,
  beforeAll,
} from "matchstick-as/assembly/index";
import { handleHatCreated, handleTransferSingle } from "../src/hats";
import { handleModuleDeployed } from "../src/hatsModuleFactory";
import {
  handleHatClaimabilitySet,
  handleHatsClaimabilitySet,
} from "../src/multiClaimsHatter";
import {
  createHatCreatedEvent,
  mockTransferSingleEvent,
  mockHatsModuleFactory_ModuleDeployedEvent,
  mockHatClaimabilitySetEvent,
  mockHatsClaimabilityEditedEvent,
} from "./utils";
import { MULTI_CLAIMS_HATTER_IMPLEMENTATION } from "../src/constants";

const address1: string = "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const claimsHatter1: string = "0xdddddddddddddddddddddddddddddddddddddddd";
const topHatId1 =
  "0x0000000100000000000000000000000000000000000000000000000000000000";

describe("basic test", () => {
  describe("Setup tree", () => {
    beforeEach(() => {
      // 0x00000001 is created and minted to wearer1
      let hatCreatedEvent1 = createHatCreatedEvent(
        topHatId1,
        "hat_details_00000001",
        BigInt.fromI32(1),
        Address.zero(),
        Address.zero(),
        false,
        "imageURI_00000001",
        0,
        topHatId1
      );

      handleHatCreated(hatCreatedEvent1);

      let transferSingleEvent1 = mockTransferSingleEvent(
        Address.fromString(address1),
        Address.zero(),
        Address.fromString(address1),
        topHatId1,
        BigInt.fromU32(1)
      );

      handleTransferSingle(transferSingleEvent1);

      // 0x00000001.0001 is created
      let hatCreatedEvent2 = createHatCreatedEvent(
        "0x0000000100010000000000000000000000000000000000000000000000000000",
        "hat_details_000000010001",
        BigInt.fromI32(3),
        Address.fromString(address1),
        Address.fromString(address1),
        true,
        "imageURI_000000010001",
        1,
        topHatId1
      );

      handleHatCreated(hatCreatedEvent2);

      // 0x00000001.0001.0001 is created
      let hatCreatedEvent3 = createHatCreatedEvent(
        "0x0000000100010001000000000000000000000000000000000000000000000000",
        "hat_details_0000000100010001",
        BigInt.fromI32(3),
        Address.fromString(address1),
        Address.fromString(address1),
        true,
        "imageURI_0000000100010001",
        2,
        "0x0000000100010000000000000000000000000000000000000000000000000000"
      );

      handleHatCreated(hatCreatedEvent3);

      // 0x00000001.0001.0001.0001 is created
      let hatCreatedEvent4 = createHatCreatedEvent(
        "0x0000000100010001000100000000000000000000000000000000000000000000",
        "hat_details_00000001000100010001",
        BigInt.fromI32(3),
        Address.fromString(address1),
        Address.fromString(address1),
        true,
        "imageURI_00000001000100010001",
        3,
        "0x0000000100010001000000000000000000000000000000000000000000000000"
      );

      handleHatCreated(hatCreatedEvent4);
    });

    describe("And a MutliClaimsHatter is created without initial hats, and wears 0x00000001.0001", () => {
      beforeEach(() => {
        let multiClaimsHatterCreatedEvent =
          mockHatsModuleFactory_ModuleDeployedEvent(
            Address.fromString(MULTI_CLAIMS_HATTER_IMPLEMENTATION),
            Address.fromString(claimsHatter1),
            "0x0000000100010000000000000000000000000000000000000000000000000000",
            Bytes.fromHexString(""),
            Bytes.fromHexString("")
          );
        handleModuleDeployed(multiClaimsHatterCreatedEvent);

        let transferSingleEvent2 = mockTransferSingleEvent(
          Address.fromString(address1),
          Address.zero(),
          Address.fromString(claimsHatter1),
          "0x0000000100010000000000000000000000000000000000000000000000000000",
          BigInt.fromU32(1)
        );

        handleTransferSingle(transferSingleEvent2);
      });

      test("Test created claims hatter", () => {
        assert.fieldEquals(
          "ClaimsHatter",
          claimsHatter1,
          "claimableHats",
          "[]"
        );
        assert.fieldEquals(
          "ClaimsHatter",
          claimsHatter1,
          "claimableForHats",
          "[]"
        );
      });

      describe("And hats 0x00000001.0001.0001, 0x00000001.0001.0001.0001 are registered", () => {
        beforeEach(() => {
          let hatClaimabilityEditedEvent1 = mockHatClaimabilitySetEvent(
            Address.fromString(claimsHatter1),
            "0x0000000100010001000000000000000000000000000000000000000000000000",
            1
          );
          handleHatClaimabilitySet(hatClaimabilityEditedEvent1);

          let hatClaimabilityEditedEvent2 = mockHatClaimabilitySetEvent(
            Address.fromString(claimsHatter1),
            "0x0000000100010001000100000000000000000000000000000000000000000000",
            2
          );
          handleHatClaimabilitySet(hatClaimabilityEditedEvent2);
        });

        test("Test hats registered", () => {
          assert.fieldEquals(
            "ClaimsHatter",
            claimsHatter1,
            "claimableHats",
            "[0x0000000100010001000000000000000000000000000000000000000000000000, 0x0000000100010001000100000000000000000000000000000000000000000000]"
          );
          assert.fieldEquals(
            "ClaimsHatter",
            claimsHatter1,
            "claimableForHats",
            "[0x0000000100010001000100000000000000000000000000000000000000000000]"
          );
        });

        describe("And hat 0x00000001.0001.0001 is unregistered", () => {
          beforeEach(() => {
            let hatUnregisteredEvent = mockHatClaimabilitySetEvent(
              Address.fromString(claimsHatter1),
              "0x0000000100010001000000000000000000000000000000000000000000000000",
              0
            );
            handleHatClaimabilitySet(hatUnregisteredEvent);
          });

          test("Test hats registered", () => {
            assert.fieldEquals(
              "ClaimsHatter",
              claimsHatter1,
              "claimableHats",
              "[0x0000000100010001000100000000000000000000000000000000000000000000]"
            );
            assert.fieldEquals(
              "ClaimsHatter",
              claimsHatter1,
              "claimableForHats",
              "[0x0000000100010001000100000000000000000000000000000000000000000000]"
            );
          });
        });
      });
    });

    describe("And a MutliClaimsHatter is created with initial hats, and wears 0x00000001.0001", () => {
      beforeEach(() => {
        let multiClaimsHatterCreatedEvent =
          mockHatsModuleFactory_ModuleDeployedEvent(
            Address.fromString(MULTI_CLAIMS_HATTER_IMPLEMENTATION),
            Address.fromString(claimsHatter1),
            "0x0000000100010000000000000000000000000000000000000000000000000000",
            Bytes.fromHexString(""),
            Bytes.fromHexString("")
          );
        handleModuleDeployed(multiClaimsHatterCreatedEvent);

        const initialClaimableHats: string[] = [
          "0x0000000100010001000000000000000000000000000000000000000000000000",
          "0x0000000100010001000100000000000000000000000000000000000000000000",
        ];
        const initialClaimabilityTypes: i32[] = [1, 2];
        let hatsClaimabilityEditedEvent = mockHatsClaimabilityEditedEvent(
          Address.fromString(claimsHatter1),
          initialClaimableHats,
          initialClaimabilityTypes
        );
        handleHatsClaimabilitySet(hatsClaimabilityEditedEvent);

        let transferSingleEvent2 = mockTransferSingleEvent(
          Address.fromString(address1),
          Address.zero(),
          Address.fromString(claimsHatter1),
          "0x0000000100010000000000000000000000000000000000000000000000000000",
          BigInt.fromU32(1)
        );

        handleTransferSingle(transferSingleEvent2);
      });

      test("Test created claims hatter", () => {
        assert.fieldEquals(
          "ClaimsHatter",
          claimsHatter1,
          "claimableHats",
          "[0x0000000100010001000000000000000000000000000000000000000000000000, 0x0000000100010001000100000000000000000000000000000000000000000000]"
        );
        assert.fieldEquals(
          "ClaimsHatter",
          claimsHatter1,
          "claimableForHats",
          "[0x0000000100010001000100000000000000000000000000000000000000000000]"
        );
      });
    });
  });
});
