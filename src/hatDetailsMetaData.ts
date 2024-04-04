import {
  log,
  Bytes,
  dataSource,
  json,
  JSONValueKind,
} from "@graphprotocol/graph-ts";
import { Hat, HatDetailsMetaData } from "../generated/schema";

export function handleHatDetailsMetaData(content: Bytes): void {
  let context = dataSource.context();
  let cid = context.getString("cid");
  let hatId = context.getString("hatId");

  // check if already exists
  const existing = HatDetailsMetaData.load(hatId + "-" + cid);
  if (existing == null) {
    let hatDetailsMetaData = new HatDetailsMetaData(hatId + "-" + cid);

    const parseResult = json.try_fromBytes(content);

    if (parseResult.isOk && parseResult.value.kind == JSONValueKind.OBJECT) {
      const value = parseResult.value.toObject();
      const rawType = value.get("type");
      const rawData = value.get("data");

      if (
        rawType != null &&
        rawType.kind == JSONValueKind.STRING &&
        rawType.toString() == "1.0" &&
        rawData != null &&
        rawData.kind == JSONValueKind.OBJECT
      ) {
        hatDetailsMetaData.type = "1.0";

        const data = rawData.toObject();

        // parse name
        const rawName = data.get("name");
        if (rawName != null && rawName.kind == JSONValueKind.STRING) {
          hatDetailsMetaData.name = rawName.toString();
        }

        // parse description
        const rawDescription = data.get("description");
        if (
          rawDescription != null &&
          rawDescription.kind == JSONValueKind.STRING
        ) {
          hatDetailsMetaData.description = rawDescription.toString();
        }

        // parse responsabilities
        const rawResponsibilitiesArray = data.get("responsibilities");
        if (
          rawResponsibilitiesArray != null &&
          rawResponsibilitiesArray.kind == JSONValueKind.ARRAY
        ) {
          const responsabilitiesArray = rawResponsibilitiesArray.toArray();
          const responsabilityLabels: string[] = [];
          const responsabilityDescriptions: string[] = [];
          const responsabilityLinks: string[] = [];
          const responsabilityImageUrls: string[] = [];

          for (let i = 0; i < responsabilitiesArray.length; i++) {
            const rawResponsibility = responsabilitiesArray[i];
            if (rawResponsibility.kind == JSONValueKind.OBJECT) {
              const responsibility = rawResponsibility.toObject();

              // parse label
              const rawLabel = responsibility.get("label");
              if (rawLabel != null && rawLabel.kind == JSONValueKind.STRING) {
                responsabilityLabels.push(rawLabel.toString());
              } else {
                responsabilityLabels.push("");
              }

              // parse description
              const rawDescription = responsibility.get("description");
              if (
                rawDescription != null &&
                rawDescription.kind == JSONValueKind.STRING
              ) {
                responsabilityDescriptions.push(rawDescription.toString());
              } else {
                responsabilityDescriptions.push("");
              }

              // parse link
              const rawLink = responsibility.get("link");
              if (rawLink != null && rawLink.kind == JSONValueKind.STRING) {
                responsabilityLinks.push(rawLink.toString());
              } else {
                responsabilityLinks.push("");
              }

              // parse images url
              const rawImageUrl = responsibility.get("imageUrl");
              if (
                rawImageUrl != null &&
                rawImageUrl.kind == JSONValueKind.STRING
              ) {
                responsabilityImageUrls.push(rawImageUrl.toString());
              } else {
                responsabilityImageUrls.push("");
              }
            }
          }

          hatDetailsMetaData.responsibilityLabels = responsabilityLabels;
          hatDetailsMetaData.responsibilityDescriptions =
            responsabilityDescriptions;
          hatDetailsMetaData.responsibilityLinks = responsabilityLinks;
          hatDetailsMetaData.responsibilityImageUrls = responsabilityImageUrls;
        }

        // parse authorities
        const rawAuthoritiesArray = data.get("authorities");
        if (
          rawAuthoritiesArray != null &&
          rawAuthoritiesArray.kind == JSONValueKind.ARRAY
        ) {
          const authoritiesArray = rawAuthoritiesArray.toArray();

          const authorityLabels: string[] = [];
          const authorityDescriptions: string[] = [];
          const authorityLinks: string[] = [];
          const authorityImageUrls: string[] = [];
          const authorityGates: string[] = [];

          for (let i = 0; i < authoritiesArray.length; i++) {
            const rawAuthority = authoritiesArray[i];
            if (rawAuthority.kind == JSONValueKind.OBJECT) {
              const authority = rawAuthority.toObject();

              // parse label
              const rawLabel = authority.get("label");
              if (rawLabel != null && rawLabel.kind == JSONValueKind.STRING) {
                authorityLabels.push(rawLabel.toString());
              } else {
                authorityLabels.push("");
              }

              // parse description
              const rawDescription = authority.get("description");
              if (
                rawDescription != null &&
                rawDescription.kind == JSONValueKind.STRING
              ) {
                authorityDescriptions.push(rawDescription.toString());
              } else {
                authorityDescriptions.push("");
              }

              // parse link
              const rawlink = authority.get("link");
              if (rawlink != null && rawlink.kind == JSONValueKind.STRING) {
                authorityLinks.push(rawlink.toString());
              } else {
                authorityLinks.push("");
              }

              // parse images url
              const rawImageUrl = authority.get("imageUrl");
              if (
                rawImageUrl != null &&
                rawImageUrl.kind == JSONValueKind.STRING
              ) {
                authorityImageUrls.push(rawImageUrl.toString());
              } else {
                authorityImageUrls.push("");
              }

              // parse gate
              const rawGate = authority.get("gate");
              if (rawGate != null && rawGate.kind == JSONValueKind.STRING) {
                authorityGates.push(rawGate.toString());
              } else {
                authorityGates.push("");
              }
            }
          }

          hatDetailsMetaData.authorityLabels = authorityLabels;
          hatDetailsMetaData.authorityDescriptions = authorityDescriptions;
          hatDetailsMetaData.authorityLinks = authorityLinks;
          hatDetailsMetaData.authorityImageUrls = authorityImageUrls;
          hatDetailsMetaData.authorityGates = authorityGates;
        }
      } else {
        hatDetailsMetaData.type = "unknown";
      }
    } else {
      hatDetailsMetaData.type = "unknown";
    }

    hatDetailsMetaData.save();
  }
}
