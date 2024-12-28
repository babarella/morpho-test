import { VaultCard } from '@/components/vaults'
import styles from './Vault.module.scss'
import { Metadata } from 'next'
import { fetchVault, Vault } from '@/lib/vaults'
import { notFound } from 'next/navigation'
import { unstable_cache } from 'next/cache'

export const metadata: Metadata = {
  title: 'Vault',
}

const loadCachedVault = unstable_cache(
  async (chainId: number, vaultAddress: string) => {
    const response = await fetchVault({ chainId, address: vaultAddress })
    return response
  },
  undefined,
  {
    revalidate: 3600 * 24, // 24hs
  },
)

export default async function VaultPage({ params }: { params: Promise<{ chainId: string; vaultAddress: string }> }) {
  const { chainId, vaultAddress } = await params

  let vault!: Vault

  try {
    vault = (await loadCachedVault(Number(chainId), vaultAddress)) as Vault
  } catch (e: any) {
    if (e?.response?.errors?.[0]?.status !== 'BAD_USER_INPUT') throw new Error()
  }

  if (!vault) return notFound()

  return (
    <div className={styles.wrapper}>
      <VaultCard vault={vault} />
    </div>
  )
}
