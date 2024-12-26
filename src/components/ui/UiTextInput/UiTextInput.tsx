'use client'

import React, { FC, ReactNode, Ref, useMemo, useState } from 'react'
import clsx from 'clsx'
import type * as CSS from 'csstype'
import styles from './UiTextInput.module.scss'
import { UiIcon } from '../UiIcon'

export type UiTextInputVariant = 'base'
export type UiTextInputSize = 'base'
export type UiTextInputTheme = 'base'
export type UiTextInputStatus = 'error' | 'success'

export interface UiTextInputProps {
  onChange: (val: string) => void
  value?: string
  inputRef?: Ref<any>

  variant?: UiTextInputVariant
  size?: UiTextInputSize
  theme?: UiTextInputTheme

  type?: 'text' | 'password' | 'number'
  placeholder?: string

  disabled?: boolean
  loading?: boolean
  status?: UiTextInputStatus

  minWidth?: string
  maxWidth?: string
  width?: string

  leftPrefix?: ReactNode
  rightPrefix?: ReactNode

  onFocus?: (e: React.FocusEvent) => void
  onBlur?: () => void

  id?: string
  className?: string
  style?: CSS.Properties
}

export const UiTextInput: FC<UiTextInputProps> = ({
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

  minWidth = 'auto',
  maxWidth = '100%',
  width = '100%',

  leftPrefix,
  rightPrefix,

  onFocus = () => {},
  onBlur = () => {},

  id,
  className = '',
  style = {},
}) => {
  const [isFocused, setIsFocused] = useState(false)

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
  }, [isFocused, disabled, variant, size, theme, isStatusApplied, status, isStatusSignVisible, loading])

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
        className={clsx(styles.input, ...classes.input)}
        onChange={(e) => onChange(e.currentTarget.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
