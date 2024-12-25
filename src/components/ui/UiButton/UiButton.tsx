'use client'

import clsx from 'clsx'
import type * as CSS from 'csstype'
import React, { FC, MouseEvent, ReactNode, useCallback, useMemo, useRef } from 'react'
import styles from './UiButton.module.scss'

import { UiButtonSize, UiButtonTheme, UiButtonVariant } from './types'
import { useRouter } from 'next/navigation'

export interface UiButtonProps {
  children: ReactNode
  stopPropagation?: boolean
  onClick?: (e: MouseEvent<HTMLDivElement, MouseEvent>) => void

  href?: string
  externalLink?: boolean
  navigateReplace?: boolean

  disabled?: boolean
  loading?: boolean
  full?: boolean
  focusable?: boolean

  variant?: UiButtonVariant
  size?: UiButtonSize
  theme?: UiButtonTheme

  loader?: ReactNode

  className?: string
  style?: CSS.Properties
}

export const UiButton: FC<UiButtonProps> = ({
  children,
  stopPropagation = false,
  onClick = () => {},

  href = '',
  externalLink = false,
  navigateReplace = false,

  disabled = false,
  loading = false,
  full = false,
  focusable = true,

  variant = 'base',
  size = 'base',
  theme = 'primary',

  loader,
  className = '',
  style = {},
}) => {
  const button = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const buttonClassNames = useMemo(() => {
    function css(condition: boolean, field: string | undefined): string {
      return condition ? field || '' : ''
    }

    const coreClass = `
        ${styles.button}
        ${css(disabled, styles['button-disabled'])}
        ${css(loading, styles['button-progress'])}
      `

    const variantClass = `
        ${css(true, styles[`variant-${variant}`])}
      `

    const sizeClass = `
        ${css(true, styles[`size-${size}`])}
      `

    const themeClass = `
        ${css(true, styles[`variant-${variant}-theme-${theme}`])}
        ${css(disabled, styles[`variant-${variant}-theme-${theme}-disabled`])}
        ${css(loading, styles[`variant-${variant}-theme-${theme}-progress`])}
      `

    return [coreClass.trim(), variantClass.trim(), sizeClass.trim(), themeClass.trim()]
  }, [disabled, loading, variant, size, theme])

  const isInteractive = useMemo(() => !disabled && !loading, [disabled, loading])

  const handleClick = useCallback(
    (e: any) => {
      if (isInteractive) {
        if (stopPropagation) {
          e?.stopPropagation()
        }

        button.current?.blur()
        if (href) {
          if (externalLink) window.open(href, '_blank')
          else {
            if (navigateReplace) router.replace(href)
            else router.push(href)
          }
        }
        // inherits browser's native MouseEvent
        onClick(e)
      }
    },
    [isInteractive, stopPropagation, href, onClick, router, externalLink, navigateReplace],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (isInteractive) {
        if (e.key === 'Enter' || e.code === 'Space') handleClick(e)
      }
    },
    [isInteractive, handleClick],
  )

  return (
    <div
      ref={button}
      tabIndex={isInteractive && focusable ? 0 : -1}
      role="button"
      aria-disabled={!isInteractive}
      className={clsx(...buttonClassNames, full ? styles.full : '', className)}
      style={style}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {loading ? loader || <div>Processing...</div> : children}
    </div>
  )
}
