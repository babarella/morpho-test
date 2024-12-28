interface ChainDetails {
  id: number
  explorerUrls: {
    base: string
    paths: {
      address: string
    }
  }
}

export const CHAIN_DETAILS_MAP: Record<number, ChainDetails> = {
  1: {
    id: 1,
    explorerUrls: {
      base: 'https://etherscan.io',
      paths: {
        address: 'address',
      },
    },
  },
  8453: {
    id: 8453,
    explorerUrls: {
      base: 'https://basescan.org',
      paths: {
        address: 'address',
      },
    },
  },
}
