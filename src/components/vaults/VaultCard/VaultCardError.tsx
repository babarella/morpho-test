'use client'

import { FC } from 'react'
import clsx from 'clsx'
import { UiBlock, UiButton, UiIcon } from '@/components/ui'
import type * as CSS from 'csstype'
import styles from './VaultCard.module.scss'

export interface VaultCardErrorProps {
  reset: () => void
  className?: string
  style?: CSS.Properties
}

export const VaultCardError: FC<VaultCardErrorProps> = ({ reset, className = '', style = {} }) => {
  return (
    <UiBlock className={clsx(styles.card, styles.errorCard, className)} style={style}>
      <div>
        <div className={styles.errorTitle}>
          <UiIcon variant="exclamationCircle" size={15} className={styles.errorIcon} />
          <span>Oops!</span>
        </div>
        <div className={styles.errorMessage}>Something went wrong, please try again.</div>
        <UiButton onClick={reset}>Try again</UiButton>
      </div>
    </UiBlock>
  )
}
