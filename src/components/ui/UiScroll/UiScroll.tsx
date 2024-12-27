'use client'

import * as ScrollArea from '@radix-ui/react-scroll-area'
import { FC } from 'react'
import clsx from 'clsx'
import styles from './UiScroll.module.scss'

export type UiScrollProps = ScrollArea.ScrollAreaProps &
  React.RefAttributes<HTMLDivElement> & {
    width?: string
    height?: string
    borderRadius?: string
    size?: string
  }

export type UiScrollViewportProps = ScrollArea.ScrollAreaViewportProps & React.RefAttributes<HTMLDivElement>
export type UiScrollScrollbarProps = ScrollArea.ScrollAreaScrollbarProps & React.RefAttributes<HTMLDivElement>
export type UiScrollThumbProps = ScrollArea.ScrollAreaThumbProps & React.RefAttributes<HTMLDivElement>
export type UiScrollCornerProps = ScrollArea.ScrollAreaCornerProps & React.RefAttributes<HTMLDivElement>

export type UiScrollComponent = FC<UiScrollProps> & {
  Viewport: FC<UiScrollViewportProps>
  Scrollbar: FC<UiScrollScrollbarProps>
  Thumb: FC<UiScrollThumbProps>
  Corner: FC<UiScrollCornerProps>
}

export const UiScroll: UiScrollComponent = ({
  width = 'auto',
  height = 'auto',
  borderRadius = '0px',
  size = '4px',
  className = '',
  style = {},
  ...radixProps
}) => {
  const cssVariables = {
    '--ui-scrollbar-size': size,
  }

  return (
    <ScrollArea.Root
      className={clsx(styles.root, className)}
      style={{ height, width, borderRadius, ...cssVariables, ...style }}
      {...radixProps}
    />
  )
}

const UiScrollViewport: FC<UiScrollViewportProps> = ({ className = '', ...radixProps }) => {
  return <ScrollArea.Viewport className={clsx(styles.viewport, className)} {...radixProps} />
}

const UiScrollScrollbar: FC<UiScrollScrollbarProps> = ({ className = '', ...radixProps }) => {
  return <ScrollArea.Scrollbar className={clsx(styles.scrollbar, className)} {...radixProps} />
}

const UiScrollThumb: FC<UiScrollThumbProps> = ({ className = '', ...radixProps }) => {
  return <ScrollArea.Thumb className={clsx(styles.thumb, className)} {...radixProps} />
}

const UiScrollCorner: FC<UiScrollCornerProps> = ({ className = '', ...radixProps }) => {
  return <ScrollArea.Corner className={clsx(styles.corner, className)} {...radixProps} />
}

UiScroll.Viewport = UiScrollViewport
UiScroll.Scrollbar = UiScrollScrollbar
UiScroll.Thumb = UiScrollThumb
UiScroll.Corner = UiScrollCorner
