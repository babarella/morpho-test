'use client'

import { FC } from 'react'
import { UiBlock, UiBlockProps, UiDropdown, UiDropdownProps, UiIcon, UiImageWithFallback } from '@/components/ui'
import { VaultSearchItem } from '@/lib/vaults'
import styles from './VaultsDropdown.module.scss'

export type VaultsDropdownProps = Pick<UiBlockProps, 'width' | 'minWidth' | 'maxWidth' | 'minHeight' | 'maxHeight'> &
  Omit<UiDropdownProps, 'triggerClassName' | 'triggerStyle' | 'children'> & {
    items: VaultSearchItem[]
    firstItemRef?: any
  }

export const VaultsDropdown: FC<VaultsDropdownProps> = ({
  items,
  firstItemRef,

  width,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,

  className = '',
  style = {},
  ...dropdownProps
}) => {
  return (
    <UiDropdown {...dropdownProps} triggerClassName={className} style={style}>
      <UiBlock
        px="12px"
        py="12px"
        width={width}
        minWidth={minWidth}
        maxWidth={maxWidth}
        minHeight={minHeight}
        maxHeight={maxHeight}
      >
        {items.length ? (
          <>
            {items.map((vaultItem, vaultItemIdx) => (
              <UiDropdown.Item
                itemRef={vaultItemIdx === 0 ? firstItemRef : undefined}
                key={`vault_${vaultItem.address}`}
                textValue={vaultItem.address}
                className={styles.dropdownItem}
              >
                <div className={styles.itemPresentation}>
                  <div className={styles.icon}>
                    <UiImageWithFallback
                      src="/glode.svg"
                      width={16}
                      height={16}
                      alt={vaultItem.name}
                      fallback={<div className={styles.iconFallback} />}
                      displayFallbackOnLoading
                    />
                  </div>
                  <div>{vaultItem.name}</div>
                </div>
                <UiIcon className={styles.arrowIcon} variant="arrowRight" blockSize="20px" size={9} />
              </UiDropdown.Item>
            ))}
          </>
        ) : (
          <div className={styles.empty}>No results :(</div>
        )}
      </UiBlock>
    </UiDropdown>
  )
}
