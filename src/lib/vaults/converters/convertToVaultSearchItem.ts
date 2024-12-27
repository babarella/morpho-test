import { VaultSearchItem, VaultSearchRequestReturn } from '../types'

export interface ConvertToVaultSearchItemOptions {
  vault: VaultSearchRequestReturn
}

export function convertToVaultSearchItem({ vault }: ConvertToVaultSearchItemOptions): VaultSearchItem {
  return {
    address: vault.address,
    chainId: vault.chain.id,
    image: vault.metadata?.image || '',
    name: vault.name,
  }
}
