import React, { useState } from "react";
import Canvas from "../components/Canvas/Index";
import Input from "../components/Input/Index";
import "./App.css";

function App() {
  const [velocity, setVelocity] = useState(0);
  const [step, setStep] = useState(0.01);

  const onChangeHandlerInput = value => {
    if (isNaN(parseFloat(value))) {
      setVelocity(0);
      return;
    }
    const number = parseFloat(value);

    setVelocity(number);
  };

  const onChangeHandlerSlider = value => {
    const number = parseFloat(value);
    // exponential scale, providing more detail towards the negative velocity range
    const values = [-1, -2, -4, -8, -16, -32, -64, -100];
    if (number < 0) {
      setStep(10);

      const positiveNumber = Math.abs(number);
      let index = 0;
      if (positiveNumber > 10) {
        index = parseInt(positiveNumber / 10);
      }
      if (positiveNumber > 70) {
        index = 7;
      }

      setVelocity(values[index]);
      return;
    }
    
    setStep(0.01);
    setVelocity(number);
  };

  return (
    <div className="app-wrapper">
      <div className="flex">
        <Canvas velocity={velocity} />
      </div>
      <div className="input-wrapper">
        <Input
          type="number"
          value={velocity}
          min={-100}
          max={100}
          step={0.01}
          onChangeHandler={value => onChangeHandlerInput(value)}
        />
        <Input
          type="range"
          value={velocity}
          min={-100}
          max={100}
          step={step}
          onChangeHandler={value => onChangeHandlerSlider(value)}
        />
      </div>
    </div>
  );
}

export default App;
