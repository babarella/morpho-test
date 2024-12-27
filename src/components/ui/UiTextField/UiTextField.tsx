'use client'

import React, { FC, ReactNode, useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import type * as CSS from 'csstype'
import styles from './UiTextField.module.scss'
import { UiIcon } from '../UiIcon'

export type UiTextFieldVariant = 'base'
export type UiTextFieldSize = 'base'
export type UiTextFieldTheme = 'base'
export type UiTextFieldStatus = 'error' | 'success'

export interface UiTextFieldProps {
  onChange: (val: string, e: React.ChangeEvent) => void
  value?: string
  inputRef?: any

  variant?: UiTextFieldVariant
  size?: UiTextFieldSize
  theme?: UiTextFieldTheme

  type?: 'text' | 'password' | 'number'
  placeholder?: string

  disabled?: boolean
  loading?: boolean
  status?: UiTextFieldStatus
  errorHighlighted?: boolean
  alwaysFocused?: boolean
  autoFocus?: boolean

  minWidth?: string
  maxWidth?: string
  width?: string

  leftPrefix?: ReactNode
  rightPrefix?: ReactNode

  onFocus?: (e: React.FocusEvent) => void
  onBlur?: () => void
  onKeyDown?: (e: React.KeyboardEvent) => void

  id?: string
  className?: string
  style?: CSS.Properties
}

export const UiTextField: FC<UiTextFieldProps> = ({
  onChange,
  value,
  inputRef,

  variant = 'base',
  size = 'base',
  theme = 'base',

  type = 'text',
  placeholder = '',

  disabled = false,
  loading = false,
  status,
  errorHighlighted = false,
  alwaysFocused = false,
  autoFocus = false,

  minWidth = 'auto',
  maxWidth = '100%',
  width = '100%',

  leftPrefix,
  rightPrefix,

  onFocus = () => {},
  onBlur = () => {},
  onKeyDown = () => {},

  id,
  className = '',
  style = {},
}) => {
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (!isFocused && alwaysFocused) {
      inputRef?.current?.focus()
    }
  }, [isFocused, alwaysFocused])

  const isStatusApplied = !loading && !!status
  const isStatusSignVisible = loading || !!status

  const classes = useMemo(() => {
    function css(condition: boolean, field: string | undefined): string {
      return condition ? field || '' : ''
    }

    const variantWrapper = `
        ${css(true, styles[`${variant}`])}
        ${css(isFocused, styles[`${variant}-theme-${theme}-focus`])}
        ${css(disabled, styles[`${variant}-disabled`])}
      `

    const variantInput = `
      ${css(true, styles[`${variant}-input`])}
    `

    const sizeWrapper = `
        ${css(true, styles[`${variant}-size-${size}`])}
      `

    const sizeInput = `
      ${css(true, styles[`${variant}-input-size-${size}`])}
    `

    const themeWrapper = `
        ${css(true, styles[`${variant}-theme-${theme}`])}
        ${css(disabled, styles[`${variant}-theme-${theme}-disabled`])}
      `

    const themeInput = `
      ${css(true, styles[`${variant}-input-theme-${theme}`])}
    `

    const statusWrapper = `
      ${css(isStatusApplied, styles[`${variant}-${status}`])}
    `

    const statusInput = `
      ${css(isStatusApplied, styles[`${variant}-input-${status}`])}
      ${css(errorHighlighted && status === 'error', styles[`${variant}-input-error-highlighted`])}
    `

    const statusSign = `
      ${css(!isStatusSignVisible, styles[`statusSign-hidden`])}
      ${css(loading, styles[`statusSign-loading`])}
      ${css(!!status && !loading, styles[`statusSign-${status}`])}
    `

    return {
      wrapper: [variantWrapper.trim(), sizeWrapper.trim(), themeWrapper.trim(), statusWrapper.trim()],
      input: [variantInput.trim(), sizeInput.trim(), themeInput.trim(), statusInput.trim()],
      statusSign: statusSign.trim(),
    }
  }, [
    isFocused,
    disabled,
    variant,
    size,
    theme,
    isStatusApplied,
    status,
    isStatusSignVisible,
    loading,
    errorHighlighted,
  ])

  function preventInputScroll(e: any) {
    e.target.addEventListener(
      'wheel',
      function (e: any) {
        e.preventDefault()
      },
      { passive: false },
    )
  }

  const handleFocus = function (e: React.FocusEvent) {
    setIsFocused(true)
    if (type === 'number') preventInputScroll(e)
    onFocus(e)
  }

  const handleBlur = function () {
    setIsFocused(false)
    onBlur()
  }

  return (
    <div
      aria-disabled={disabled}
      role="textbox"
      className={clsx(styles.wrapper, ...classes.wrapper, className)}
      style={{ minWidth, maxWidth, width, ...style }}
    >
      {leftPrefix}

      <input
        id={id}
        ref={inputRef}
        value={value}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={clsx(styles.input, ...classes.input)}
        onChange={(e) => onChange(e.currentTarget.value, e)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
      />

      {rightPrefix}
      <div className={clsx(styles.statusSign, classes.statusSign)}>
        {loading && <UiIcon variant="loader" size={15} />}
        {!loading && status === 'error' && <UiIcon variant="x" />}
        {!loading && status === 'success' && <UiIcon variant="circleCheck" size={16} />}
      </div>
    </div>
  )
}
