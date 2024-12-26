import { FC, ReactNode } from 'react'
import clsx from 'clsx'
import type * as CSS from 'csstype'
import styles from './UiLabel.module.scss'

export interface UiLabelProps {
  children: ReactNode
  mode?: 'vertical' | 'horizontal'
  noOffset?: boolean
  htmlFor?: string
  className?: string
  style?: CSS.Properties
}

export const UiLabel: FC<UiLabelProps> = ({
  children,
  mode = 'vertical',
  noOffset = false,
  htmlFor,
  className = '',
  style = {},
}) => {
  return (
    <label
      className={clsx(styles.label, noOffset ? '' : styles[`label-${mode}`] || '', className)}
      style={style}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  )
}
