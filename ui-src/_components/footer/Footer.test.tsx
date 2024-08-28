import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { PLUGIN_VERSION } from '../../../constants'
import Footer from './Footer'


it('Should render url correctly', () => {
  render(<Footer />)
  const textInfo = screen.getByText('www.wildiney.com')
  expect(textInfo).toBeInTheDocument();
})

it('Should render version correctly', () => {
  render(<Footer />)
  const version = screen.getByText(PLUGIN_VERSION)
  expect(version).toBeInTheDocument();
})

it('Should receive style from stylesheet', () => {
  render(<Footer data-testid='footer' />)
  const cssClass = screen.getByTestId('footer')
  expect(cssClass).toHaveClass(/.+footer.+/)
})



