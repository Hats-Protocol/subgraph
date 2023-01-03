import {
    Address,
    BigInt,
    log
} from '@graphprotocol/graph-ts';
import {
    beforeEach,
    describe,
    test,
    assert,
    logStore
} from 'matchstick-as/assembly/index';
import {
    handleHatCreated,
    handleTransferSingle,
    handleHatDetailsChanged,
    handleHatEligibilityChanged,
    handleHatToggleChanged,
    handleHatImageURIChanged,
    handleHatMaxSupplyChanged,
    handleHatMutabilityChanged,
    handleHatStatusChanged
} from '../src/hats';
import {
    createHatCreatedEvent,
    mockTransferSingleEvent,
    mockHatDetailsChangedEvent,
    mockHatEligibilityChangedEvent,
    mockHatToggleChangedEvent,
    mockHatImageUriChangedEvent,
    mockHatMaxSupplyChangedEvent,
    mockHatMutabilityChangedEvent,
    mockHatStatusChangedEvent
} from './utils';

const address1: string = "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const address2: string = "0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";
const address3: string = "0xcccccccccccccccccccccccccccccccccccccccc";
let topHatId = "0x0000000100000000000000000000000000000000000000000000000000000000";

describe('basic test', () => {
    describe('when 0x00000001 is created and minted to wearer1', () => {
        beforeEach(() => {
            let hatCreatedEvent = createHatCreatedEvent(
                topHatId,
                "hat_details_00000001",
                BigInt.fromI32(1),
                Address.zero(),
                Address.zero(),
                false,
                "imageURI_00000001",
                0,
                topHatId
            );

            handleHatCreated(hatCreatedEvent);

            let transferSingleEvent = mockTransferSingleEvent(
                Address.fromString(address1),
                Address.zero(),
                Address.fromString(address1),
                topHatId,
                BigInt.fromU32(1)
            );

            handleTransferSingle(transferSingleEvent);
        });

        test("check hat 0x00000001 fields", () => {
            //logStore();
            assert.fieldEquals('Hat', "0x0000000100000000000000000000000000000000000000000000000000000000", "eligibility", Address.zero().toHexString());
            assert.fieldEquals('Hat', "0x0000000100000000000000000000000000000000000000000000000000000000", "toggle", Address.zero().toHexString());
            assert.fieldEquals('Hat', "0x0000000100000000000000000000000000000000000000000000000000000000", "id", "0x0000000100000000000000000000000000000000000000000000000000000000");
            assert.fieldEquals('Hat', "0x0000000100000000000000000000000000000000000000000000000000000000", "details", "hat_details_00000001");
            assert.fieldEquals('Hat', "0x0000000100000000000000000000000000000000000000000000000000000000", "maxSupply", "1");
            assert.fieldEquals('Hat', "0x0000000100000000000000000000000000000000000000000000000000000000", "mutable", "false");
            assert.fieldEquals('Hat', "0x0000000100000000000000000000000000000000000000000000000000000000", "imageUri", "imageURI_00000001");
            assert.fieldEquals('Hat', "0x0000000100000000000000000000000000000000000000000000000000000000", "prettyId", "0x00000001");
            assert.fieldEquals('Hat', "0x0000000100000000000000000000000000000000000000000000000000000000", "level", "0");
            assert.fieldEquals('Hat', "0x0000000100000000000000000000000000000000000000000000000000000000", "currentSupply", "1");
            assert.fieldEquals('Hat', "0x0000000100000000000000000000000000000000000000000000000000000000", "tree", "0x00000001");
            assert.fieldEquals('Hat', "0x0000000100000000000000000000000000000000000000000000000000000000", "wearers", `[${address1}]`);
            assert.fieldEquals('Hat', "0x0000000100000000000000000000000000000000000000000000000000000000", "admin", "0x0000000100000000000000000000000000000000000000000000000000000000");
            assert.fieldEquals('Hat', "0x0000000100000000000000000000000000000000000000000000000000000000", "subHats", "[0x0000000100000000000000000000000000000000000000000000000000000000]");
        });

        describe('and 0x00000001 is renounced by wearer1', () => {
            beforeEach(() => {
                let transferSingleEvent = mockTransferSingleEvent(
                    Address.fromString(address1),
                    Address.fromString(address1),
                    Address.zero(),
                    "0x0000000100000000000000000000000000000000000000000000000000000000",
                    BigInt.fromU32(1)
                );

                handleTransferSingle(transferSingleEvent);
            });

            test("check hat burned", () => {
                assert.fieldEquals('Hat', "0x0000000100000000000000000000000000000000000000000000000000000000", "wearers", "[]");
                assert.fieldEquals('Hat', "0x0000000100000000000000000000000000000000000000000000000000000000", "currentSupply", "0");

            });
        });

        describe('and 0x00000001.01 is created', () => {
            beforeEach(() => {
                let hatCreatedEvent = createHatCreatedEvent(
                    "0x0000000101000000000000000000000000000000000000000000000000000000",
                    "hat_details_0000000101",
                    BigInt.fromI32(3),
                    Address.fromString(address1),
                    Address.fromString(address1),
                    true,
                    "imageURI_0000000101",
                    1,
                    topHatId
                );

                handleHatCreated(hatCreatedEvent);
            });

            test("check hat 0x00000001.01 fields", () => {
                assert.fieldEquals('Hat', "0x0000000101000000000000000000000000000000000000000000000000000000", "eligibility", address1);
                assert.fieldEquals('Hat', "0x0000000101000000000000000000000000000000000000000000000000000000", "toggle", address1);
                assert.fieldEquals('Hat', "0x0000000101000000000000000000000000000000000000000000000000000000", "id", "0x0000000101000000000000000000000000000000000000000000000000000000");
                assert.fieldEquals('Hat', "0x0000000101000000000000000000000000000000000000000000000000000000", "details", "hat_details_0000000101");
                assert.fieldEquals('Hat', "0x0000000101000000000000000000000000000000000000000000000000000000", "maxSupply", "3");
                assert.fieldEquals('Hat', "0x0000000101000000000000000000000000000000000000000000000000000000", "mutable", "true");
                assert.fieldEquals('Hat', "0x0000000101000000000000000000000000000000000000000000000000000000", "imageUri", "imageURI_0000000101");
                assert.fieldEquals('Hat', "0x0000000101000000000000000000000000000000000000000000000000000000", "prettyId", "0x00000001.01");
                assert.fieldEquals('Hat', "0x0000000101000000000000000000000000000000000000000000000000000000", "level", "1");
                assert.fieldEquals('Hat', "0x0000000101000000000000000000000000000000000000000000000000000000", "currentSupply", "0");
                assert.fieldEquals('Hat', "0x0000000101000000000000000000000000000000000000000000000000000000", "tree", "0x00000001");
                assert.fieldEquals('Hat', "0x0000000101000000000000000000000000000000000000000000000000000000", "wearers", "[]");
                assert.fieldEquals('Hat', "0x0000000101000000000000000000000000000000000000000000000000000000", "admin", "0x0000000100000000000000000000000000000000000000000000000000000000");
                assert.fieldEquals('Hat', "0x0000000101000000000000000000000000000000000000000000000000000000", "subHats", "[]");
                assert.fieldEquals("Wearer", address1, "currentHats", "[0x0000000100000000000000000000000000000000000000000000000000000000]")
            });

            describe("and 0x00000001.01 is minted to wearer2", () => {
                beforeEach(() => {
                    let transferSingleEvent = mockTransferSingleEvent(
                        Address.fromString(address1),
                        Address.zero(),
                        Address.fromString(address2),
                        "0x0000000101000000000000000000000000000000000000000000000000000000",
                        BigInt.fromU32(1)
                    );

                    handleTransferSingle(transferSingleEvent);
                });

                test("check wearer2 has hat 0x00000001.01", () => {
                    assert.fieldEquals('Hat', "0x0000000101000000000000000000000000000000000000000000000000000000", "wearers", `[${address2}]`);
                    assert.fieldEquals('Wearer', address2, "currentHats", "[0x0000000101000000000000000000000000000000000000000000000000000000]");
                });

                describe("and 0x00000001.01 is burned for wearer2", () => {
                    beforeEach(() => {
                        let transferSingleEvent = mockTransferSingleEvent(
                            Address.fromString(address1),
                            Address.fromString(address2),
                            Address.zero(),
                            "0x0000000101000000000000000000000000000000000000000000000000000000",
                            BigInt.fromU32(1)
                        );

                        handleTransferSingle(transferSingleEvent);
                    });

                    test("check hat burned", () => {
                        assert.fieldEquals('Hat', "0x0000000101000000000000000000000000000000000000000000000000000000", "wearers", "[]");
                    });
                });

                describe("and hat 0x00000001.01 is minted to wearer1", () => {
                    beforeEach(() => {
                        let transferSingleEvent = mockTransferSingleEvent(
                            Address.fromString(address1),
                            Address.zero(),
                            Address.fromString(address1),
                            "0x0000000101000000000000000000000000000000000000000000000000000000",
                            BigInt.fromU32(1)
                        );

                        handleTransferSingle(transferSingleEvent);
                    });

                    test("check wearer1 has hat 0x00000001.01", () => {
                        assert.fieldEquals('Hat', "0x0000000101000000000000000000000000000000000000000000000000000000", "wearers", `[${address2}, ${address1}]`);
                    });
                });

                describe("and hat 0x00000001.01 is transferred from wearer2 to wearer1", () => {
                    beforeEach(() => {
                        let transferSingleEvent = mockTransferSingleEvent(
                            Address.fromString(address1),
                            Address.fromString(address2),
                            Address.fromString(address1),
                            "0x0000000101000000000000000000000000000000000000000000000000000000",
                            BigInt.fromU32(1)
                        );

                        handleTransferSingle(transferSingleEvent);
                    });

                    test("check hat 0x00000001.01 transferred", () => {
                        assert.fieldEquals('Hat', "0x0000000101000000000000000000000000000000000000000000000000000000", "wearers", `[${address1}]`);
                    });
                });

                describe("and hat 0x00000001.01 details changed", () => {
                    beforeEach(() => {
                        let hatDetailsChangedEvent = mockHatDetailsChangedEvent(
                            "0x0000000101000000000000000000000000000000000000000000000000000000",
                            "hat_details_0000000101_changed"
                        );

                        handleHatDetailsChanged(hatDetailsChangedEvent);
                    });

                    test("check hat 0x00000001.01 details changed", () => {
                        assert.fieldEquals('Hat', "0x0000000101000000000000000000000000000000000000000000000000000000", "details", "hat_details_0000000101_changed");
                    });
                });

                describe("and hat 0x00000001.01 eligibilty changed", () => {
                    beforeEach(() => {
                        let hatEligibilityChangedEvent = mockHatEligibilityChangedEvent(
                            "0x0000000101000000000000000000000000000000000000000000000000000000",
                            Address.fromString(address3)
                        );

                        handleHatEligibilityChanged(hatEligibilityChangedEvent);
                    });

                    test("check hat 0x00000001.01 eligibility changed", () => {
                        assert.fieldEquals('Hat', "0x0000000101000000000000000000000000000000000000000000000000000000", "eligibility", address3);
                    });
                });

                describe("and hat 0x00000001.01 toggle changed", () => {
                    beforeEach(() => {
                        let hatToggleChangedEvent = mockHatToggleChangedEvent(
                            "0x0000000101000000000000000000000000000000000000000000000000000000",
                            Address.fromString(address3)
                        );

                        handleHatToggleChanged(hatToggleChangedEvent);
                    });

                    test("check hat 0x00000001.01 toggle changed", () => {
                        assert.fieldEquals('Hat', "0x0000000101000000000000000000000000000000000000000000000000000000", "toggle", address3);
                    });
                });

                describe("and hat 0x00000001.01 image URI changed", () => {
                    beforeEach(() => {
                        let hatImageUriChangedEvent = mockHatImageUriChangedEvent(
                            "0x0000000101000000000000000000000000000000000000000000000000000000",
                            "imageURI_0000000101_changed"
                        );

                        handleHatImageURIChanged(hatImageUriChangedEvent);
                    });

                    test("check hat 0x00000001.01 image URI changed", () => {
                        assert.fieldEquals('Hat', "0x0000000101000000000000000000000000000000000000000000000000000000", "imageUri", "imageURI_0000000101_changed");
                    });
                });

                describe("and hat 0x00000001.01 max supply changed", () => {
                    beforeEach(() => {
                        let hatMaxSupplyChangedEvent = mockHatMaxSupplyChangedEvent(
                            "0x0000000101000000000000000000000000000000000000000000000000000000",
                            BigInt.fromU32(4)
                        );

                        handleHatMaxSupplyChanged(hatMaxSupplyChangedEvent);
                    });

                    test("check hat 0x00000001.01 max supply changed", () => {
                        assert.fieldEquals('Hat', "0x0000000101000000000000000000000000000000000000000000000000000000", "maxSupply", "4");
                    });
                });

                describe("and hat 0x00000001.01 mutability changed", () => {
                    beforeEach(() => {
                        let hatMutabilityChangedEvent = mockHatMutabilityChangedEvent(
                            "0x0000000101000000000000000000000000000000000000000000000000000000"
                        );

                        handleHatMutabilityChanged(hatMutabilityChangedEvent);
                    });

                    test("check hat 0x00000001.01 mutability changed", () => {
                        assert.fieldEquals('Hat', "0x0000000101000000000000000000000000000000000000000000000000000000", "mutable", "false");
                    });
                });

                describe("and hat 0x00000001.01 status changed", () => {
                    beforeEach(() => {
                        let hatStatusChangedEvent = mockHatStatusChangedEvent(
                            "0x0000000101000000000000000000000000000000000000000000000000000000",
                            false
                        );

                        handleHatStatusChanged(hatStatusChangedEvent);
                    });

                    test("check hat 0x00000001.01 status changed", () => {
                        assert.fieldEquals('Hat', "0x0000000101000000000000000000000000000000000000000000000000000000", "status", "false");
                    });
                });
            });
        });
    });
});
