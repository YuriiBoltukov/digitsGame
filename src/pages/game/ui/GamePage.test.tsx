import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/entities/game/lib/generateGameRound', () => ({
  generateGameRound: vi.fn(() => ({
    digits: [3, 1, 2],
    targetOrder: 'ascending' as const,
  })),
}))

vi.mock('@/features/gameFeedback', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/features/gameFeedback')>()

  return {
    ...actual,
    useCompactGameFeedback: vi.fn(() => false),
  }
})

vi.mock('@/features/sortableDigits/lib/createItems', () => ({
  createItems: () => [
    { id: 'item-0', value: 1 },
    { id: 'item-1', value: 2 },
    { id: 'item-2', value: 3 },
  ],
}))

import { GamePage } from './GamePage'

describe('GamePage', () => {
  it('renders game layout with check button', () => {
    render(<GamePage />)

    expect(
      screen.getByRole('banner', {
        name: /Правильный порядок/,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Проверить ответ' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('complementary', {
        name: 'Кот — сообщение при успехе',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('complementary', {
        name: 'Динозавр — сообщение при ошибке',
      }),
    ).toBeInTheDocument()
  })

  it('shows compact toast feedback when enabled', async () => {
    const { useCompactGameFeedback } = await import('@/features/gameFeedback')

    vi.mocked(useCompactGameFeedback).mockReturnValue(true)

    render(<GamePage />)

    expect(
      screen.queryByRole('complementary', {
        name: 'Кот — сообщение при успехе',
      }),
    ).not.toBeInTheDocument()
  })

  it('shows success flow after correct answer', async () => {
    const user = userEvent.setup()

    render(<GamePage />)

    await user.click(
      screen.getByRole('button', { name: 'Проверить ответ' }),
    )

    expect(screen.getByText('Победа!')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Новая игра' }),
    ).toBeInTheDocument()
  })

  it('starts a new game after win', async () => {
    const user = userEvent.setup()

    render(<GamePage />)

    await user.click(
      screen.getByRole('button', { name: 'Проверить ответ' }),
    )
    await user.click(screen.getByRole('button', { name: 'Новая игра' }))

    expect(
      screen.getByRole('button', { name: 'Проверить ответ' }),
    ).toBeInTheDocument()
    expect(screen.queryByText('Победа!')).not.toBeInTheDocument()
  })
})
