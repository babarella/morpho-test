import { FC, ReactNode, useMemo } from 'react'
import clsx from 'clsx'
import type * as CSS from 'csstype'
import styles from './UiBlock.module.scss'

export interface UiBlockProps {
  children: ReactNode
  borderRadius?: string
  px?: string
  py?: string
  width?: string
  height?: string
  minWidth?: string
  minHeight?: string
  maxWidth?: string
  maxHeight?: string
  className?: string
  style?: CSS.Properties
}

export const UiBlock: FC<UiBlockProps> = ({
  children,
  borderRadius,
  px,
  py,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  className = '',
  style = {},
}) => {
  const stylingApi = useMemo(() => {
    const result: CSS.Properties = {}

    if (borderRadius) result.borderRadius = borderRadius
    if (px) {
      result.paddingLeft = px
      result.paddingRight = px
    }
    if (py) {
      result.paddingTop = py
      result.paddingBottom = py
    }
    if (width) result.width = width
    if (height) result.height = height
    if (minWidth) result.minWidth = minWidth
    if (minHeight) result.minHeight = minHeight
    if (maxWidth) result.maxWidth = maxWidth
    if (maxHeight) result.maxHeight = maxHeight
    // Add new shortcuts here

    return result
  }, [borderRadius, px, py, width, height, minWidth, minHeight, maxWidth, maxHeight])

  return (
    <div className={clsx(styles.block, className)} style={{ ...stylingApi, ...style }}>
      {children}
    </div>
  )
}
