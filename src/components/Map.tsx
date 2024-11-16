import { Hex } from "../gameUtils";
import { renderHex } from "./Hex";

interface MapProps {
  hexes: Hex[][];
}

export const Map = ({ hexes }: MapProps) => {
  console.log("hexes", hexes);

  return (
    <div className="board">
      {hexes.map((row, rowIndex) => {
        return (
          <div className="hex-row" key={rowIndex}>
            {row.map((hex) => renderHex(hex))}
          </div>
        );
      })}
    </div>
  );
};
