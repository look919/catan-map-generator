import { Hex, HexType, HexWithTokenType, TokenValue } from "../gameUtils";

interface HexProps {
  type: HexWithTokenType;
  tokenValue: TokenValue;
}

const HexWithToken = ({ type, tokenValue }: HexProps) => {
  return <div className={`hex ${type}`}>{tokenValue}</div>;
};

const HexWithoutToken = ({ type }: { type: "water" | "desert" }) => {
  if (type === "water") {
    return <div className="hex water" />;
  }

  return <div className="hex desert" />;
};

export const renderHex = ({ hexType, tokenValue }: Hex) => {
  if (hexType === "desert" || hexType === "water") {
    return <HexWithoutToken type={hexType} />;
  }

  return <HexWithToken type={hexType} tokenValue={tokenValue} />;
};
