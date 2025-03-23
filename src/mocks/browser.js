import { setupWorker } from 'msw'
import { handlers } from './handlers'

console.log('📦 MSW browser.js loaded')

export const worker = setupWorker(...handlers)
