import { SEARCH_VAULTS } from './gql'
import { request } from 'graphql-request'
import { VaultSearchRequestReturn, VaultsResponse, VaultSearchItem } from './types'
import { convertToVaultSearchItem } from './converters'
import { API_GRAPHQL_ENDPOINT } from './constants'

export interface FetchSearchByNameOptions {
  name: string
  first?: number
  whitelisted?: boolean
}

export async function fetchSearchByName({
  name,
  first = 10,
  whitelisted = true,
}: FetchSearchByNameOptions): Promise<VaultSearchItem[]> {
  const response = await request<VaultsResponse<VaultSearchRequestReturn>>({
    url: API_GRAPHQL_ENDPOINT,
    document: SEARCH_VAULTS,
    variables: {
      first: first,
      where: {
        whitelisted,
        search: name,
      },
    },
  })

  if (!response?.vaults?.items || !Array.isArray(response.vaults.items)) return []

  const result = response.vaults.items.map((vault) => convertToVaultSearchItem({ vault }))

  return result
}

export interface FetchSearchByAddressOptions {
  address: string
  first?: number
  whitelisted?: boolean
}

export async function fetchSearchByAddress({
  address,
  first = 10,
  whitelisted = true,
}: FetchSearchByAddressOptions): Promise<VaultSearchItem[]> {
  const response = await request<VaultsResponse<VaultSearchRequestReturn>>({
    url: API_GRAPHQL_ENDPOINT,
    document: SEARCH_VAULTS,
    variables: {
      first: first,
      where: {
        whitelisted,
        address_in: [address],
      },
    },
  })

  if (!response?.vaults?.items || !Array.isArray(response.vaults.items)) return []

  const result = response.vaults.items.map((vault) => convertToVaultSearchItem({ vault }))

  return result
}
