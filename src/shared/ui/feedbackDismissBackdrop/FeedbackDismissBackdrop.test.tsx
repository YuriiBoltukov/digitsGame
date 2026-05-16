import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { FeedbackDismissBackdrop } from './FeedbackDismissBackdrop'

describe('FeedbackDismissBackdrop', () => {
  it('calls onDismiss when clicked', async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()

    render(
      <FeedbackDismissBackdrop
        ariaLabel="Закрыть"
        onDismiss={onDismiss}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Закрыть' }))

    expect(onDismiss).toHaveBeenCalledOnce()
  })
})
