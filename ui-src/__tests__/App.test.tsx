import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

// Mock parent.postMessage
global.parent = { postMessage: vi.fn() } as any

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the app with input field', () => {
    render(<App />)
    const input = screen.getByRole('spinbutton', { name: /offset \(px\)/i })
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'number')
  })

  it('should render action buttons', () => {
    render(<App />)
    expect(screen.getAllByRole('button', { name: /clear guides/i })[0]).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add margins/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /horizontal guide/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /vertical guide/i })).toBeInTheDocument()
  })

  it('should render calculation buttons', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /subtract 4px/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add 4px/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /subtract 8px/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add 8px/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /multiply by 0.62/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /multiply by 0.38/i })).toBeInTheDocument()
  })

  it('should perform addition calculation', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByRole('spinbutton', { name: /offset \(px\)/i }) as HTMLInputElement
    input.valueAsNumber = 100

    const addButton = screen.getByRole('button', { name: /add 4px/i })
    await user.click(addButton)

    expect(input.valueAsNumber).toBe(104)
  })

  it('should perform subtraction calculation', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByRole('spinbutton', { name: /offset \(px\)/i }) as HTMLInputElement
    input.valueAsNumber = 100

    const subtractButton = screen.getByRole('button', { name: /subtract 4px/i })
    await user.click(subtractButton)

    expect(input.valueAsNumber).toBe(96)
  })

  it('should perform multiplication calculation', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByRole('spinbutton', { name: /offset \(px\)/i }) as HTMLInputElement
    input.valueAsNumber = 100

    const multiplyButton = screen.getByRole('button', { name: /multiply by 0.62/i })
    await user.click(multiplyButton)

    expect(input.valueAsNumber).toBe(62)
  })

  it('should prevent negative results from subtraction', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByRole('spinbutton', { name: /offset \(px\)/i }) as HTMLInputElement
    input.valueAsNumber = 2

    const subtractButton = screen.getByRole('button', { name: /subtract 4px/i })
    await user.click(subtractButton)

    expect(input.valueAsNumber).toBe(0)
  })

  it('should send postMessage on add guide', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByRole('spinbutton', { name: /offset \(px\)/i }) as HTMLInputElement
    input.valueAsNumber = 50

    const addGuideButton = screen.getByRole('button', { name: /horizontal guide/i })
    await user.click(addGuideButton)

    expect(global.parent.postMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        pluginMessage: expect.objectContaining({ type: 'add-guide' })
      }),
      '*'
    )
  })

  it('should send postMessage on add margins', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByRole('spinbutton', { name: /offset \(px\)/i }) as HTMLInputElement
    input.valueAsNumber = 16

    const addMargensButton = screen.getByRole('button', { name: /add margins/i })
    await user.click(addMargensButton)

    expect(global.parent.postMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        pluginMessage: expect.objectContaining({ type: 'add-margins' })
      }),
      '*'
    )
  })

  it('should send postMessage on clear guides', async () => {
    const user = userEvent.setup()
    render(<App />)

    const clearButtons = screen.getAllByRole('button', { name: /clear guides/i })
    await user.click(clearButtons[0])

    expect(global.parent.postMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        pluginMessage: expect.objectContaining({ type: 'clearAllGuides' })
      }),
      '*'
    )
  })

  it('should send postMessage on get width', async () => {
    const user = userEvent.setup()
    render(<App />)

    const getWidthButton = screen.getByRole('button', { name: /width/i })
    await user.click(getWidthButton)

    expect(global.parent.postMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        pluginMessage: expect.objectContaining({ type: 'frameWidth' })
      }),
      '*'
    )
  })

  it('should send postMessage on get height', async () => {
    const user = userEvent.setup()
    render(<App />)

    const getHeightButton = screen.getByRole('button', { name: /height/i })
    await user.click(getHeightButton)

    expect(global.parent.postMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        pluginMessage: expect.objectContaining({ type: 'frameHeight' })
      }),
      '*'
    )
  })

  it('should render the Grid tab and switch to it', async () => {
    const user = userEvent.setup()
    render(<App />)

    const gridTab = screen.getByRole('tab', { name: /grid/i })
    await user.click(gridTab)

    expect(screen.getByLabelText(/columns/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/rows/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create grid/i })).toBeInTheDocument()
  })

  it('should send postMessage on create grid', async () => {
    const user = userEvent.setup()
    render(<App />)

    const gridTab = screen.getByRole('tab', { name: /grid/i })
    await user.click(gridTab)

    // columns defaults to '12', just add rows
    await user.type(screen.getByLabelText(/rows/i), '8')

    const createGridButton = screen.getByRole('button', { name: /create grid/i })
    await user.click(createGridButton)

    expect(global.parent.postMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        pluginMessage: expect.objectContaining({ type: 'add-grid' })
      }),
      '*'
    )
  })
})
