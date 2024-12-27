import { gql } from 'graphql-request'

export const SEARCH_VAULTS = gql`
  query VaultSearchByFullAddress($first: Int = 10, $where: VaultFilters) {
    vaults(first: $first, where: $where) {
      items {
        address
        chain {
          id
        }
        metadata {
          image
        }
        name
      }
    }
  }
`
