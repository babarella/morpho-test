import { FC } from 'react'
import clsx from 'clsx'
import type * as CSS from 'csstype'
import styles from './UiIcon.module.scss'

export type UiIconVariant =
  | 'externalResource'
  | 'x'
  | 'circleCheck'
  | 'loader'
  | 'arrowRight'
  | 'exchangeArrows'
  | 'exclamationCircle'

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

const ArrowRight: FC<Pick<UiIconProps, 'size'>> = ({ size }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.33337 5.49972L0.666707 5.49972"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.00004 1.16638L9.33337 5.49972L5.00004 9.83305"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const ExchangeArrows: FC<Pick<UiIconProps, 'size'>> = ({ size }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.18018 8.228C4.49609 7.91911 5.00259 7.9248 5.31148 8.24071C5.62037 8.55662 5.61468 9.06312 5.29877 9.37201L3.42923 11.2L15.8667 11.2C16.3086 11.2 16.6667 11.5582 16.6667 12C16.6667 12.4418 16.3086 12.8 15.8667 12.8L3.42923 12.8L5.29877 14.628C5.61468 14.9369 5.62037 15.4434 5.31148 15.7593C5.00259 16.0752 4.49609 16.0809 4.18018 15.772L0.907454 12.572C0.75352 12.4215 0.666748 12.2153 0.666748 12C0.666748 11.7847 0.75352 11.5785 0.907454 11.428L4.18018 8.228ZM13.1533 0.227995C12.8374 -0.0808945 12.3309 -0.075203 12.022 0.240705C11.7131 0.556616 11.7188 1.06312 12.0347 1.37201L13.9043 3.2L1.46675 3.2C1.02492 3.2 0.666748 3.55817 0.666748 4C0.666748 4.44183 1.02492 4.8 1.46675 4.8L13.9043 4.8L12.0347 6.62799C11.7188 6.93688 11.7131 7.44338 12.022 7.75929C12.3309 8.0752 12.8374 8.08089 13.1533 7.77201L16.426 4.57201C16.58 4.42149 16.6667 4.21529 16.6667 4C16.6667 3.78471 16.58 3.57851 16.426 3.42799L13.1533 0.227995Z"
        fill="currentColor"
      />
    </svg>
  )
}

const ExclamationCircle: FC<Pick<UiIconProps, 'size'>> = ({ size }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.16675 8.55598L8.16675 4.2782"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.16675 11.306V11.2505"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.1668 15.2226C12.1555 15.2226 15.389 11.9891 15.389 8.00042C15.389 4.0117 12.1555 0.778198 8.1668 0.778198C4.17808 0.778198 0.94458 4.0117 0.94458 8.00042C0.94458 11.9891 4.17808 15.2226 8.1668 15.2226Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const IconsMap: Record<UiIconVariant, FC<any>> = {
  externalResource: ExternalIcon,
  x: XIcon,
  circleCheck: CircleCheck,
  loader: Loader,
  arrowRight: ArrowRight,
  exchangeArrows: ExchangeArrows,
  exclamationCircle: ExclamationCircle,
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
