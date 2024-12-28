import { FC } from 'react'
import clsx from 'clsx'
import { UiBlock, UiSkeleton } from '@/components/ui'
import type * as CSS from 'csstype'
import styles from './VaultCard.module.scss'

export interface VaultCardLoadingProps {
  className?: string
  style?: CSS.Properties
}

export const VaultCardLoading: FC<VaultCardLoadingProps> = async ({ className = '', style = {} }) => {
  return (
    <UiBlock className={clsx(styles.card, styles.vault, className)} style={style}>
      <div>
        <div className={styles.header}>
          <div className={styles.iconContainer}>
            <UiSkeleton circle width="66px" height="66px" />
          </div>
          <div className={styles.presentation}>
            <div className={styles.vaultName}>
              <UiSkeleton width="100px" height="20px" />
            </div>
            <div className={styles.vaultCurator}>
              <UiSkeleton width="100px" height="20px" />
            </div>
          </div>
        </div>

        <div className={styles.separatorWrapper}>
          <div className={styles.separator} />
        </div>

        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <div className={styles.statTitle}>
              <UiSkeleton width="160px" height="20px" />
            </div>
            <div className={clsx(styles.statValue, styles.capitalize)}>
              <UiSkeleton width="100px" height="16px" />
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statTitle}>
              <UiSkeleton width="160px" height="20px" />
            </div>
            <div className={styles.statValue}>
              <UiSkeleton width="100px" height="16px" />
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statTitle}>
              <UiSkeleton width="160px" height="20px" />
            </div>
            <div className={clsx(styles.statValue)}>
              <UiSkeleton width="100px" height="16px" />
            </div>
          </div>
        </div>
      </div>
    </UiBlock>
  )
}
