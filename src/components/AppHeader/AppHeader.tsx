import { UiButton, UiIcon, UiLogo } from '@/components/ui'
import styles from './AppHeader.module.scss'
import { FC } from 'react'
import clsx from "clsx"
import type * as CSS from "csstype"
import Link from 'next/link'
import { GITHUB_REPO_LINK } from '@/constants/app'

export interface AppHeaderProps {
  className?: string
  style?: CSS.Properties
}

export const AppHeader: FC<AppHeaderProps> = ({ className = '', style = {} }) => {
  return (
    <div className={clsx(styles.header, className)} style={style}>
      <div>
        <Link href="/">
          <UiLogo label="Morpho Test" className={styles.logoLink} />
        </Link>
      </div>
      <div>
        <UiButton href={GITHUB_REPO_LINK} externalLink className={styles.repoBtn} variant="alternative" size="small" theme="neutral">
          Go to Github Repo
          <UiIcon variant="externalResource" />
        </UiButton>
      </div>
    </div>
  )
}