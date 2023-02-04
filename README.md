# Hats-Protocol Subgraph

This is a subgraph for the [Hats-Protocol](https://www.hatsprotocol.xyz/) project.

# Important Note:

The `status` and `badStandings` fields of a `Hat` entity, track the status and standing as currently recorded in the Hats contract. It is NOT tracking the eligibility and toggle modules in case they exist and thus only represent the last recorded state in the Hats contract. In case they depend on the state of external contracts, these fields in the subgraph may be out of sync with the onchain state.

# Example Queries

## Tree

Every hat belongs to a tree, which root is a top hat. The ID of a tree, is it's top hat domain (first 4 bytes of the top hat ID).
The following query will get all existing trees, and the hats that exist in each tree:

```graphql
{
  trees {
    id
    hats {
      id
    }
  }
}
```

Get a specific tree:

```graphql
{
  tree(id: "0x00000001") {
    id
    hats {
      id
    }
  }
}
```

In case the tree was linked to another tree, get the parent tree:

```graphql
{
  tree(id: "0x00000001") {
    id
    childOfTree {
      id
    }
  }
}
```

In case the tree was linked to another tree, get the hat that the tree is linked to:

```graphql
{
  tree(id: "0x00000001") {
    id
    linkedToHat {
      id
    }
  }
}
```

In case the tree was linked to by other trees, get the trees that are linked directly to the tree:

```graphql
{
  tree(id: "0x00000001") {
    id
    parentOfTrees {
      id
    }
  }
}
```

## Hat

The ID of the hat entity is the ID of the hat in hex format.

Additionally, the hat entity includes a "prettyId" field, which is formatted in an IP address style:

- In hex, with the `0x` prefix
- Periods between the hat levels
- Only levels with non-zero values are shown
  For example, the "prettyId" of a level 3 hat might look like this: `0x00000001.0001.0001`

The following query will get all the basic information of a hat:

```graphql
{
  hat(
    id: "0x0000000100010000000000000000000000000000000000000000000000000000"
  ) {
    id
    prettyId
    status
    details
    eligibility
    toggle
    mutable
    imageUri
    createdAt
    maxSupply
    currentSupply
    levelAtLocalTree
  }
}
```

The following query will get the tree that the hat belongs to:

```graphql
{
  hat(
    id: "0x0000000100010000000000000000000000000000000000000000000000000000"
  ) {
    id
    tree {
      id
    }
  }
}
```

The following query will get the admin of the hat:

```graphql
{
  hat(
    id: "0x0000000100010000000000000000000000000000000000000000000000000000"
  ) {
    id
    admin {
      id
    }
  }
}
```

The following query will get the sub-hats that are one level deeper:

```graphql
{
  hat(
    id: "0x0000000100010000000000000000000000000000000000000000000000000000"
  ) {
    id
    subHats {
      id
    }
  }
}
```

The following query will get the wearers of the hat:

```graphql
{
  hat(
    id: "0x0000000100010000000000000000000000000000000000000000000000000000"
  ) {
    id
    wearers {
      id
    }
  }
}
```

The following query will get the all the wearers with a bad standing:

```graphql
{
  hat(
    id: "0x0000000100010000000000000000000000000000000000000000000000000000"
  ) {
    id
    badStandings {
      id
    }
  }
}
```

The following query will get the all the trees that are linked to a hat:

```graphql
{
  hat(
    id: "0x0000000100010000000000000000000000000000000000000000000000000000"
  ) {
    id
    linkedTrees {
      id
    }
  }
}
```

## Wearer

The ID of the wearer is its address.

The following query will get all hats of a wearer:

```graphql
{
  wearer(id: "0xabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd") {
    id
    currentHats {
      id
    }
  }
}
```

## Events

The events are used to track the history of hats and wearers.
The event ID format is `<event name>-<block number>-<log index>`.

The following query will get the entire history of events in a specific tree:

```graphql
{
  tree(id: "0x00000001") {
    id
    events {
      id
      blockNumber
      timestamp
      transactionID
      tree {
        id
      }
      hat {
        id
      }
      ... on HatCreatedEvent {
        hatDetails
        hatMaxSupply
        hatEligibility
        hatToggle
        hatMutable
        hatImageUri
      }
      ... on HatMintedEvent {
        wearer {
          id
        }
        operator
      }
      ... on HatBurnedEvent {
        wearer {
          id
        }
        operator
      }
      ... on HatStatusChangedEvent {
        hatNewStatus
      }
      ... on HatDetailsChangedEvent {
        hatNewDetails
      }
      ... on HatEligibilityChangedEvent {
        hatNewEligibility
      }
      ... on HatToggleChangedEvent {
        hatNewToggle
      }
      ... on HatMutabilityChangedEvent {
      }
      ... on HatMaxSupplyChangedEvent {
        hatNewMaxSupply
      }
      ... on HatImageURIChangedEvent {
        hatNewImageURI
      }
      ... on TopHatLinkRequestedEvent {
        newAdmin
      }
      ... on TopHatLinkedEvent {
        newAdmin
      }
      ... on WearerStandingChangedEvent {
        wearer {
          id
        }
        wearerStanding
      }
    }
  }
}
```

The following query will get the entire history of events in a specific hat:

```graphql
{
  hat(
    id: "0x0000000100010000000000000000000000000000000000000000000000000000"
  ) {
    id
    events {
      id
      blockNumber
      timestamp
      transactionID
      ... on HatCreatedEvent {
        hatId
      }
      ... on HatMintedEvent {
        hatId
        wearer {
          id
        }
        operator
      }
      ... on HatBurnedEvent {
        hatId
        wearer {
          id
        }
        operator
      }
      ... on HatStatusChangedEvent {
        hatId
        hatNewStatus
      }
      ... on HatDetailsChangedEvent {
        hatId
        hatNewDetails
      }
      ... on HatEligibilityChangedEvent {
        hatId
        hatNewEligibility
      }
      ... on HatToggleChangedEvent {
        hatId
        hatNewToggle
      }
      ... on HatMutabilityChangedEvent {
        hatId
      }
      ... on HatMaxSupplyChangedEvent {
        hatId
        hatNewMaxSupply
      }
      ... on HatImageURIChangedEvent {
        hatId
        hatNewImageURI
      }
      ... on TopHatLinkRequestedEvent {
        newAdmin
      }
      ... on TopHatLinkedEvent {
        newAdmin
      }
      ... on WearerStandingChangedEvent {
        wearer {
          id
        }
        wearerStanding
      }
    }
  }
}
```

The following query will get the history of hat mint and burn events for a specific wearer:

```graphql
{
  wearer(id: "0xabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd") {
    id
    mintEvent {
      id
      hatId
      wearer {
        id
      }
      operator
    }
    burnEvent {
      id
      hatId
      wearer {
        id
      }
      operator
    }
  }
}
```

## Misc

The following query will get the siblings of a hat:

```graphql
{
  hat(
    id: "0x0000000100010000000000000000000000000000000000000000000000000000"
  ) {
    admin {
      subHats {
        id
      }
    }
  }
}
```

The following query will get a sub tree, in which a specific hat is a root of:

```graphql
{
  hats(
    where: {
      id_gte: "0x0000000100010000000000000000000000000000000000000000000000000000"
      id_lt: "0x0000000100020000000000000000000000000000000000000000000000000000"
    }
  ) {
    id
  }
}
```
