import { useState } from "react";
import "./App.css";
import { Map } from "./components/Map";
import { Hex, MapSize, randomizeHexes } from "./gameUtils";

function App() {
  const [mapSize, setMapSize] = useState<MapSize>("medium");
  const [hexes, setHexes] = useState<Hex[][]>([[]]);
  const [isMapGenerated, setIsMapGenerated] = useState(false);

  const handleGenerateMap = () => {
    setHexes(randomizeHexes(mapSize));
    setIsMapGenerated(true);
  };

  return (
    <div className="root">
      <select
        value={mapSize}
        onChange={(e) => setMapSize(e.target.value as MapSize)}
        name="map-size"
      >
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
      <button onClick={handleGenerateMap}>Generate map</button>
      {isMapGenerated && <Map hexes={hexes} />}
    </div>
  );
}

export default App;
