'use client'

import { FC, useState } from 'react'
import clsx from 'clsx'
import { fetchVault, Vault } from '@/lib/vaults'
import { UiBlock, UiButton, UiIcon, UiImageWithFallback } from '@/components/ui'
import type * as CSS from 'csstype'
import styles from './VaultCard.module.scss'
import numeral from 'numeral'
import { shortenStr } from '@/lib/utils/format'
import { getAddressUrl } from '@/lib/web3'

export interface VaultCardProps {
  vault: Vault
  className?: string
  style?: CSS.Properties
}

export const VaultCard: FC<VaultCardProps> = ({ vault: initialVault, className = '', style = {} }) => {
  const [vault, setVault] = useState<Vault>(initialVault)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const curatorName = vault.curators.map((item) => item.name).join(', ')
  const isCuratorExists = !!curatorName

  async function refetchVault() {
    try {
      setIsRefreshing(true)
      const response = (await fetchVault({ chainId: vault.chainId, address: vault.address })) as Vault
      setVault(response)
    } catch (e) {
      console.error(e)
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <UiBlock className={clsx(styles.card, styles.vault, className)} style={style}>
      <div>
        <div className={styles.header}>
          <div className={styles.iconContainer}>
            <UiImageWithFallback
              src={vault.image}
              width={66}
              height={66}
              alt={vault.name}
              fallback={<div className={styles.iconFallback} />}
            />
          </div>
          <div className={styles.presentation}>
            <div className={styles.vaultName}>{vault.name}</div>
            {isCuratorExists && <div className={styles.vaultCurator}>{curatorName}</div>}
          </div>
        </div>

        <div className={styles.separatorWrapper}>
          <div className={styles.separator} />
        </div>

        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <div className={styles.statTitle}>Total Supply (USD)</div>
            <div className={clsx(styles.statValue, styles.capitalize)}>
              {numeral(vault.state.totalAssetsUsd).format('$0.[00]a')}
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statTitle}>Instant Net APY</div>
            <div className={styles.statValue}>{numeral(vault.state.netApy).format('0,0.[00]')}%</div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statTitle}>Vault Owner</div>
            <a href={getAddressUrl(vault.state.owner, vault.chainId)} target="_blank">
              <div className={clsx(styles.statValue, styles.addressLink)}>
                {shortenStr(vault.state.owner, 5, 5)}
                <UiIcon variant="externalResource" blockSize="20px" size={8} />
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <UiButton size="large" onClick={refetchVault} loading={isRefreshing} omitLoader>
          <UiIcon variant="exchangeArrows" size={16} />
        </UiButton>
      </div>
    </UiBlock>
  )
}
