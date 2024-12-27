'use client'

import { FC } from 'react'
import {
  UiBlock,
  UiBlockProps,
  UiDropdown,
  UiDropdownProps,
  UiIcon,
  UiImageWithFallback,
  UiScroll,
} from '@/components/ui'
import { VaultSearchItem } from '@/lib/vaults'
import styles from './VaultsDropdown.module.scss'

export type VaultsDropdownProps = Pick<UiBlockProps, 'width' | 'height' | 'borderRadius'> &
  Omit<UiDropdownProps, 'triggerClassName' | 'triggerStyle' | 'children'> & {
    items: VaultSearchItem[]
    firstItemRef?: any
  }

export const VaultsDropdown: FC<VaultsDropdownProps> = ({
  items,
  firstItemRef,

  width,
  height,
  borderRadius = '20px',

  onKeyDown = () => {},

  className = '',
  style = {},
  ...dropdownProps
}) => {
  return (
    <UiDropdown {...dropdownProps} triggerClassName={className} style={style} onKeyDown={onKeyDown}>
      <UiScroll height={height} width={width} borderRadius={borderRadius}>
        <UiScroll.Viewport>
          <UiBlock px="12px" py="12px" borderRadius={borderRadius}>
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
                          src={vaultItem.image}
                          width={16}
                          height={16}
                          alt={vaultItem.name}
                          fallback={<div className={styles.iconFallback} />}
                        />
                      </div>
                      <div>{vaultItem.name}</div>
                    </div>
                    <UiIcon className={styles.arrowIcon} variant="arrowRight" blockSize="20px" size={9} />
                  </UiDropdown.Item>
                ))}
              </>
            ) : (
              <div className={styles.empty} onKeyDown={onKeyDown}>
                No results :(
              </div>
            )}
          </UiBlock>
        </UiScroll.Viewport>
        <UiScroll.Scrollbar orientation="vertical">
          <UiScroll.Thumb />
        </UiScroll.Scrollbar>
      </UiScroll>
    </UiDropdown>
  )
}
