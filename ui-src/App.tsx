import { useRef, useState } from "react";
import { usePluginMessage } from "./hooks/usePluginMessage";
import Alerts from "./_components/alerts/Alerts";
import Button from "./_components/buttons/Button";
import Footer from "./_components/footer/Footer";
import Title from "./_components/Titles/Title";
import TabBar from "./_components/tabs/TabBar";
import NumberInput from "./_components/inputs/NumberInput";
import Divider from "./_components/Divider";
import "./App.css";
import AddIcon from "./assets/icons/addIcon";
import IconClearGuides from "./assets/icons/IconClearGuides";
import IconGuides from "./assets/icons/IconGuides";
import IconHeight from "./assets/icons/IconHeight";
import IconWidth from "./assets/icons/IconWidth";

const TABS = [
  { id: 'guides', label: 'Guides' },
  { id: 'grid', label: 'Grid' },
]

function App () {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isNoFrameSelected, setIsNoFrameSelected] = useState(true)
  const [inputError, setInputError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'guides' | 'grid'>('guides')

  // Grid form state
  const [gridColumns, setGridColumns] = useState('12')
  const [gridRows, setGridRows] = useState('')
  const [gridGap, setGridGap] = useState('24')
  const [gridMarginX, setGridMarginX] = useState('0')
  const [gridMarginY, setGridMarginY] = useState('0')
  const [gridError, setGridError] = useState<string | null>(null)

  const {
    addGuide,
    addMargins: sendMargins,
    clearAllGuides: sendClearGuides,
    getFrameWidth,
    getFrameHeight,
    sendGrid,
  } = usePluginMessage({
    onSelectionChange: (status) => {
      setIsNoFrameSelected(status === 'none');
    },
    onDimensionReceived: (_dimension, value) => {
      if (inputRef.current) {
        inputRef.current.value = value.toString();
      }
    }
  });

  const addMargins = () => {
    const marginValue = inputRef.current?.value || '0'
    const marginNum = parseInt(marginValue, 10);

    if (isNaN(marginNum) || marginNum < 0) {
      setInputError('Please enter a valid positive number');
      return;
    }

    setInputError(null);
    sendMargins(marginNum);
  }

  const addGuideInX = () => {
    const value = inputRef.current?.value || '0'
    const offset = parseInt(value, 10);

    if (isNaN(offset) || offset < 0) {
      setInputError('Please enter a valid positive number');
      return;
    }

    setInputError(null);
    addGuide('X', offset);
  }

  const addGuideInY = () => {
    const value = inputRef.current?.value || '0'
    const offset = parseInt(value, 10);

    if (isNaN(offset) || offset < 0) {
      setInputError('Please enter a valid positive number');
      return;
    }

    setInputError(null);
    addGuide('Y', offset);
  }

  const clearAllGuides = () => {
    sendClearGuides();
  }

  const handleGetWidth = () => {
    getFrameWidth();
  }

  const handleGetHeight = () => {
    getFrameHeight();
  }

  const addValue = (signal: string, value: number) => {
    const inputValue = inputRef.current?.value || '0'
    const numValue = parseInt(inputValue, 10);

    if (isNaN(numValue)) {
      setInputError('Invalid input value');
      return;
    }

    let newValue;
    switch (signal) {
      case "-":
        newValue = numValue - value
        break
      case "+":
        newValue = numValue + value
        break
      case "*":
        newValue = Math.round(numValue * value)
        break
      case "/":
        if (value === 0) {
          setInputError('Cannot divide by zero');
          return;
        }
        newValue = Math.round(numValue / value)
        break
      default:
        return;
    }

    if (inputRef.current !== null) {
      const finalValue = newValue >= 0 ? newValue : 0;
      inputRef.current.value = finalValue.toString();
      setInputError(null);
    }
  }

  const handleCreateGrid = () => {
    const C = gridColumns ? parseInt(gridColumns, 10) : 0
    const R = gridRows ? parseInt(gridRows, 10) : 0
    const G = parseInt(gridGap || '0', 10)
    const MX = parseInt(gridMarginX || '0', 10)
    const MY = parseInt(gridMarginY || '0', 10)

    if (C === 0 && R === 0) { setGridError('Enter at least columns or rows'); return }
    if (gridColumns && (isNaN(C) || C < 1)) { setGridError('Columns must be >= 1'); return }
    if (gridRows && (isNaN(R) || R < 1)) { setGridError('Rows must be >= 1'); return }
    if (isNaN(G) || G < 0) { setGridError('Gap must be >= 0'); return }
    if (isNaN(MX) || MX < 0) { setGridError('Margin X must be >= 0'); return }
    if (isNaN(MY) || MY < 0) { setGridError('Margin Y must be >= 0'); return }

    setGridError(null)
    sendGrid({ columns: C, rows: R, gap: G, marginX: MX, marginY: MY })
  }

  return (
    <div className="wrapper">
      <div className="header">
        <TabBar tabs={TABS} activeTab={activeTab} onTabChange={(id) => setActiveTab(id as 'guides' | 'grid')} />
        <div style={{ visibility: isNoFrameSelected ? 'visible' : 'hidden' }}>
          <Alerts />
        </div>
        {activeTab === 'guides' && (
          <>
            {inputError && (
              <div className="errorMessage" role="alert">{inputError}</div>
            )}
            <input
              type="number"
              min={0}
              ref={inputRef}
              className="inputValue"
              placeholder="00"
              aria-label="Offset (px)"
            />
          </>
        )}
      </div>

      <div className="content flex flex-col gap-3">
        {activeTab === 'guides' && (
          <>
            <div className="flex gap-4">
              <Button label="Vertical Guide" leftIcon={<AddIcon />} onClick={addGuideInX} />
              <Button label="Horizontal Guide" leftIcon={<AddIcon />} onClick={addGuideInY} />
            </div>
            <div className="flex gap-4">
              <Button label="Add Margins" leftIcon={<IconGuides />} onClick={addMargins} />
              <Button label="Clear Guides" leftIcon={<IconClearGuides />} onClick={clearAllGuides} />
            </div>

            <Divider />
            <Title>Dimensions</Title>
            <div className="flex gap-4">
              <Button label="Width" leftIcon={<IconWidth />} onClick={handleGetWidth} />
              <Button label="Height" leftIcon={<IconHeight />} onClick={handleGetHeight} />
            </div>

            <Divider />
            <Title>Calculations 8px</Title>
            <div className="flex gap-4">
              <Button label="-4" ariaLabel="Subtract 4px" onClick={() => addValue('-', 4)} />
              <Button label="+4" ariaLabel="Add 4px" onClick={() => addValue('+', 4)} />
              <Button label="-8" ariaLabel="Subtract 8px" onClick={() => addValue('-', 8)} />
              <Button label="+8" ariaLabel="Add 8px" onClick={() => addValue('+', 8)} />
            </div>

            <Title>Golden Ratio</Title>
            <div className="flex gap-4">
              <Button label="×.38" ariaLabel="Multiply by 0.38" onClick={() => addValue('*', 0.38)} />
              <Button label="×.62" ariaLabel="Multiply by 0.62" onClick={() => addValue('*', 0.62)} />
            </div>
          </>
        )}

        {activeTab === 'grid' && (
          <>
            {gridError && (
              <div className="errorMessage" role="alert">{gridError}</div>
            )}
            <div className="grid-2col">
              <NumberInput id="grid-columns" label="Columns" value={gridColumns} min={1} placeholder="12" onChange={setGridColumns} />
              <NumberInput id="grid-rows" label="Rows" value={gridRows} min={1} placeholder="8" onChange={setGridRows} />
            </div>
            <NumberInput id="grid-gap" label="Gap (px)" value={gridGap} min={0} placeholder="16" onChange={setGridGap} />
            <div className="grid-2col">
              <NumberInput id="grid-margin-x" label="Margin X (px)" value={gridMarginX} min={0} placeholder="80" onChange={setGridMarginX} />
              <NumberInput id="grid-margin-y" label="Margin Y (px)" value={gridMarginY} min={0} placeholder="40" onChange={setGridMarginY} />
            </div>
            <Button label="Create Grid" onClick={handleCreateGrid} />
            <Button label="Clear Guides" leftIcon={<IconClearGuides />} onClick={clearAllGuides} />
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
