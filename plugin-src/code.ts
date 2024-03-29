const windowWidth = 400
const windowHeight = 642

figma.showUI(__html__, { themeColors: true, width: windowWidth, height: windowHeight })

function addGuides (sel: any, guide: any) {
  const selection = sel
  selection.guides = selection.guides.concat(guide)
}

figma.on('selectionchange', () => {
  const selected = figma.currentPage.selection

  if (selected != undefined && selected.length > 0) {
    figma.ui.postMessage({ type: 'selectionchange', status: 'selected' })
    console.log(selected)
  } else {
    figma.ui.postMessage({ type: 'selectionchange', status: 'none' })
  }
})

figma.ui.onmessage = msg => {
  let value = 0

  switch (msg.type) {
    case 'add-guide':
      figma.currentPage.selection.forEach((sel) => {
        console.log(sel)
        const selection = sel as FrameNode
        const guideData = msg.data
        console.log(msg.data)

        if (selection.type === 'FRAME') {
          addGuides(selection, guideData)
        } else {
          figma.notify('Please select a Frame')
        }
      })
      break
    case 'add-margins':
      if (figma.currentPage.selection.length == 0) {
        figma.notify("Please select a frame")
      }
      figma.currentPage.selection.forEach((sel) => {
        const selection = sel
        const marginSize = parseInt(msg.data.marginSize)
        const height = selection.height
        const width = selection.width
        const margins = [{
          top: marginSize,
          bottom: height - marginSize,
          left: marginSize,
          right: width - marginSize
        }]
        console.log(margins)
        if (selection.type === 'FRAME') {
          for (const margin of margins) {
            addGuides(selection, { axis: 'Y', offset: margin.top })
            addGuides(selection, { axis: 'Y', offset: margin.bottom })
            addGuides(selection, { axis: 'X', offset: margin.left })
            addGuides(selection, { axis: 'X', offset: margin.right })
          }
        } else {
          figma.notify('Please select a Frame')
        }
      })
      break
    case 'clearAllGuides':
      console.log('clear all guides')
      if (figma.currentPage.selection.length > 0) {
        figma.currentPage.selection.forEach((sel) => {
          const selection = sel as FrameNode
          selection.guides = []
        })
      } else {
        figma.notify('Please select a Frame')
      }
      break
    case 'frameWidth':
      console.log('server frame width')
      if (figma.currentPage.selection.length > 0) {
        figma.currentPage.selection.forEach((sel) => {
          const selection = sel as FrameNode
          value = selection.width
        })
      } else {
        figma.notify('Please select a Frame')
      }
      figma.ui.postMessage({ query: 'inputValue', width: value })
      break
    case 'frameHeight':
      console.log('server frame width')
      if (figma.currentPage.selection.length > 0) {
        figma.currentPage.selection.forEach((sel) => {
          const selection = sel as FrameNode
          value = selection.height
        })
      } else {
        figma.notify('Please select a Frame')
      }
      figma.ui.postMessage({ query: 'inputValue', height: value })
      break
    case 'close':
      figma.closePlugin()
      break
  }
}
