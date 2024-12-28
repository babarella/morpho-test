import { Vault, VaultRequestReturn } from '../types'

export interface ConvertToVaultOptions {
  vault: VaultRequestReturn
  chainId: number
  address: string
}

export function convertToVault({ vault, chainId, address }: ConvertToVaultOptions): Vault {
  return {
    chainId,
    address,
    name: vault.name,
    image: vault.metadata?.image || '',
    curators: vault.metadata.curators,
    state: vault.state,
  }
}
