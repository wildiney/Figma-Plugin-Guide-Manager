import '@testing-library/jest-dom/vitest'
import { it, describe, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Alerts from './Alerts'

describe('Test Alert Component', () => {
  const { rerender } = render(<Alerts />)

  it('Should render text correctly', () => {
    rerender(<Alerts />)
    const textInfo = screen.getByText('Select frame')
    expect(textInfo).toBeInTheDocument();

  })

  it('Should receive style from stylesheet', () => {
    rerender(<Alerts />)
    const alertElement = screen.getByRole('alert')
    expect(alertElement).toHaveClass(/.+warning.+/)
  })

})

