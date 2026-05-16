import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { FeedbackCloseButton } from './FeedbackCloseButton'

describe('FeedbackCloseButton', () => {
  it('calls onClick when pressed', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<FeedbackCloseButton onClick={onClick} />)

    await user.click(
      screen.getByRole('button', { name: 'Закрыть сообщение' }),
    )

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('applies optional className', () => {
    render(
      <FeedbackCloseButton onClick={vi.fn()} className="extra-class" />,
    )

    expect(
      screen.getByRole('button', { name: 'Закрыть сообщение' }),
    ).toHaveClass('extra-class')
  })
})
