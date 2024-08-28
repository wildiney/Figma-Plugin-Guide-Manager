import { render, screen } from '@testing-library/react'
import Alerts from './Alerts'


test('Should render text correctly', () => {
  render(<Alerts />)
  const textInfo = screen.getByText('Select frame')
  expect(textInfo).toBeInTheDocument()
})

test('Should receive style from stylesheet', () => {
  render(<Alerts />)
  const alertElement = screen.getByRole('alert')
  expect(alertElement).toHaveClass(/.+warning.+/)
})



