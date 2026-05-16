import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useOrderDigitsContext } from './orderDigitsContext'

describe('useOrderDigitsContext', () => {
  it('throws when provider is missing', () => {
    expect(() => renderHook(() => useOrderDigitsContext())).toThrow(
      'OrderDigitsContext is missing. Wrap components with RandomOrderDigitsProvider.',
    )
  })
})
