import '@testing-library/jest-dom/vitest'
import { it, describe, expect } from "vitest";
import Button from "./Button";
import { fireEvent, render, screen } from "@testing-library/react";

describe('Test Button Component', () => {
  const { rerender } = render(<Button label="Button" onClick={() => { }} />)

  it('Should render text correctly', () => {
    rerender(<Button label="Button" onClick={() => { }} />)
    const buttonText = screen.getByText('Button')
    expect(buttonText).toBeInTheDocument();
  })
  it('Should render left icon correctly', () => {
    rerender(<Button label="Button" leftIcon={<span data-testid="left-icon" />} onClick={() => { }} />)
    const leftIcon = screen.getByTestId("left-icon")
    expect(leftIcon).toBeInTheDocument();
  })
  it('Should render right icon correctly', () => {
    rerender(<Button label="Button" rightIcon={<span data-testid="right-icon" />} onClick={() => { }} />)
    const rightIcon = screen.getByTestId("right-icon")
    expect(rightIcon).toBeInTheDocument();
  })

  it('Calls onClick', () => {
    let clicked = false
    const handleClick = () => { clicked = true }
    rerender(<Button label="Button" onClick={handleClick} />)

    const buttonElement = screen.getByText('Button')
    fireEvent.click(buttonElement)
    expect(clicked).toBeTruthy()
  })
})