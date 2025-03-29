'use client'

import { useEffect, useState } from 'react'

export default function MswProvider({ children }) {
  const [isReady, setIsReady] = useState(process.env.NODE_ENV !== 'development')
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('../mocks/browser').then(async ({ worker }) => {
        await worker.start({
          onUnhandledRequest: 'bypass',
        })
        console.log('✅ MSW started')
        setIsReady(true)
      })
    } else {
      setIsReady(true)
    }
  }, [])

  if (!isReady) return null

  return children
}
