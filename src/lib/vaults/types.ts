export interface VaultsResponse<T> {
  vaults: {
    items: T[]
  }
}

export interface VaultSearchRequestReturn {
  address: string
  chain: {
    id: number
  }
  metadata: null | { image: string }
  name: string
}

export interface VaultSearchItem {
  address: string
  chainId: number
  image: string
  name: string
}
