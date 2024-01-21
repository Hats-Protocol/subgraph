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
import {
  handleHatCreated,
  handleTransferSingle,
  handleHatDetailsMetadata,
} from "../src/hats";
import { createHatCreatedEvent, mockTransferSingleEvent } from "./utils";

const address1: string = "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const topHatId1 =
  "0x0000000100000000000000000000000000000000000000000000000000000000";

describe("basic test", () => {
  describe("Setup tree", () => {
    beforeEach(() => {
      // 0x00000001 is created and minted to wearer1
      let hatCreatedEvent1 = createHatCreatedEvent(
        topHatId1,
        "ipfs://bafkreiffngmobubcbw7l5blrftfdbrkfrokf6piaklksj73ictdj6mtpvq",
        BigInt.fromI32(1),
        Address.zero(),
        Address.zero(),
        false,
        "imageURI_00000001",
        0,
        topHatId1
      );

      dataSourceMock.resetValues();
      dataSourceMock.setAddress(
        "bafkreiffngmobubcbw7l5blrftfdbrkfrokf6piaklksj73ictdj6mtpvq"
      );

      let context = new DataSourceContext();
      context.setString(
        "hatId",
        "0x0000000100000000000000000000000000000000000000000000000000000000"
      );
      context.setString(
        "cid",
        "bafkreiffngmobubcbw7l5blrftfdbrkfrokf6piaklksj73ictdj6mtpvq"
      );
      dataSourceMock.setContext(context);

      handleHatCreated(hatCreatedEvent1);

      let transferSingleEvent1 = mockTransferSingleEvent(
        Address.fromString(address1),
        Address.zero(),
        Address.fromString(address1),
        topHatId1,
        BigInt.fromU32(1)
      );

      handleTransferSingle(transferSingleEvent1);

      //dataSourceMock.resetValues();
      //dataSourceMock.setAddress(
      //  "bafkreiffngmobubcbw7l5blrftfdbrkfrokf6piaklksj73ictdj6mtpvq"
      //);
      //
      //let context = new DataSourceContext();
      //context.setString(
      //  "hatId",
      //  "0x0000000100000000000000000000000000000000000000000000000000000000"
      //);
      //dataSourceMock.setContext(context);
      //log.info("current dir: {}", [process.cwd()]);

      const content = readFile(`./tests/ipfs/metadata1.json`);
      handleHatDetailsMetadata(content);

      //// 0x00000001.0001 is created
      //let hatCreatedEvent2 = createHatCreatedEvent(
      //  "0x0000000100010000000000000000000000000000000000000000000000000000",
      //  "hat_details_000000010001",
      //  BigInt.fromI32(3),
      //  Address.fromString(address1),
      //  Address.fromString(address1),
      //  true,
      //  "imageURI_000000010001",
      //  1,
      //  topHatId1
      //);
      //
      //handleHatCreated(hatCreatedEvent2);
    });

    test("Test data source created", () => {
      assert.dataSourceCount("HatDetailsMetadata", 1);
      assert.dataSourceExists(
        "HatDetailsMetadata",
        "bafkreiffngmobubcbw7l5blrftfdbrkfrokf6piaklksj73ictdj6mtpvq"
      );
      logDataSources("HatDetailsMetadata");
    });

    test("Test HatDetailsMetadata entity", () => {
      assert.fieldEquals(
        "HatDetailsMetadata",
        "bafkreiffngmobubcbw7l5blrftfdbrkfrokf6piaklksj73ictdj6mtpvq",
        "id",
        "bafkreiffngmobubcbw7l5blrftfdbrkfrokf6piaklksj73ictdj6mtpvq"
      );
      assert.fieldEquals(
        "HatDetailsMetadata",
        "bafkreiffngmobubcbw7l5blrftfdbrkfrokf6piaklksj73ictdj6mtpvq",
        "type",
        "1.0"
      );
      assert.fieldEquals(
        "HatDetailsMetadata",
        "bafkreiffngmobubcbw7l5blrftfdbrkfrokf6piaklksj73ictdj6mtpvq",
        "name",
        "test name"
      );
      assert.fieldEquals(
        "HatDetailsMetadata",
        "bafkreiffngmobubcbw7l5blrftfdbrkfrokf6piaklksj73ictdj6mtpvq",
        "description",
        "test description"
      );
      assert.fieldEquals(
        "HatDetailsMetadata",
        "bafkreiffngmobubcbw7l5blrftfdbrkfrokf6piaklksj73ictdj6mtpvq",
        "guilds",
        "[guild1, guild2]"
      );
      assert.fieldEquals(
        "HatDetailsMetadata",
        "bafkreiffngmobubcbw7l5blrftfdbrkfrokf6piaklksj73ictdj6mtpvq",
        "spaces",
        "[space1]"
      );
      assert.fieldEquals(
        "HatDetailsMetadata",
        "bafkreiffngmobubcbw7l5blrftfdbrkfrokf6piaklksj73ictdj6mtpvq",
        "responsabilityLabels",
        "[responsability name 1]"
      );
      assert.fieldEquals(
        "HatDetailsMetadata",
        "bafkreiffngmobubcbw7l5blrftfdbrkfrokf6piaklksj73ictdj6mtpvq",
        "responsabilityDescriptions",
        "[responsability description 1]"
      );
      assert.fieldEquals(
        "HatDetailsMetadata",
        "bafkreiffngmobubcbw7l5blrftfdbrkfrokf6piaklksj73ictdj6mtpvq",
        "responsabilityLinks",
        "[responsability link 1]"
      );
      assert.fieldEquals(
        "HatDetailsMetadata",
        "bafkreiffngmobubcbw7l5blrftfdbrkfrokf6piaklksj73ictdj6mtpvq",
        "responsabilityImageUrls",
        "[responsability image url 1]"
      );
      assert.fieldEquals(
        "Hat",
        "0x0000000100000000000000000000000000000000000000000000000000000000",
        "detailsMetadata",
        "bafkreiffngmobubcbw7l5blrftfdbrkfrokf6piaklksj73ictdj6mtpvq"
      );
    });
  });
});
