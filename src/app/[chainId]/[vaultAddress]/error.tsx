'use client'

import { VaultCardError } from '@/components/vaults'
import styles from './Vault.module.scss'

export default function VaultPageError({ reset }: { reset: () => void }) {
  return (
    <div className={styles.wrapper}>
      <VaultCardError reset={reset} />
    </div>
  )
}
