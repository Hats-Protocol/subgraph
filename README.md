# Hats-Protocol Subgraph

This is a subgraph for the [Hats-Protocol](https://www.hatsprotocol.xyz/) project.

# Example Queries

## Tree

Every hat belongs to a tree, which root is a top hat. The ID of a tree, is it's top hat domain (first 4 bytes of the top hat ID).
The following query will get all existing trees, and the hats that exist in each tree:

```graphql
{
  trees{
    id
    hats{
      id
    }
  }
}
```

Get a specific tree:

```graphql
{
  tree(id: "0x00000001"){
    id
    hats{
      id
    }
  }
}
```

## Hat

the ID of a hat is its hat ID, formatted in an IP address style:
- In hex, with the `0x` prefix
- Periods between the hat levels
- Only levels with non-zero values are shown
For example, the ID of a level 3 hat might look like this: `0x00000001.01.01`

The following query will get all the basic information of a hat:

```graphql
{
  hat(id: "0x00000001.01") {
    id
    status
    details
    eligibility
    toggle
    mutable
    imageUri
    createdAt
    maxSupply
    currentSupply
    level
  }
}
```

The following query will get the tree that the hat belongs to:

```graphql
{
  hat(id: "0x00000001.01") {
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
  hat(id: "0x00000001.01") {
    id
    tree {
      id
    }
  }
}
```

The following query will get the sub-hats that are one level deeper:

```graphql
{
  hat(id: "0x00000001.01") {
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
  hat(id: "0x00000001.01") {
    id
    wearers {
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
    }
  }
}
```

The following query will get the entire history of events in a specific hat:

```graphql
{
  tree(id: "0x00000001.01") {
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
  hat(id: "0x00000001.01") {
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
  hats(where: {id_gte: "0x00000001.01", id_lt: "0x00000001.02"}) {
    id
  }
}
```
