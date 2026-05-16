import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { LeftMascot } from './LeftMascot'

describe('LeftMascot', () => {
  it('renders left mascot column', () => {
    render(
      <LeftMascot feedback="success" onDismissFeedback={vi.fn()} />,
    )

    expect(
      screen.getByRole('complementary', {
        name: 'Кот — сообщение при успехе',
      }),
    ).toBeInTheDocument()
  })
})
