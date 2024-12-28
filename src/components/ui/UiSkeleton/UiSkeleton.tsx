'use client'

import React, { FC } from 'react'
import Skeleton, { SkeletonProps, SkeletonTheme } from 'react-loading-skeleton'

export type UiSkeletonProps = SkeletonProps

export const UiSkeleton: FC<UiSkeletonProps> = ({ ...restProps }) => {
  const baseColor = restProps.baseColor || '#E5E5E5'
  const highlightColor = restProps.highlightColor || '#F0F0F0'

  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      <Skeleton {...restProps} />
    </SkeletonTheme>
  )
}
