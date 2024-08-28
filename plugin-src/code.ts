const windowWidth = 360
const windowHeight = 642

figma.showUI(__html__, {
  themeColors: true,
  width: windowWidth,
  height: windowHeight,
})

export function addGuides (selection: FrameNode, guide: any) {
  selection.guides = selection.guides.concat(guide)
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
  const { height, width } = selection
  const margins = [
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
  return selection[dimension]
}

figma.on('selectionchange', handleSelectionChange)

figma.ui.onmessage = (msg) => {
  const selectedFrames = figma.currentPage.selection.filter(
    (sel) => sel.type === 'FRAME'
  ) as FrameNode[]

  if (selectedFrames.length <= 0) {
    figma.notify('Please, select a frame')
  }

  switch (msg.type) {
    case 'add-guide':
      selectedFrames.forEach((selection) => handleAddGuide(selection, msg.data))
      break
    case 'add-margins':
      const marginSize = parseInt(msg.data.marginSize, 10)
      if (isNaN(marginSize)) {
        figma.notify('Invalid margin size')
        return
      }
      selectedFrames.forEach((selection) =>
        handleAddMargins(selection, marginSize)
      )
      break
    case 'clearAllGuides':
      selectedFrames.forEach(handleClearAllGuides)
      break
    case 'frameWidth':
    case 'frameHeight':
      console.log(msg.type)
      const dimension = msg.type === 'frameWidth' ? 'width' : 'height'
      const value =
        selectedFrames.length > 0
          ? handleFrameSize(selectedFrames[0], dimension)
          : 0
      figma.ui.postMessage({ query: 'inputValue', [dimension]: value })
      break
    case 'close':
      figma.closePlugin()
      break
    default:
      figma.notify('Please, select a frame')
  }
}
