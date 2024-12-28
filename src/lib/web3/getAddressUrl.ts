import { CHAIN_DETAILS_MAP } from '@/constants/chains'

export function getAddressUrl(address: string, chainId: number): string {
  const chainDetails = CHAIN_DETAILS_MAP[chainId]
  return `${chainDetails.explorerUrls.base}/${chainDetails.explorerUrls.paths.address}/${address}`
}
