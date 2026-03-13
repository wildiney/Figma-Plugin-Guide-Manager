const windowWidth = 360
const windowHeight = 642

figma.showUI(__html__, {
  themeColors: true,
  width: windowWidth,
  height: windowHeight,
})

// Type definitions for message payloads
interface GuideData {
  axis: 'X' | 'Y'
  offset: number
}

interface MarginData {
  marginSize: string | number
}

interface PluginMessage {
  type: string
  data?: GuideData | MarginData | any
}

export function addGuides (selection: FrameNode, guide: GuideData) {
  try {
    selection.guides = selection.guides.concat(guide)
  } catch (error) {
    figma.notify('Error adding guide')
    console.error('Failed to add guide:', error)
  }
}

function handleSelectionChange () {
  const selected = figma.currentPage.selection

  if (selected && selected.length > 0) {
    figma.ui.postMessage({ type: 'selectionchange', status: 'selected' })
  } else {
    figma.ui.postMessage({ type: 'selectionchange', status: 'none' })
  }
}

function handleAddGuide (selection: FrameNode, guideData: any) {
  if (selection.type === 'FRAME') {
    addGuides(selection, guideData)
  } else {
    figma.notify('Please, select a frame')
  }
}

function handleAddMargins (selection: FrameNode, marginSize: number) {
  if (marginSize < 0) {
    figma.notify('Margin size must be positive')
    return
  }

  const { height, width } = selection

  if (marginSize > Math.max(width, height) / 2) {
    figma.notify('Margin size is too large for this frame')
    return
  }

  const margins: GuideData[] = [
    { axis: 'Y', offset: marginSize },
    { axis: 'Y', offset: height - marginSize },
    { axis: 'X', offset: marginSize },
    { axis: 'X', offset: width - marginSize },
  ]

  margins.forEach((margin) => addGuides(selection, margin))
}

function handleClearAllGuides (selection: FrameNode) {
  selection.guides = []
}
function handleFrameSize (selection: FrameNode, dimension: 'width' | 'height') {
  if (!selection || selection.type !== 'FRAME') {
    return 0
  }
  return selection[dimension]
}

figma.on('selectionchange', handleSelectionChange)

figma.ui.onmessage = (msg: PluginMessage) => {
  try {
    const selectedFrames = figma.currentPage.selection.filter(
      (sel) => sel.type === 'FRAME'
    ) as FrameNode[]

    if (selectedFrames.length <= 0 && msg.type !== 'close') {
      figma.notify('Please, select a frame')
      return
    }

    switch (msg.type) {
      case 'add-guide': {
        if (!msg.data) {
          figma.notify('Invalid guide data')
          return
        }
        const guideData = msg.data as GuideData
        if (guideData.axis !== 'X' && guideData.axis !== 'Y') {
          figma.notify('Invalid axis. Use X or Y')
          return
        }
        if (typeof guideData.offset !== 'number' || guideData.offset < 0) {
          figma.notify('Invalid offset value')
          return
        }
        selectedFrames.forEach((selection) => handleAddGuide(selection, guideData))
        break
      }

      case 'add-margins': {
        if (!msg.data) {
          figma.notify('Invalid margin data')
          return
        }
        const marginSize = parseInt(msg.data.marginSize as string, 10)
        if (isNaN(marginSize) || marginSize < 0) {
          figma.notify('Invalid margin size')
          return
        }
        selectedFrames.forEach((selection) =>
          handleAddMargins(selection, marginSize)
        )
        break
      }

      case 'clearAllGuides': {
        selectedFrames.forEach(handleClearAllGuides)
        figma.notify('Guides cleared')
        break
      }

      case 'frameWidth': {
        const value =
          selectedFrames.length > 0 ? handleFrameSize(selectedFrames[0], 'width') : 0
        figma.ui.postMessage({ query: 'inputValue', width: value })
        break
      }

      case 'frameHeight': {
        const value =
          selectedFrames.length > 0 ? handleFrameSize(selectedFrames[0], 'height') : 0
        figma.ui.postMessage({ query: 'inputValue', height: value })
        break
      }

      case 'close': {
        figma.closePlugin()
        break
      }

      default: {
        console.warn('Unknown message type:', msg.type)
      }
    }
  } catch (error) {
    console.error('Error handling message:', error)
    figma.notify('An error occurred')
  }
}
