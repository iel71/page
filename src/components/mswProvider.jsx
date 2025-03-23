'use client'

import { useEffect } from 'react'

export default function MswProvider() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('../mocks/browser').then(({ worker }) => {
        worker.start({
          onUnhandledRequest: 'warn',
        })
        console.log('✅ MSW started')
      })
    }
  }, [])

  return null
}
