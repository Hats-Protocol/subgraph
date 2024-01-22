import { log, Bytes, dataSource, json } from "@graphprotocol/graph-ts";
import { Hat, HatDetailsMetaData } from "../generated/schema";

export function handleHatDetailsMetaData(content: Bytes): void {
  const value = json.fromBytes(content).toObject();
  if (value) {
    const type = value.get("type");
    const rawData = value.get("data");

    if (type != null && rawData != null && type.toString() == "1.0") {
      let context = dataSource.context();
      let cid = context.getString("cid");
      let hatDetailsMetaData = new HatDetailsMetaData(cid);
      hatDetailsMetaData.type = "1.0";
      const data = rawData.toObject();

      //for (let i = 0; i < data.entries.length; i++) {
      //  const entry = data.entries[i];
      //  log.info("key: {}", [entry.key]);
      //}

      // parse name
      const name = data.get("name");
      if (name) {
        hatDetailsMetaData.name = name.toString();
      } else {
        hatDetailsMetaData.name = "";
      }

      // parse description
      const description = data.get("description");
      if (description) {
        hatDetailsMetaData.description = description.toString();
      } else {
        hatDetailsMetaData.description = "";
      }

      // parse guilds
      const guildsArray = data.get("guilds");
      if (guildsArray) {
        const guilds = guildsArray.toArray();
        const finalGuilds: string[] = [];
        for (let i = 0; i < guilds.length; i++) {
          finalGuilds.push(guilds[i].toString());
        }
        hatDetailsMetaData.guilds = finalGuilds;
      } else {
        hatDetailsMetaData.guilds = [];
      }

      // parse spaces
      const spacesArray = data.get("spaces");
      if (spacesArray) {
        const spaces = spacesArray.toArray();
        const finalSpaces: string[] = [];
        for (let i = 0; i < spaces.length; i++) {
          finalSpaces.push(spaces[i].toString());
        }
        hatDetailsMetaData.spaces = finalSpaces;
      } else {
        hatDetailsMetaData.spaces = [];
      }

      // parse responsabilities
      const responsabilitiesArray = data.get("responsibilities");
      if (responsabilitiesArray) {
        const responsabilities = responsabilitiesArray.toArray();
        const responsabilityLabels: string[] = [];
        const responsabilityDescriptions: string[] = [];
        const responsabilityLinks: string[] = [];
        const responsabilityImageUrls: string[] = [];

        for (let i = 0; i < responsabilities.length; i++) {
          const responsability = responsabilities[i].toObject();

          // parse label
          const label = responsability.get("label");
          if (label) {
            responsabilityLabels.push(label.toString());
          } else {
            responsabilityLabels.push("");
          }

          // parse description
          const description = responsability.get("description");
          if (description) {
            responsabilityDescriptions.push(description.toString());
          } else {
            responsabilityDescriptions.push("");
          }

          // parse link
          const link = responsability.get("link");
          if (link) {
            responsabilityLinks.push(link.toString());
          } else {
            responsabilityLinks.push("");
          }

          // parse images url
          const imageUrl = responsability.get("imageUrl");
          if (imageUrl) {
            responsabilityImageUrls.push(imageUrl.toString());
          } else {
            responsabilityImageUrls.push("");
          }
        }

        hatDetailsMetaData.responsabilityLabels = responsabilityLabels;
        hatDetailsMetaData.responsabilityDescriptions =
          responsabilityDescriptions;
        hatDetailsMetaData.responsabilityLinks = responsabilityLinks;
        hatDetailsMetaData.responsabilityImageUrls = responsabilityImageUrls;
      }

      // parse authorities
      const authoritiesArray = data.get("authorities");
      if (authoritiesArray) {
        const authorities = authoritiesArray.toArray();
        const authorityLabels: string[] = [];
        const authorityDescriptions: string[] = [];
        const authorityLinks: string[] = [];
        const authorityImageUrls: string[] = [];
        const authorityGates: string[] = [];

        for (let i = 0; i < authorities.length; i++) {
          const authority = authorities[i].toObject();

          // parse label
          const label = authority.get("label");
          if (label) {
            authorityLabels.push(label.toString());
          } else {
            authorityLabels.push("");
          }

          // parse description
          const description = authority.get("description");
          if (description) {
            authorityDescriptions.push(description.toString());
          } else {
            authorityDescriptions.push("");
          }

          // parse link
          const link = authority.get("link");
          if (link) {
            authorityLinks.push(link.toString());
          } else {
            authorityLinks.push("");
          }

          // parse images url
          const imageUrl = authority.get("imageUrl");
          if (imageUrl) {
            authorityImageUrls.push(imageUrl.toString());
          } else {
            authorityImageUrls.push("");
          }

          // parse gate
          const gate = authority.get("gate");
          if (gate) {
            authorityGates.push(gate.toString());
          } else {
            authorityGates.push("");
          }
        }

        hatDetailsMetaData.authorityLabels = authorityLabels;
        hatDetailsMetaData.authorityDescriptions = authorityDescriptions;
        hatDetailsMetaData.authorityLinks = authorityLinks;
        hatDetailsMetaData.authorityImageUrls = authorityImageUrls;
        hatDetailsMetaData.authorityGates = authorityGates;
      }

      // parse eligibility
      const eligibilityData = data.get("eligibility");
      if (eligibilityData) {
        const eligibility = eligibilityData.toObject();

        const eligibilityCriteriaLinks: string[] = [];
        const eligibilityCriteriaLabels: string[] = [];

        // parse criteria
        const criteriaArray = eligibility.get("criteria");
        if (criteriaArray) {
          const criterias = criteriaArray.toArray();
          for (let i = 0; i < criterias.length; i++) {
            const criteria = criterias[i].toObject();

            // parse link
            const link = criteria.get("link");
            if (link) {
              eligibilityCriteriaLinks.push(link.toString());
            } else {
              eligibilityCriteriaLinks.push("");
            }

            // parse label
            const label = criteria.get("label");
            if (label) {
              eligibilityCriteriaLabels.push(label.toString());
            } else {
              eligibilityCriteriaLabels.push("");
            }
          }
        }

        // parse manual
        const manual = eligibility.get("manual");
        if (manual) {
          hatDetailsMetaData.eligibilityManual = manual.toBool();
        } else {
          hatDetailsMetaData.eligibilityManual = true;
        }

        hatDetailsMetaData.eligibilityCriteriaLinks = eligibilityCriteriaLinks;
        hatDetailsMetaData.eligibilityCriteriaLabels =
          eligibilityCriteriaLabels;
      } else {
        hatDetailsMetaData.eligibilityManual = true;
        hatDetailsMetaData.eligibilityCriteriaLinks = [];
        hatDetailsMetaData.eligibilityCriteriaLabels = [];
      }

      // parse toggle
      const toggleData = data.get("toggle");
      if (toggleData) {
        const toggle = toggleData.toObject();

        const toggleCriteriaLinks: string[] = [];
        const toggleCriteriaLabels: string[] = [];

        // parse criteria
        const criteriaArray = toggle.get("criteria");
        if (criteriaArray) {
          const criterias = criteriaArray.toArray();
          for (let i = 0; i < criterias.length; i++) {
            const criteria = criterias[i].toObject();

            // parse link
            const link = criteria.get("link");
            if (link) {
              toggleCriteriaLinks.push(link.toString());
            } else {
              toggleCriteriaLinks.push("");
            }

            // parse label
            const label = criteria.get("label");
            if (label) {
              toggleCriteriaLabels.push(label.toString());
            } else {
              toggleCriteriaLabels.push("");
            }
          }
        }

        // parse manual
        const manual = toggle.get("manual");
        if (manual) {
          hatDetailsMetaData.toggleManual = manual.toBool();
        } else {
          hatDetailsMetaData.toggleManual = true;
        }

        hatDetailsMetaData.toggleCriteriaLinks = toggleCriteriaLinks;
        hatDetailsMetaData.toggleCriteriaLabels = toggleCriteriaLabels;
      } else {
        hatDetailsMetaData.toggleManual = true;
        hatDetailsMetaData.toggleCriteriaLinks = [];
        hatDetailsMetaData.toggleCriteriaLabels = [];
      }

      // update hat entity
      let hatId = context.getString("hatId");
      let hat = Hat.load(hatId) as Hat;
      hat.detailsMetaData = hatDetailsMetaData.id;

      hatDetailsMetaData.save();
      hat.save();
    }
  }
}
