import '@testing-library/jest-dom/vitest'
import { it, describe, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'
import { PLUGIN_VERSION } from '../../../constants'

describe('Test Alert Component', () => {
  const { rerender } = render(<Footer />)

  it('Should render url correctly', () => {
    rerender(<Footer />)
    const textInfo = screen.getByText('www.wildiney.com')
    expect(textInfo).toBeInTheDocument();
  })

  it('Should render version correctly', () => {
    rerender(<Footer />)
    const version = screen.getByText(PLUGIN_VERSION)
    expect(version).toBeInTheDocument();
  })

  it('Should receive style from stylesheet', () => {
    rerender(<Footer data-testid='footer' />)
    const cssClass = screen.getByTestId('footer')
    expect(cssClass).toHaveClass(/.+footer.+/)
  })

})

