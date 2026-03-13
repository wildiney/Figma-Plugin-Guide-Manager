export interface GuideData {
  axis: 'X' | 'Y'
  offset: number
}

export interface GridData {
  columns: number
  rows: number
  gap: number
  marginX: number
  marginY: number
}

export function calculateGridGuides (
  frameWidth: number,
  frameHeight: number,
  data: GridData
): GuideData[] | string {
  const { columns: C, rows: R, gap: G, marginX: MX, marginY: MY } = data

  if (C < 0 || R < 0) return 'Columns and rows must be non-negative'
  if (C === 0 && R === 0) return 'At least columns or rows must be >= 1'
  if (G < 0 || MX < 0 || MY < 0) return 'Gap and margins must be non-negative'
  if (C > 0 && MX >= frameWidth / 2) return 'Margin X is too large for this frame'
  if (R > 0 && MY >= frameHeight / 2) return 'Margin Y is too large for this frame'

  const guides: GuideData[] = []

  if (C > 0) {
    const colWidth = (frameWidth - 2 * MX - (C - 1) * G) / C
    if (colWidth < 1) return 'Column width is too small — reduce columns or gap'

    // Two guides per column: left edge and right edge
    for (let i = 0; i < C; i++) {
      const colLeft = MX + i * (colWidth + G)
      guides.push({ axis: 'X', offset: Math.round(colLeft) })
      guides.push({ axis: 'X', offset: Math.round(colLeft + colWidth) })
    }
  }

  if (R > 0) {
    const rowHeight = (frameHeight - 2 * MY - (R - 1) * G) / R
    if (rowHeight < 1) return 'Row height is too small — reduce rows or gap'

    // Two guides per row: top edge and bottom edge
    for (let i = 0; i < R; i++) {
      const rowTop = MY + i * (rowHeight + G)
      guides.push({ axis: 'Y', offset: Math.round(rowTop) })
      guides.push({ axis: 'Y', offset: Math.round(rowTop + rowHeight) })
    }
  }

  return guides
}
