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
      assert.dataSourceCount("HatDetailsMetaData", 1);
      assert.dataSourceExists("HatDetailsMetaData", cid1);
      //logDataSources("HatDetailsMetaData");
    });

    test("Test HatDetailsMetaData entity", () => {
      assert.fieldEquals("HatDetailsMetaData", cid1, "id", cid1);
      assert.fieldEquals("HatDetailsMetaData", cid1, "type", "1.0");
      assert.fieldEquals("HatDetailsMetaData", cid1, "name", "test name");
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid1,
        "description",
        "test description"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid1,
        "guilds",
        "[guild1, guild2]"
      );
      assert.fieldEquals("HatDetailsMetaData", cid1, "spaces", "[space1]");

      // responsabilities
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid1,
        "responsabilityLabels",
        "[responsability name 1]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid1,
        "responsabilityDescriptions",
        "[responsability description 1]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid1,
        "responsabilityLinks",
        "[responsability link 1]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid1,
        "responsabilityImageUrls",
        "[responsability image url 1]"
      );
      assert.fieldEquals("Hat", topHatId1, "detailsMetaData", cid1);

      // authorities
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid1,
        "authorityLabels",
        "[authority label 1]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid1,
        "authorityDescriptions",
        "[authority description 1]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid1,
        "authorityLinks",
        "[authority link 1]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid1,
        "authorityImageUrls",
        "[authority imageUrl 1]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid1,
        "authorityGates",
        "[authority gate 1]"
      );

      // eligibility
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid1,
        "eligibilityManual",
        "false"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid1,
        "eligibilityCriteriaLinks",
        "[eligibility link 1]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid1,
        "eligibilityCriteriaLabels",
        "[eligibility label 1]"
      );

      // toggle
      assert.fieldEquals("HatDetailsMetaData", cid1, "toggleManual", "false");
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid1,
        "toggleCriteriaLinks",
        "[toggle link 1]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid1,
        "toggleCriteriaLabels",
        "[toggle label 1]"
      );

      assert.fieldEquals("Hat", topHatId1, "detailsMetaData", cid1);
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
      assert.fieldEquals("HatDetailsMetaData", cid2, "id", cid2);
      assert.fieldEquals("HatDetailsMetaData", cid2, "type", "1.0");
      assert.fieldEquals("HatDetailsMetaData", cid2, "name", "");
      assert.fieldEquals("HatDetailsMetaData", cid2, "description", "");
      assert.fieldEquals("HatDetailsMetaData", cid2, "guilds", "[]");
      assert.fieldEquals("HatDetailsMetaData", cid2, "spaces", "[]");

      // responsabilities
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid2,
        "responsabilityLabels",
        "[]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid2,
        "responsabilityDescriptions",
        "[]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid2,
        "responsabilityLinks",
        "[]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid2,
        "responsabilityImageUrls",
        "[]"
      );
      assert.fieldEquals("Hat", topHatId2, "detailsMetaData", cid2);

      // authorities
      assert.fieldEquals("HatDetailsMetaData", cid2, "authorityLabels", "[]");
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid2,
        "authorityDescriptions",
        "[]"
      );
      assert.fieldEquals("HatDetailsMetaData", cid2, "authorityLinks", "[]");
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid2,
        "authorityImageUrls",
        "[]"
      );
      assert.fieldEquals("HatDetailsMetaData", cid2, "authorityGates", "[]");

      // eligibility
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid2,
        "eligibilityManual",
        "true"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid2,
        "eligibilityCriteriaLinks",
        "[]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid2,
        "eligibilityCriteriaLabels",
        "[]"
      );

      // toggle
      assert.fieldEquals("HatDetailsMetaData", cid2, "toggleManual", "true");
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid2,
        "toggleCriteriaLinks",
        "[]"
      );
      assert.fieldEquals(
        "HatDetailsMetaData",
        cid2,
        "toggleCriteriaLabels",
        "[]"
      );

      assert.fieldEquals("Hat", topHatId2, "detailsMetaData", cid2);
    });
  });
});
