'use client'

/* eslint-disable jsx-a11y/alt-text */

import { FC, ReactNode, useState } from 'react'
import Image from 'next/image'

export type UiImageWithFallbackProps = Omit<
  React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  'height' | 'width' | 'loading' | 'ref' | 'alt' | 'src' | 'srcSet'
> & {
  src: string
  alt: string
  width?: number | `${number}`
  height?: number | `${number}`
  fill?: boolean
  loader?: any
  quality?: number | `${number}`
  priority?: boolean
  loading?: 'eager' | 'lazy' | undefined
  placeholder?: 'blur' | 'empty' | `data:image/${string}`
  blurDataURL?: string
  unoptimized?: boolean
  overrideSrc?: string
  onLoadingComplete?: (img: HTMLImageElement) => void
  layout?: string
  objectFit?: string
  objectPosition?: string
  lazyBoundary?: string
  lazyRoot?: string
} & React.RefAttributes<HTMLImageElement | null> & {
    fallback: ReactNode
    displayFallbackOnLoading?: boolean
  }

export const UiImageWithFallback: FC<UiImageWithFallbackProps> = ({
  fallback,
  displayFallbackOnLoading = false,
  ...nextImageProps
}) => {
  const [isFailed, setIsFailed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  if (isFailed || (displayFallbackOnLoading && isLoading)) return fallback

  return (
    <Image
      {...nextImageProps}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          // Broken image
          setIsFailed(true)
        }
        setIsLoading(true)
      }}
      onError={() => {
        setIsFailed(true)
      }}
    />
  )
}
