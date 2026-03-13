import { useRef, useState } from "react";
import { usePluginMessage } from "./hooks/usePluginMessage";
import Alerts from "./_components/alerts/Alerts";
import Button from "./_components/buttons/Button";
import Footer from "./_components/footer/Footer";
import Title from "./_components/Titles/Title";
import "./App.css";
import AddIcon from "./assets/icons/addIcon";
import IconClearGuides from "./assets/icons/IconClearGuides";
import IconGuides from "./assets/icons/IconGuides";
import IconHeight from "./assets/icons/IconHeight";
import IconWidth from "./assets/icons/IconWidth";


function App () {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFrameSelected, setIsFrameSelected] = useState(true)
  const [inputError, setInputError] = useState<string | null>(null);

  const {
    addGuide,
    addMargins: sendMargins,
    clearAllGuides: sendClearGuides,
    getFrameWidth,
    getFrameHeight,
  } = usePluginMessage({
    onSelectionChange: (status) => {
      setIsFrameSelected(status === 'none');
    },
    onDimensionReceived: (dimension, value) => {
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
    console.log('Add Margins', marginValue)
    sendMargins(marginNum);
  }

  const addGuideInX = () => {
    console.log("Add Guide in X-Axis")
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
    console.log("Add Guide in Y-Axis")
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
    console.info('Removing Guides')
    sendClearGuides();
  }

  const handleGetWidth = () => {
    console.log('Get Width')
    getFrameWidth();
  }

  const handleGetHeight = () => {
    console.log('Get Height')
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



  return (
    <div className="wrapper">
      <div className="dataInsert">
        {isFrameSelected ? <Alerts /> : null}
        {inputError && (
          <div className="errorMessage" role="alert">
            {inputError}
          </div>
        )}
        <input
          type="number"
          min={0}
          ref={inputRef}
          className="inputValue border-bottom text-center col-4 mb-16"
          placeholder="00"
          aria-label="Value input"
          aria-describedby={inputError ? "input-error" : undefined} />
      </div>
      <div className="flex flex-col gap-4">

        <div className="flex gap-4">
          <Button label="Clear Guides" leftIcon={<IconClearGuides />} onClick={clearAllGuides} />
          <Button label="Add Margins" leftIcon={<IconGuides />} onClick={addMargins} />
        </div>

        <div className="flex gap-4">
          <Button label="Horizontal Guide" leftIcon={<AddIcon />} onClick={addGuideInY} />
          <Button label="Vertical Guide" leftIcon={<AddIcon />} onClick={addGuideInX} />
        </div>

        <Title>Dimensions</Title>
        <div className="flex gap-4">
          <Button label="Get Width" leftIcon={<IconWidth />} onClick={handleGetWidth} />
          <Button label="Get Height" leftIcon={<IconHeight />} onClick={handleGetHeight} />
        </div>

        <Title>Calculations 8px grid</Title>
        <div className="flex gap-4">
          <Button label="-4" ariaLabel="Subtract 4 pixels" onClick={() => { addValue('-', 4) }} />
          <Button label="+4" ariaLabel="Add 4 pixels" onClick={() => { addValue('+', 4) }} />
          <Button label="-8" ariaLabel="Subtract 8 pixels" onClick={() => { addValue('-', 8) }} />
          <Button label="+8" ariaLabel="Add 8 pixels" onClick={() => { addValue('+', 8) }} />
        </div>
        <Title>Calculations Golden Ratio</Title>
        <div className="flex gap-4">
          <Button label="*.38" ariaLabel="Multiply by 0.38" onClick={() => { addValue('*', 0.38) }} />
          <Button label="*.62" ariaLabel="Multiply by 0.62" onClick={() => { addValue('*', 0.62) }} />
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default App;