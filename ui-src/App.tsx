import { useRef, useState } from "react";
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

  onmessage = (event) => {
    if (event.data.pluginMessage.status == 'selected') {
      setIsFrameSelected(false)
    } else {
      setIsFrameSelected(true)
    }
  }

  const addMargins = () => {
    const marginValue = inputRef.current?.value || 0
    console.log('Add Margins', marginValue)
    parent.postMessage({
      pluginMessage: {
        type: 'add-margins',
        data: { marginSize: marginValue }
      }
    }, "*")
  }

  const addGuideInX = () => {
    console.log("Add Guide in X-Axis")
    const value = inputRef.current?.value || '0'

    parent.postMessage({
      pluginMessage: {
        type: 'add-guide',
        data: {
          axis: 'X', offset: parseInt(value)
        }
      }
    }, "*")
  }

  const addGuideInY = () => {
    console.log("Add Guide in Y-Axis")
    const value = inputRef.current?.value || '0'

    parent.postMessage({
      pluginMessage: {
        type: 'add-guide',
        data: {
          axis: 'Y', offset: parseInt(value)
        }
      }
    }, "*")
  }

  const clearAllGuides = () => {
    console.info('Removing Guides')
    parent.postMessage({ pluginMessage: { type: 'clearAllGuides' } }, "*")
  }

  const getWidth = () => {
    console.log('Get Width')
    parent.postMessage({ pluginMessage: { type: 'frameWidth' } }, "*")
    onmessage = (event) => {
      if (inputRef.current !== null) {
        inputRef.current.value = event.data.pluginMessage.width
      }
    }
  }

  const getHeight = () => {
    console.log('Get Height')
    parent.postMessage({ pluginMessage: { type: 'frameHeight' } }, "*")
    onmessage = (event) => {
      if (inputRef.current !== null) {
        inputRef.current.value = event.data.pluginMessage.height
      }
    }
  }

  const addValue = (signal: string, value: number) => {
    const inputValue = inputRef.current?.value || '0'

    let newValue
    switch (signal) {
      case "-":
        newValue = parseInt(inputValue) - value
        if (inputRef.current == null) return
        newValue >= 0 ? inputRef.current.value = newValue.toString() : inputRef.current.value = '0'
        break
      case "+":
        newValue = parseInt(inputValue) + value
        if (inputRef.current == null) return
        newValue >= 0 ? inputRef.current.value = newValue.toString() : inputRef.current.value = '0'
        break
      case "*":
        newValue = Math.round(parseInt(inputValue) * value)
        if (inputRef.current == null) return
        newValue >= 0 ? inputRef.current.value = newValue.toString() : inputRef.current.value = '0'
        break
      case "/":
        newValue = Math.round(parseInt(inputValue) + value)
        if (inputRef.current == null) return
        newValue >= 0 ? inputRef.current.value = newValue.toString() : inputRef.current.value = '0'
        break

    }
  }



  return (
    <div className="wrapper">
      <div className="dataInsert">
        {isFrameSelected ? <Alerts /> : null}
        <input
          type="number"
          min={0}
          ref={inputRef}
          className="inputValue border-bottom text-center col-4 mb-16"
          placeholder="00" />
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
          <Button label="Get Width" leftIcon={<IconWidth />} onClick={getWidth} />
          <Button label="Get Height" leftIcon={<IconHeight />} onClick={getHeight} />
        </div>

        <Title>Calculations 8px grid</Title>
        <div className="flex gap-4">
          <Button label="-4" onClick={() => { addValue('-', 4) }} />
          <Button label="+4" onClick={() => { addValue('+', 4) }} />
          <Button label="-8" onClick={() => { addValue('-', 8) }} />
          <Button label="+8" onClick={() => { addValue('+', 8) }} />
        </div>
        <Title>Calculations Golden Ratio</Title>
        <div className="flex gap-4">
          <Button label="*.38" onClick={() => { addValue('*', 0.38) }} />
          <Button label="*.62" onClick={() => { addValue('*', 0.62) }} />
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default App;