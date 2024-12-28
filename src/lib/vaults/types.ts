export interface SearchVaultsResponse<T> {
  vaults: {
    items: T[]
  }
}

export interface VaultResponse<T> {
  vaultByAddress: T
}

export interface VaultSearchRequestReturn {
  address: string
  chain: {
    id: number
  }
  metadata: null | { image: string }
  name: string
}

export interface VaultRequestReturn {
  metadata: {
    image: null | string
    curators: Array<{ name: string }>
  }
  name: string
  state: {
    owner: string
    totalAssetsUsd: number
    netApy: number
  }
}

export interface VaultSearchItem {
  address: string
  chainId: number
  image: string
  name: string
}

export interface Vault {
  chainId: number
  address: string
  name: string
  image: string
  curators: Array<{ name: string }>
  state: {
    owner: string
    totalAssetsUsd: number
    netApy: number
  }
}
