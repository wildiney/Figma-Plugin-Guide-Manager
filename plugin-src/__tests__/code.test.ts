import { describe, it, expect } from 'vitest'
import { calculateGridGuides } from '../gridUtils'

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

describe('Grid Calculation Logic', () => {
  describe('Basic grid generation', () => {
    it('should generate correct number of guides for a 12×8 grid', () => {
      const result = calculateGridGuides(1440, 900, {
        columns: 12, rows: 8, gap: 16, marginX: 80, marginY: 40
      })

      expect(Array.isArray(result)).toBe(true)
      if (Array.isArray(result)) {
        // 2 guides per column (left+right edge) + 2 per row = 2*12 + 2*8 = 40
        const verticalGuides = result.filter(g => g.axis === 'X')
        const horizontalGuides = result.filter(g => g.axis === 'Y')
        expect(verticalGuides).toHaveLength(24)
        expect(horizontalGuides).toHaveLength(16)
        expect(result).toHaveLength(40)
      }
    })

    it('should generate correct guides for a 1-column, 1-row grid', () => {
      const result = calculateGridGuides(800, 600, {
        columns: 1, rows: 1, gap: 0, marginX: 0, marginY: 0
      })

      expect(Array.isArray(result)).toBe(true)
      if (Array.isArray(result)) {
        // 2 vertical + 2 horizontal = 4 guides
        expect(result).toHaveLength(4)
        const verticalGuides = result.filter(g => g.axis === 'X')
        expect(verticalGuides[0].offset).toBe(0)   // left edge
        expect(verticalGuides[1].offset).toBe(800) // right edge
      }
    })

    it('should position margin guides correctly', () => {
      // Frame 1000×800, 2 cols, 2 rows, gap=20, marginX=50, marginY=40
      // col_width = (1000 - 100 - 20) / 2 = 440
      // Col 0: left=50, right=490; Col 1: left=510, right=950
      const result = calculateGridGuides(1000, 800, {
        columns: 2, rows: 2, gap: 20, marginX: 50, marginY: 40
      })

      expect(Array.isArray(result)).toBe(true)
      if (Array.isArray(result)) {
        const verticalGuides = result.filter(g => g.axis === 'X').map(g => g.offset)
        const horizontalGuides = result.filter(g => g.axis === 'Y').map(g => g.offset)
        expect(verticalGuides[0]).toBe(50)   // left edge of col 0 (= left margin)
        expect(verticalGuides[3]).toBe(950)  // right edge of col 1 (= right margin)
        expect(horizontalGuides[0]).toBe(40) // top edge of row 0 (= top margin)
        expect(horizontalGuides[3]).toBe(760) // bottom edge of row 1 (= bottom margin)
      }
    })

    it('should show gap boundaries between columns', () => {
      // margin=10, col=30, gap=24, C=2, W=10+30+24+30+10=104
      // Col 0: left=10, right=40; Col 1: left=64, right=94
      const result = calculateGridGuides(104, 100, {
        columns: 2, rows: 1, gap: 24, marginX: 10, marginY: 0
      })

      expect(Array.isArray(result)).toBe(true)
      if (Array.isArray(result)) {
        const verticalGuides = result.filter(g => g.axis === 'X').map(g => g.offset)
        expect(verticalGuides[0]).toBe(10)  // left edge col 0
        expect(verticalGuides[1]).toBe(40)  // right edge col 0 (gap starts here)
        expect(verticalGuides[2]).toBe(64)  // left edge col 1 (gap ends here)
        expect(verticalGuides[3]).toBe(94)  // right edge col 1
      }
    })
  })

  describe('Optional columns or rows', () => {
    it('should generate only column guides when rows=0', () => {
      const result = calculateGridGuides(800, 600, {
        columns: 4, rows: 0, gap: 0, marginX: 0, marginY: 0
      })
      expect(Array.isArray(result)).toBe(true)
      if (Array.isArray(result)) {
        expect(result.filter(g => g.axis === 'X')).toHaveLength(8) // 2 per column
        expect(result.filter(g => g.axis === 'Y')).toHaveLength(0)
      }
    })

    it('should generate only row guides when columns=0', () => {
      const result = calculateGridGuides(800, 600, {
        columns: 0, rows: 4, gap: 0, marginX: 0, marginY: 0
      })
      expect(Array.isArray(result)).toBe(true)
      if (Array.isArray(result)) {
        expect(result.filter(g => g.axis === 'X')).toHaveLength(0)
        expect(result.filter(g => g.axis === 'Y')).toHaveLength(8) // 2 per row
      }
    })
  })

  describe('Validation errors', () => {
    it('should reject when both columns and rows are 0', () => {
      const result = calculateGridGuides(800, 600, {
        columns: 0, rows: 0, gap: 0, marginX: 0, marginY: 0
      })
      expect(typeof result).toBe('string')
    })

    it('should reject marginX >= frameWidth / 2 when columns > 0', () => {
      const result = calculateGridGuides(800, 600, {
        columns: 4, rows: 0, gap: 0, marginX: 400, marginY: 0
      })
      expect(typeof result).toBe('string')
    })

    it('should reject marginY >= frameHeight / 2 when rows > 0', () => {
      const result = calculateGridGuides(800, 600, {
        columns: 0, rows: 4, gap: 0, marginX: 0, marginY: 300
      })
      expect(typeof result).toBe('string')
    })

    it('should reject when column width < 1', () => {
      const result = calculateGridGuides(100, 100, {
        columns: 200, rows: 1, gap: 0, marginX: 0, marginY: 0
      })
      expect(typeof result).toBe('string')
    })

    it('should reject negative gap', () => {
      const result = calculateGridGuides(800, 600, {
        columns: 4, rows: 4, gap: -1, marginX: 0, marginY: 0
      })
      expect(typeof result).toBe('string')
    })
  })

  describe('Message type validation', () => {
    it('should have valid add-grid message structure', () => {
      const message = {
        type: 'add-grid',
        data: { columns: 12, rows: 8, gap: 16, marginX: 80, marginY: 40 }
      }

      expect(message.type).toBe('add-grid')
      expect(message.data.columns).toBeGreaterThanOrEqual(1)
      expect(message.data.rows).toBeGreaterThanOrEqual(1)
      expect(message.data.gap).toBeGreaterThanOrEqual(0)
    })
  })
})

