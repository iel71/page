'use client'
import React, { useEffect, useState } from 'react'

export default function ScrollButton() {
  const [showButton, setShowButton] = useState(false)
  const [isAboveFooter, setIsAboveFooter] = useState(false)
  const [bottomOffset, setBottomOffset] = useState(30)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const documentHeight = document.body.scrollHeight
      const defaultOffset = 30

      const rootStyles = getComputedStyle(document.documentElement)
      const footerHeightStr = rootStyles
        .getPropertyValue('--footer-height')
        .trim()
      const footerHeight = parseInt(footerHeightStr.replace('px', '')) || 0

      const currentBottom = scrollY + viewportHeight
      const footerStart = documentHeight - footerHeight

      const overlap = Math.max(0, currentBottom - footerStart)
      const newOffset = defaultOffset + overlap

      setBottomOffset(newOffset)
      setShowButton(scrollY > 0)

      // 디버깅
      //   console.log({
      //     scrollY,
      //     viewportHeight,
      //     documentHeight,
      //     footerHeight,
      //     bottomOffset: newOffset,
      //   })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <div
      className={`top-button ${showButton ? 'show' : ''} `}
      style={{ bottom: `${bottomOffset}px` }}
    >
      <button onClick={scrollToTop} aria-label="페이지 상단으로 이동">
        <img src="/images/icon_top.svg" alt="상단으로 가기 버튼" />
      </button>
    </div>
  )
}
