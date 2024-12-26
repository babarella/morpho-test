'use client'

import { FC, useState } from 'react'
import clsx from 'clsx'
import type * as CSS from 'csstype'
import { UiBlock, UiFieldError, UiLabel, UiTextField } from '@/components/ui'
import styles from './VaultsDiscovery.module.scss'
import { VaultsDropdown } from '../VaultsDropdown'
import { VaultSearchItem } from '@/lib/vaults'

export interface VaultsDiscoveryProps {
  className?: string
  style?: CSS.Properties
}

const vaults: VaultSearchItem[] = [
  {
    address: '1',
    chainId: 1,
    image: '',
    name: 'Vault 1',
  },
  {
    address: '2',
    chainId: 1,
    image: '',
    name: 'Vault 2',
  },
]

export const VaultsDiscovery: FC<VaultsDiscoveryProps> = ({ className = '', style = {} }) => {
  const [test, setTest] = useState('')

  return (
    <UiBlock
      borderRadius="8px"
      py="37px"
      width="100%"
      maxWidth="350px"
      minHeight="160px"
      className={clsx(styles.wrapper, className)}
      style={style}
    >
      <UiLabel htmlFor="search">Vault Address or Name</UiLabel>
      <UiTextField
        id="search"
        onChange={setTest}
        placeholder="Enter Vault Address or Name..."
        status={test === '1' ? 'error' : test === '2' ? 'success' : undefined}
        loading
      />
      <UiFieldError visible={test === '1'}>{test === '1' ? 'Error message' : ''}</UiFieldError>
      <VaultsDropdown items={vaults} width="310px" triggerContent="trigger" loopNavigation />
    </UiBlock>
  )
}
