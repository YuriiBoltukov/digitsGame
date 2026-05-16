import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
  GAME_MESSAGE_LOSE,
  GAME_MESSAGE_WIN,
} from '@/entities/game/config/game.constants'

import { GameFeedbackToast } from './GameFeedbackToast'

describe('GameFeedbackToast', () => {
  it('renders nothing when feedback is null', () => {
    const { container } = render(
      <GameFeedbackToast feedback={null} onDismiss={vi.fn()} />,
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('renders success toast', () => {
    render(
      <GameFeedbackToast feedback="success" onDismiss={vi.fn()} />,
    )

    expect(screen.getByText(GAME_MESSAGE_WIN)).toBeInTheDocument()
  })

  it('renders wrong toast', () => {
    render(<GameFeedbackToast feedback="wrong" onDismiss={vi.fn()} />)

    expect(screen.getByText(GAME_MESSAGE_LOSE)).toBeInTheDocument()
  })

  it('dismisses when clicking outside the toast', async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()

    render(
      <GameFeedbackToast feedback="success" onDismiss={onDismiss} />,
    )

    await user.click(
      screen.getByRole('button', { name: 'Закрыть уведомление' }),
    )

    expect(onDismiss).toHaveBeenCalledOnce()
  })
})
