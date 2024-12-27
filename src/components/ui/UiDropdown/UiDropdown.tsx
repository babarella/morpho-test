'use client'

import { FC, ReactNode } from 'react'
import clsx from 'clsx'
import type * as CSS from 'csstype'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export interface UiDropdownProps {
  children: ReactNode

  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  modal?: boolean

  disabled?: boolean
  loopNavigation?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  avoidCollisions?: boolean

  onKeyDown?: (e: React.KeyboardEvent) => void

  triggerContent?: ReactNode
  triggerClassName?: string
  triggerStyle?: CSS.Properties
  className?: string
  style?: CSS.Properties
}

export interface UiDropdownItemProps {
  itemRef?: any
  children?: ReactNode
  asChild?: boolean
  disabled?: boolean
  onSelect?: (e: any) => void
  textValue?: string
  className?: string
  style?: CSS.Properties
}

export type UiDropdownComponent = FC<UiDropdownProps> & {
  Item: FC<UiDropdownItemProps>
}

export const UiDropdown: UiDropdownComponent = ({
  children,

  defaultOpen,
  open,
  onOpenChange,
  modal = true,

  disabled,
  loopNavigation = false,
  side = 'bottom',
  sideOffset = 0,
  align = 'center',
  alignOffset = 0,
  avoidCollisions = true,

  onKeyDown = () => {},

  triggerContent,
  triggerClassName = '',
  triggerStyle = {},
  className = '',
  style = {},
}) => {
  return (
    <DropdownMenu.Root defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange} modal={modal}>
      <DropdownMenu.Trigger asChild disabled={disabled}>
        <div className={clsx(triggerClassName)} style={triggerStyle}>
          {triggerContent}
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={clsx(className)}
          style={style}
          loop={loopNavigation}
          side={side}
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
          avoidCollisions={avoidCollisions}
          onKeyDown={onKeyDown}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

const UiDropdownItem: FC<UiDropdownItemProps> = ({
  itemRef,
  children,
  asChild = false,
  disabled,
  onSelect,
  textValue,
  className = '',
  style = {},
}) => {
  return (
    <DropdownMenu.Item
      ref={itemRef}
      asChild={asChild}
      disabled={disabled}
      onSelect={onSelect}
      textValue={textValue}
      className={className}
      style={style}
    >
      {children}
    </DropdownMenu.Item>
  )
}

UiDropdown.Item = UiDropdownItem
