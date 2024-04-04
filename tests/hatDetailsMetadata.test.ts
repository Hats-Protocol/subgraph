import {
  Address,
  BigInt,
  Bytes,
  log,
  DataSourceContext,
} from "@graphprotocol/graph-ts";
import {
  beforeEach,
  describe,
  test,
  assert,
  logStore,
  beforeAll,
  logDataSources,
  dataSourceMock,
  readFile,
} from "matchstick-as";
import { handleHatCreated, handleTransferSingle } from "../src/hats";
import { handleHatDetailsMetaData } from "../src/hatDetailsMetaData";
import { createHatCreatedEvent, mockTransferSingleEvent } from "./utils";

const address1: string = "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const topHatId1 =
  "0x0000000100000000000000000000000000000000000000000000000000000000";
const topHatId2 =
  "0x0000000200000000000000000000000000000000000000000000000000000000";

const cid1 = "bafkreiffngmobubcbw7l5blrftfdbrkfrokf6piaklksj73ictdj6mtpvq";
const cid2 = "bafkreiffngmobubcbw7l5blrftfdbrkfrokf6piaklksj73ictdj6mtpv1";

const detailsMetadataId1 = topHatId1 + "-" + cid1;
const detailsMetadataId2 = topHatId2 + "-" + cid2;

describe("basic test", () => {
  describe("Scenario 1", () => {
    beforeEach(() => {
      // 0x00000001 is created and minted to wearer1
      let hatCreatedEvent1 = createHatCreatedEvent(
        topHatId1,
        `ipfs://${cid1}`,
        BigInt.fromI32(1),
        Address.zero(),
        Address.zero(),
        false,
        "imageURI_00000001",
        0,
        topHatId1
      );

      // mock data source and context
      dataSourceMock.resetValues();
      dataSourceMock.setAddress(cid1);

      let context = new DataSourceContext();
      context.setString("hatId", topHatId1);
      context.setString("cid", cid1);
      dataSourceMock.setContext(context);

      // trigget hat created handlder
      handleHatCreated(hatCreatedEvent1);

      // mock transfer signgle and trigger handler
      let transferSingleEvent1 = mockTransferSingleEvent(
        Address.fromString(address1),
        Address.zero(),
        Address.fromString(address1),
        topHatId1,
        BigInt.fromU32(1)
      );

      handleTransferSingle(transferSingleEvent1);

      // mock json content and trigger details metadata handler
      const content = readFile(`./tests/ipfs/metadata1.json`);
      handleHatDetailsMetaData(content);
    });

    test("Test data source created", () => {
      logDataSources("HatDetailsMetaData");
      assert.dataSourceCount("HatDetailsMetaData", 1);
      assert.dataSourceExists("HatDetailsMetaData", cid1);
    });

    test("Test HatDetailsMetaData entity", () => {
      assert.fieldEquals(
        "HatDetailsMetaData",
        detailsMetadataId1,
        "id",
        detailsMetadataId1
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        detailsMetadataId1,
        "type",
        "1.0"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        detailsMetadataId1,
        "name",
        "test name"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        detailsMetadataId1,
        "description",
        "test description"
      );
      // responsabilities
      assert.fieldEquals(
        "HatDetailsMetaData",
        detailsMetadataId1,
        "responsibilityLabels",
        "[responsibility name 1]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        detailsMetadataId1,
        "responsibilityDescriptions",
        "[responsibility description 1]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        detailsMetadataId1,
        "responsibilityLinks",
        "[responsibility link 1]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        detailsMetadataId1,
        "responsibilityImageUrls",
        "[responsibility image url 1]"
      );

      // authorities
      assert.fieldEquals(
        "HatDetailsMetaData",
        detailsMetadataId1,
        "authorityLabels",
        "[authority label 1]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        detailsMetadataId1,
        "authorityDescriptions",
        "[authority description 1]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        detailsMetadataId1,
        "authorityLinks",
        "[authority link 1]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        detailsMetadataId1,
        "authorityImageUrls",
        "[authority imageUrl 1]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        detailsMetadataId1,
        "authorityGates",
        "[authority gate 1]"
      );

      assert.fieldEquals(
        "Hat",
        topHatId1,
        "detailsMetaData",
        detailsMetadataId1
      );
    });
  });

  describe("Scenario 2", () => {
    beforeEach(() => {
      // 0x00000002 is created and minted to wearer1
      let hatCreatedEvent2 = createHatCreatedEvent(
        topHatId2,
        `ipfs://${cid2}`,
        BigInt.fromI32(1),
        Address.zero(),
        Address.zero(),
        false,
        "imageURI_00000002",
        0,
        topHatId1
      );

      // mock data source and context
      dataSourceMock.resetValues();
      dataSourceMock.setAddress(cid2);

      let context = new DataSourceContext();
      context.setString("hatId", topHatId2);
      context.setString("cid", cid2);
      dataSourceMock.setContext(context);

      // trigget hat created handlder
      handleHatCreated(hatCreatedEvent2);

      // mock transfer signgle and trigger handler
      let transferSingleEvent2 = mockTransferSingleEvent(
        Address.fromString(address1),
        Address.zero(),
        Address.fromString(address1),
        topHatId2,
        BigInt.fromU32(1)
      );

      handleTransferSingle(transferSingleEvent2);

      // mock json content and trigger details metadata handler
      const content = readFile(`./tests/ipfs/metadata2.json`);
      handleHatDetailsMetaData(content);
    });

    test("Test data source created", () => {
      assert.dataSourceCount("HatDetailsMetaData", 2);
      assert.dataSourceExists("HatDetailsMetaData", cid2);
      //logDataSources("HatDetailsMetaData");
    });

    test("Test HatDetailsMetaData entity", () => {
      assert.fieldEquals(
        "HatDetailsMetaData",
        detailsMetadataId2,
        "id",
        detailsMetadataId2
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        detailsMetadataId2,
        "type",
        "1.0"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        detailsMetadataId2,
        "name",
        "null"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        detailsMetadataId2,
        "description",
        "null"
      );

      // responsibilities
      assert.fieldEquals(
        "HatDetailsMetaData",
        detailsMetadataId2,
        "responsibilityLabels",
        "[]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        detailsMetadataId2,
        "responsibilityDescriptions",
        "[]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        detailsMetadataId2,
        "responsibilityLinks",
        "[]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        detailsMetadataId2,
        "responsibilityImageUrls",
        "[]"
      );

      // authorities
      assert.fieldEquals(
        "HatDetailsMetaData",
        detailsMetadataId2,
        "authorityLabels",
        "[]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        detailsMetadataId2,
        "authorityDescriptions",
        "[]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        detailsMetadataId2,
        "authorityLinks",
        "[]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        detailsMetadataId2,
        "authorityImageUrls",
        "[]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        detailsMetadataId2,
        "authorityGates",
        "[]"
      );

      assert.fieldEquals(
        "Hat",
        topHatId2,
        "detailsMetaData",
        detailsMetadataId2
      );
    });
  });
});
