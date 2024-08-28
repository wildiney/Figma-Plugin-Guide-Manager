import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import Title from './Title'


it('Should render text correctly', () => {
  render(<Title>Teste</Title>)
  const text = screen.getByText('Teste')
  expect(text).toBeInTheDocument();

})

it('Should receive style from stylesheet', () => {
  render(<Title>Teste</Title>)
  const alertElement = screen.getByRole('heading')
  expect(alertElement).toHaveClass(/.+title.+/)
})


