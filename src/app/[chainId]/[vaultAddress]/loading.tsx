import { VaultCardLoading } from '@/components/vaults'
import styles from './Vault.module.scss'

export default function VaultPageLoading() {
  return (
    <div className={styles.wrapper}>
      <VaultCardLoading />
    </div>
  )
}
