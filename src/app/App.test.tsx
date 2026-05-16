import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/entities/game/lib/generateGameRound', () => ({
  generateGameRound: vi.fn(() => ({
    digits: [2, 1],
    targetOrder: 'ascending' as const,
  })),
}))

vi.mock('@/features/gameFeedback', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/features/gameFeedback')>()

  return {
    ...actual,
    useCompactGameFeedback: vi.fn(() => true),
  }
})

vi.mock('@/features/sortableDigits/lib/createItems', () => ({
  createItems: (digits: readonly number[]) =>
    digits.map((value, index) => ({
      id: `item-${index}`,
      value,
    })),
}))

import App from './App'

describe('App', () => {
  it('renders game page', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Текущая последовательность' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Проверить ответ' }),
    ).toBeInTheDocument()
  })
})
