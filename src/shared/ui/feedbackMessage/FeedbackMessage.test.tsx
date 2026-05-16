import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
  GAME_MESSAGE_LOSE,
  GAME_MESSAGE_WIN,
} from '@/entities/game/config/game.constants'

import { FeedbackMessage } from './FeedbackMessage'

const classNames = {
  root: 'root',
  close: 'close',
  text: 'text',
}

describe('FeedbackMessage', () => {
  it('renders success message with status role', () => {
    render(
      <FeedbackMessage
        variant="success"
        onDismiss={vi.fn()}
        classNames={classNames}
      />,
    )

    expect(screen.getByRole('status')).toHaveTextContent(GAME_MESSAGE_WIN)
  })

  it('renders wrong message with alert role', () => {
    render(
      <FeedbackMessage
        variant="wrong"
        onDismiss={vi.fn()}
        classNames={classNames}
      />,
    )

    expect(screen.getByRole('alert')).toHaveTextContent(GAME_MESSAGE_LOSE)
  })

  it('calls onDismiss from close button', async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()

    render(
      <FeedbackMessage
        variant="success"
        onDismiss={onDismiss}
        classNames={classNames}
      />,
    )

    await user.click(
      screen.getByRole('button', { name: 'Закрыть сообщение' }),
    )

    expect(onDismiss).toHaveBeenCalledOnce()
  })
})
