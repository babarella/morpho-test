import { FC, ReactNode } from 'react'
import clsx from 'clsx'
import type * as CSS from 'csstype'
import styles from './UiFieldError.module.scss'

export interface UiFieldErrorProps {
  children: ReactNode
  visible?: boolean
  noOffset?: boolean
  align?: 'left' | 'center' | 'right'
  className?: string
  style?: CSS.Properties
}

export const UiFieldError: FC<UiFieldErrorProps> = ({
  children,
  visible = true,
  noOffset = false,
  align = 'right',
  className = '',
  style = {},
}) => {
  return (
    <div
      className={clsx(
        styles.errorMessage,
        noOffset ? '' : styles.offset,
        styles[align],
        visible ? '' : styles.hidden,
        className,
      )}
      style={style}
    >
      {children}
    </div>
  )
}
