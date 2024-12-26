import { VaultsDiscovery } from '@/components/vaults'
import type { Metadata } from 'next'
import styles from './Home.module.scss'

export const metadata: Metadata = {
  title: 'Home',
}

export default function Home() {
  return <VaultsDiscovery className={styles.vaultsContainer} />
}
