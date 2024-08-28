import '@testing-library/jest-dom/vitest'
import { it, describe, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Title from './Title'

describe('Test Alert Component', () => {
  const { rerender } = render(<Title>Teste</Title>)

  it('Should render text correctly', () => {
    rerender(<Title>Teste</Title>)
    const text = screen.getByText('Teste')
    expect(text).toBeInTheDocument();

  })

  it('Should receive style from stylesheet', () => {
    rerender(<Title>Teste</Title>)
    const alertElement = screen.getByRole('heading')
    expect(alertElement).toHaveClass(/.+title.+/)
  })

})

