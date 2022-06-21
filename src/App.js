import { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ThreeCanvas from "./ThreeCanvas";
import "./App.css";

function App() {
  const _initData = require(`./cooling_system_result/cooling_system_temperature_time_step_1.json`);
  const [dataJson, setDataJson] = useState(_initData);
  const [layer, setLayer] = useState(0);
  const [filterData, setFilterData] = useState(
    dataJson.filter((d) => d.position[1] === layer)
  );
  const [temperature, setTemperature] = useState({ min: 0, max: 100 });
  const [showDevices, setShowDevices] = useState(true);

  const generateTemperature = (dataJson) => {
    let min = 1000;
    let max = 0;
    dataJson.forEach((point) => {
      if (point.temperature < min) {
        min = point.temperature;
      }
      if (point.temperature > max) {
        max = point.temperature;
      }
    });
    setTemperature({ min, max });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const index = Math.floor(Math.random() * 10) + 1;
      const _data = require(`./cooling_system_result/cooling_system_temperature_time_step_${index}.json`);
      generateTemperature(_data);
      setDataJson(_data);
      console.log("file index: ", index);
    }, "2000");

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleSilderChange = (e) => {
    const _value = e.target.value;
    setLayer(_value);
    setFilterData(dataJson.filter((d) => d.position[1] === parseInt(_value)));
  };

  return (
    <div className="App">
      <ThreeCanvas
        showDevices={showDevices}
        temperature={temperature}
        filterData={filterData}
      />
      <div className="silderWrapper">
        <FormControlLabel
          control={
            <Checkbox
              checked={showDevices}
              onChange={() => setShowDevices(!showDevices)}
            />
          }
          label="Show Devices"
        />
        <Slider
          size="small"
          min={0}
          max={20}
          defaultValue={0}
          value={layer}
          onChange={handleSilderChange}
          aria-label="Small"
          valueLabelDisplay="auto"
        />
      </div>
    </div>
  );
}

export default App;
