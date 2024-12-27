import { useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { isAddress } from 'viem'
import { ERROR_MESSAGES } from '@/constants/messages'
import { fetchSearchByAddress, fetchSearchByName, VaultSearchItem } from '@/lib/vaults'

export enum VaultsSearchErrorType {
  AddressInvalid,
  NotFoundByName,
  NotFoundByAddress,
  UnexpectedError,
}

export interface VaultsSearchError {
  type: VaultsSearchErrorType
  message: string
}

function isSearchByAddress(value: string) {
  return value.toLowerCase().startsWith('0x')
}

export function useVaultsSearch() {
  const [userInput, setUserInput] = useState('')
  const [error, setError] = useState<VaultsSearchError | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFirstLoadDone, setIsFirstLoadDone] = useState(false)
  const [searchResult, setSearchResult] = useState<VaultSearchItem[]>([])
  const isPreRequestError = useRef(false)
  const userInputRef = useRef('')

  /**
   * Sync validation of input to prevent unnecessary requests
   */
  function runPreRequestValidation(value: string): boolean {
    const isPotentialAddress = isSearchByAddress(value)

    // Potential address input is invalid
    if (isPotentialAddress && !isAddress(value)) {
      setError({
        type: VaultsSearchErrorType.AddressInvalid,
        message: ERROR_MESSAGES.invalidAddress,
      })
      return false
    }

    setError(null)
    return true
  }

  /**
   * Since debounce in play - watch out for race conditions
   */
  const debouncedSearch = useDebouncedCallback(async (searchQuery: string) => {
    // Race condition prevention
    function isRaceConditionDetected() {
      // Don't update anything if user emptied input while loading of prev data
      // Don't update anything if while loading prev data the input search changed (avoid flickering)
      return !userInputRef.current || userInputRef.current !== searchQuery
    }

    if (isRaceConditionDetected()) return

    try {
      setIsLoading(true)

      let response: VaultSearchItem[] = []

      const isAddressSearch = isSearchByAddress(searchQuery)
      if (isAddressSearch) response = await fetchSearchByAddress()
      else response = await fetchSearchByName()

      if (isRaceConditionDetected()) return

      if (!response.length) {
        setError({
          type: isAddressSearch ? VaultsSearchErrorType.NotFoundByAddress : VaultsSearchErrorType.NotFoundByName,
          message: isAddressSearch ? ERROR_MESSAGES.vaultNotFoundByAddress : ERROR_MESSAGES.vaultNotFoundByName,
        })
      }

      setSearchResult(response)
    } catch (e) {
      if (isRaceConditionDetected()) return
      setError({
        type: VaultsSearchErrorType.UnexpectedError,
        message: ERROR_MESSAGES.unexpected,
      })
    } finally {
      if (isPreRequestError.current || isRaceConditionDetected()) return
      setIsLoading(false)
      setIsFirstLoadDone(true)
    }
  }, 400)

  function handleUserInputChange(value: string) {
    isPreRequestError.current = !runPreRequestValidation(value)
    if (isPreRequestError.current) {
      debouncedSearch.cancel()
    }
    userInputRef.current = value
    setUserInput(value)
  }

  useEffect(() => {
    if (!userInput || isPreRequestError.current) {
      // Make sure to reset data if inout is empty
      setIsLoading(false)
      setSearchResult([])
      setIsFirstLoadDone(false)
      return
    } else {
      debouncedSearch(userInput)
    }
  }, [userInput])

  return { userInput, handleUserInputChange, error, isLoading, searchResult, isFirstLoadDone }
}
