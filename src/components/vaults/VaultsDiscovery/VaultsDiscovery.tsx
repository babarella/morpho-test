'use client'

import { FC, useState } from 'react'
import clsx from 'clsx'
import type * as CSS from 'csstype'
import { UiBlock, UiLabel, UiTextInput } from '@/components/ui'

export interface VaultsDiscoveryProps {
  className?: string
  style?: CSS.Properties
}

export const VaultsDiscovery: FC<VaultsDiscoveryProps> = ({ className = '', style = {} }) => {
  const [test, setTest] = useState('')

  return (
    <UiBlock borderRadius="8px" py="38px" width="100%" maxWidth="350px" className={clsx(className)} style={style}>
      <UiLabel htmlFor="search">Vault Address or Name</UiLabel>
      <UiTextInput
        id="search"
        onChange={setTest}
        placeholder="Enter Vault Address or Name..."
        status={test === '1' ? 'error' : test === '2' ? 'success' : undefined}
        loading
      />
      {test}
    </UiBlock>
  )
}
