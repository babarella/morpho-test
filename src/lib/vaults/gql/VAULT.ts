import { gql } from 'graphql-request'

export const VAULT = gql`
  query VaultData($address: String!, $chainId: Int = 1) {
    vaultByAddress(address: $address, chainId: $chainId) {
      metadata {
        image
        curators {
          name
        }
      }
      name

      state {
        owner
        totalAssetsUsd
        netApy
      }
    }
  }
`
