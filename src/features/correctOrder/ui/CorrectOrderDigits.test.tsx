import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CorrectOrderDigits } from './CorrectOrderDigits'

describe('CorrectOrderDigits', () => {
  it('renders sorted digits and title for ascending order', () => {
    render(
      <CorrectOrderDigits digits={[3, 1, 2]} targetOrder="ascending" />,
    )

    expect(
      screen.getByRole('banner', {
        name: /Правильный порядок \(от меньшего к большему\)/,
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('listitem').map((el) => el.textContent)).toEqual(
      ['1', '2', '3'],
    )
  })

  it('renders descending title and order', () => {
    render(
      <CorrectOrderDigits digits={[3, 1, 2]} targetOrder="descending" />,
    )

    expect(
      screen.getByText(/от большего к меньшему/),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('listitem').map((el) => el.textContent)).toEqual(
      ['3', '2', '1'],
    )
  })

  it('returns null when digits are empty', () => {
    const { container } = render(
      <CorrectOrderDigits digits={[]} targetOrder="ascending" />,
    )

    expect(container).toBeEmptyDOMElement()
  })
})
