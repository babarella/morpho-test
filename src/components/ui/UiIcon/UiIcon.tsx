import { FC } from 'react'
import clsx from 'clsx'
import type * as CSS from 'csstype'
import styles from './UiIcon.module.scss'

export type UiIconVariant = 'externalResource' | 'x' | 'circleCheck' | 'loader'

export interface UiIconProps {
  variant: UiIconVariant
  blockSize?: string
  size?: number
  className?: string
  style?: CSS.Properties
}

const ExternalIcon: FC<Pick<UiIconProps, 'size'>> = ({ size }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.175736 7.82426C0.410051 8.05858 0.78995 8.05858 1.02426 7.82426L6.8 2.04853V6.6C6.8 6.93137 7.06863 7.2 7.4 7.2C7.73137 7.2 8 6.93137 8 6.6V0.6C8 0.26863 7.73137 0 7.4 0H1.4C1.06863 0 0.8 0.26863 0.8 0.6C0.8 0.93137 1.06863 1.2 1.4 1.2H5.95147L0.175736 6.97574C-0.0585786 7.21005 -0.0585786 7.58995 0.175736 7.82426Z"
        fill="currentColor"
        fillOpacity="1"
      />
    </svg>
  )
}

const XIcon: FC<Pick<UiIconProps, 'size'>> = ({ size }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.5 1L7.5 7M7.5 1L1.5 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const CircleCheck: FC<Pick<UiIconProps, 'size'>> = ({ size }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5 16C12.9183 16 16.5 12.4183 16.5 8C16.5 3.58172 12.9183 0 8.5 0C4.08172 0 0.5 3.58172 0.5 8C0.5 12.4183 4.08172 16 8.5 16ZM12.3566 6.19113C12.6002 5.85614 12.5261 5.38708 12.1911 5.14345C11.8561 4.89982 11.3871 4.97388 11.1434 5.30887L7.65969 10.099L5.78033 8.21967C5.48744 7.92678 5.01256 7.92678 4.71967 8.21967C4.42678 8.51256 4.42678 8.98744 4.71967 9.28033L7.21967 11.7803C7.37477 11.9354 7.58999 12.0149 7.80867 11.9977C8.02734 11.9805 8.22754 11.8685 8.35655 11.6911L12.3566 6.19113Z"
        fill="currentColor"
      />
    </svg>
  )
}

const Loader: FC<Pick<UiIconProps, 'size'>> = ({ size }) => {
  return (
    <svg
      className={styles.spinner}
      width={size}
      height={size}
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="2" cy="7.33339" r="1.5" fill="currentColor" fillOpacity="1" />
      <circle cx="3.16675" cy="2.66661" r="1.5" fill="currentColor" fillOpacity="1" />
      <circle cx="7.83325" cy="1.5" r="1.5" fill="currentColor" fillOpacity="1" />
      <circle cx="12.5" cy="2.66661" r="1.5" fill="currentColor" fillOpacity="1" />
      <circle cx="12.5" cy="12" r="1.5" fill="currentColor" fillOpacity="1" />
      <circle cx="7.83325" cy="13.1666" r="1.5" fill="currentColor" fillOpacity="1" />
      <circle cx="3.16675" cy="12" r="1.5" fill="currentColor" fillOpacity="1" />
      <circle cx="13.6667" cy="7.33339" r="1.5" fill="currentColor" fillOpacity="1" />
    </svg>
  )
}

const IconsMap: Record<UiIconVariant, FC<any>> = {
  externalResource: ExternalIcon,
  x: XIcon,
  circleCheck: CircleCheck,
  loader: Loader,
}

export const UiIcon: FC<UiIconProps> = ({ variant, blockSize, size = 8, className = '', style = {} }) => {
  const Icon = IconsMap[variant]
  return (
    <div
      className={clsx(styles.icon, className)}
      style={{
        width: blockSize || `${size}px`,
        height: blockSize || `${size}px`,
        maxWidth: blockSize || `${size}px`,
        maxHeight: blockSize || `${size}px`,
        minWidth: blockSize || `${size}px`,
        minHeight: blockSize || `${size}px`,
        ...style,
      }}
    >
      <Icon size={size} />
    </div>
  )
}
