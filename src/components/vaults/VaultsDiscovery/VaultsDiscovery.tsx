'use client'

import React, { FC, useRef, useState } from 'react'
import clsx from 'clsx'
import type * as CSS from 'csstype'
import { UiBlock, UiFieldError, UiLabel, UiTextField } from '@/components/ui'
import styles from './VaultsDiscovery.module.scss'
import { VaultsDropdown } from '../VaultsDropdown'
import { useVaultsSearch, VaultsSearchErrorType } from '@/hooks/vaults'
import { useClickAway } from 'react-use'
import { findAncestorElementById } from '@/lib/utils/dom'

export interface VaultsDiscoveryProps {
  className?: string
  style?: CSS.Properties
}

export const VaultsDiscovery: FC<VaultsDiscoveryProps> = ({ className = '', style = {} }) => {
  const { userInput, handleUserInputChange, error, isLoading, searchResult, isFirstLoadDone } = useVaultsSearch()

  const [isAlwaysFocused, setIsAlwaysFocused] = useState(true)
  const inputRef = useRef<any>(null)
  const firstDropdownItemRef = useRef<any>(null)
  const inputContainerRef = useRef<any>(null)
  const [isFocused, setIsFocused] = useState(false)

  // Doing this hack because of radix auto-focus on dropdown 1st item
  useClickAway(inputContainerRef, (e) => {
    setIsAlwaysFocused(false)
    inputRef?.current?.blur()
    if (!findAncestorElementById(e.target as HTMLElement, 'searchDropdown')) {
      setIsFocused(false)
    }
  })

  const isDropdownOpen = (!!searchResult.length || (!!userInput.length && isFirstLoadDone)) && isFocused

  const searchStatus = searchResult.length ? 'success' : error ? 'error' : undefined
  const isErrorHighlighted =
    VaultsSearchErrorType.NotFoundByName === error?.type || VaultsSearchErrorType.NotFoundByAddress === error?.type

  // Make sure user can navigate to dropdown with arrowDown via keyboard
  function handleInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setIsFocused(false)
      e.stopPropagation()
    } else setIsFocused(true)

    if (e.key !== 'ArrowDown' || !isDropdownOpen) return
    e.preventDefault()
    setIsAlwaysFocused(false)
    firstDropdownItemRef?.current?.focus()
  }

  function handleDropdownKeydown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') inputRef?.current?.focus()
  }

  return (
    <UiBlock
      borderRadius="8px"
      py="37px"
      width="100%"
      maxWidth="350px"
      minHeight="160px"
      className={clsx(styles.wrapper, className)}
      style={style}
    >
      <UiLabel htmlFor="search">Vault Address or Name</UiLabel>
      <div ref={inputContainerRef}>
        <UiTextField
          id="search"
          inputRef={inputRef}
          alwaysFocused={isAlwaysFocused}
          onFocus={() => {
            setIsAlwaysFocused(true)
            setIsFocused(true)
          }}
          value={userInput}
          onChange={handleUserInputChange}
          placeholder="Enter Vault Address or Name..."
          status={searchStatus}
          loading={isLoading}
          errorHighlighted={isErrorHighlighted}
          onKeyDown={handleInputKeyDown}
        />
      </div>
      <UiFieldError visible={searchStatus === 'error'}>{error?.message}</UiFieldError>
      <VaultsDropdown
        id="searchDropdown"
        open={isDropdownOpen}
        items={searchResult}
        firstItemRef={firstDropdownItemRef}
        width="310px"
        height="200px"
        loopNavigation
        modal={false}
        sideOffset={searchStatus === 'error' ? 10 : 0}
        onKeyDown={handleDropdownKeydown}
      />
    </UiBlock>
  )
}
