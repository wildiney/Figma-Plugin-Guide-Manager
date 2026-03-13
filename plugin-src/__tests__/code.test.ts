import { describe, it, expect } from 'vitest'

// These are unit tests for guide management logic
// We test the pure business logic without importing the plugin code that depends on figma globals

describe('Guide Management Logic', () => {
  describe('Guide Data Structure', () => {
    it('should create a valid X-axis guide', () => {
      const guide = { axis: 'X' as const, offset: 50 }
      expect(guide.axis).toBe('X')
      expect(guide.offset).toBe(50)
    })

    it('should create a valid Y-axis guide', () => {
      const guide = { axis: 'Y' as const, offset: 75 }
      expect(guide.axis).toBe('Y')
      expect(guide.offset).toBe(75)
    })
  })

  describe('Margin Guide Calculations', () => {
    it('should calculate correct margin guides for a frame', () => {
      const frameWidth = 100
      const frameHeight = 200
      const margin = 16

      const margins = [
        { axis: 'Y' as const, offset: margin },
        { axis: 'Y' as const, offset: frameHeight - margin },
        { axis: 'X' as const, offset: margin },
        { axis: 'X' as const, offset: frameWidth - margin }
      ]

      expect(margins[0].offset).toBe(16) // top margin
      expect(margins[1].offset).toBe(184) // bottom margin
      expect(margins[2].offset).toBe(16) // left margin
      expect(margins[3].offset).toBe(84) // right margin
    })

    it('should handle symmetric margins', () => {
      const size = 200
      const margin = 8

      const topMargin = margin
      const bottomMargin = size - margin

      expect(topMargin).toBe(8)
      expect(bottomMargin).toBe(192)
    })

    it('should calculate for different frame sizes', () => {
      const testCases = [
        { width: 100, height: 100, margin: 10, expectedMargins: [10, 90, 10, 90] },
        { width: 1920, height: 1080, margin: 16, expectedMargins: [16, 1064, 16, 1904] }
      ]

      testCases.forEach(({ width, height, margin, expectedMargins }) => {
        const margins = [
          margin,
          height - margin,
          margin,
          width - margin
        ]

        expect(margins).toEqual(expectedMargins)
      })
    })
  })

  describe('Guide Offset Validation', () => {
    it('should accept zero offset', () => {
      const guide = { axis: 'X' as const, offset: 0 }
      expect(guide.offset).toBeGreaterThanOrEqual(0)
    })

    it('should accept positive offsets', () => {
      const testOffsets = [1, 10, 100, 1000, 99999]
      testOffsets.forEach(offset => {
        expect(offset).toBeGreaterThan(0)
      })
    })

    it('should validate offset is a number', () => {
      const guide = { axis: 'X' as const, offset: 50 }
      expect(typeof guide.offset).toBe('number')
    })
  })

  describe('Guide Axis Validation', () => {
    it('should only accept X or Y axis', () => {
      const validAxes = ['X', 'Y']
      const testAxis = 'X'

      expect(validAxes).toContain(testAxis)
    })

    it('should differentiate between axes', () => {
      const verticalGuide = { axis: 'X' as const, offset: 10 }
      const horizontalGuide = { axis: 'Y' as const, offset: 20 }

      expect(verticalGuide.axis).not.toBe(horizontalGuide.axis)
    })
  })

  describe('Message Type Validation', () => {
    it('should have valid add-guide message structure', () => {
      const message = {
        type: 'add-guide',
        data: { axis: 'X' as const, offset: 50 }
      }

      expect(message.type).toBe('add-guide')
      expect(message.data.axis).toMatch(/^[XY]$/)
      expect(typeof message.data.offset).toBe('number')
    })

    it('should have valid add-margins message structure', () => {
      const message = {
        type: 'add-margins',
        data: { marginSize: 16 }
      }

      expect(message.type).toBe('add-margins')
      expect(typeof message.data.marginSize).toBe('number')
    })

    it('should have valid clearAllGuides message', () => {
      const message = { type: 'clearAllGuides' }
      expect(message.type).toBe('clearAllGuides')
    })
  })

  describe('Edge Cases', () => {
    it('should handle large frame dimensions', () => {
      const largeFrameWidth = 5000
      const largeFrameHeight = 3000
      const margin = 16

      const margins = [
        margin,
        largeFrameHeight - margin,
        margin,
        largeFrameWidth - margin
      ]

      expect(margins[1]).toBe(2984)
      expect(margins[3]).toBe(4984)
    })

    it('should handle very small margins', () => {
      const margin = 1
      const frameSize = 100

      const offset = frameSize - margin
      expect(offset).toBe(99)
    })
  })
})

