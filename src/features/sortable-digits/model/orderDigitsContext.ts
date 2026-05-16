import { createContext, useContext } from 'react'

import type { OrderDigitsContextValue } from './orderDigitsTypes'

export const OrderDigitsContext = createContext<OrderDigitsContextValue | null>(
  null,
)

export function useOrderDigitsContext() {
  const context = useContext(OrderDigitsContext)

  if (!context) {
    throw new Error(
      'OrderDigitsContext is missing. Wrap components with RandomOrderDigitsProvider.',
    )
  }

  return context
}
