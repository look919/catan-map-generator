import { HexType } from "./gameUtils";
export const mapSizes = [
  {
    kind: "small",
    size: [4, 5, 6, 7, 6, 5, 4],
  },
  {
    kind: "medium",
    size: [5, 6, 7, 8, 7, 6, 5],
  },
  {
    kind: "large",
    size: [6, 7, 8, 9, 8, 7, 6],
  },
] as const;
export type MapSize = (typeof mapSizes)[number]["kind"];

export type TokenValue = 2 | 3 | 4 | 5 | 6 | 8 | 9 | 10 | 11 | 12;

const hexTypes = [
  "wood",
  "ore",
  "wheat",
  "sheep",
  "grass",
  "water",
  "desert",
  "gold",
] as const;

export type Hex = {
  hexType: HexType;
  tokenValue?: TokenValue;
};
export type HexType = (typeof hexTypes)[number];

export type HexWithTokenType = Exclude<HexType, "water" | "desert">;

const hexTypesPerSize: Record<MapSize, Record<HexType, number>> = {
  small: {
    wood: 4,
    ore: 3,
    wheat: 4,
    sheep: 4,
    grass: 4,
    water: 4,
    desert: 1,
    gold: 0,
  },
  medium: {
    wood: 5,
    ore: 5,
    wheat: 5,
    sheep: 5,
    grass: 5,
    water: 17,
    desert: 1,
    gold: 1,
  },
  large: {
    wood: 6,
    ore: 5,
    wheat: 6,
    sheep: 6,
    grass: 6,
    water: 6,
    desert: 1,
    gold: 2,
  },
};

const tokenAmountsPerSize: Record<MapSize, Record<TokenValue, number>> = {
  small: {
    "2": 2,
    "3": 3,
    "4": 3,
    "5": 3,
    "6": 3,
    "8": 3,
    "9": 3,
    "10": 3,
    "11": 3,
    "12": 2,
  },
  medium: {
    "2": 2,
    "3": 3,
    "4": 3,
    "5": 3,
    "6": 3,
    "8": 3,
    "9": 3,
    "10": 3,
    "11": 3,
    "12": 2,
  },
  large: {
    "2": 2,
    "3": 3,
    "4": 3,
    "5": 3,
    "6": 3,
    "8": 3,
    "9": 3,
    "10": 3,
    "11": 3,
    "12": 2,
  },
};

export const isHexWithToken = (hexType: HexType) => {
  return hexType !== "water" && hexType !== "desert";
};

export const randomizeHexes = (size: MapSize) => {
  const hexes: Hex[][] = [];

  const hexTypesToUse = hexTypesPerSize[size];
  const arrayOfHexTypesToUse = Object.keys(hexTypesToUse).reduce(
    (acc, hexType) => {
      const amount = hexTypesToUse[hexType as HexType];
      return acc.concat(Array(amount).fill(hexType));
    },
    [] as HexType[]
  );

  mapSizes
    .find((mapSize) => mapSize.kind === size)
    ?.size.forEach((rowSize) => {
      const row: Hex[] = [];

      for (let i = 0; i < rowSize; i++) {
        const randomHex =
          arrayOfHexTypesToUse[
            Math.floor(Math.random() * arrayOfHexTypesToUse.length)
          ];

        if (isHexWithToken(randomHex)) {
          const tokenValues = Object.keys(tokenAmountsPerSize[size]).reduce(
            (acc, tokenValue) => {
              const amount =
                tokenAmountsPerSize[size][tokenValue as TokenValue];
              return acc.concat(Array(amount).fill(tokenValue));
            },
            [] as TokenValue[]
          );

          const randomTokenValue =
            tokenValues[Math.floor(Math.random() * tokenValues.length)];

          row.push({
            hexType: randomHex,
            tokenValue: randomTokenValue,
          });
          tokenValues.splice(tokenValues.indexOf(randomTokenValue), 1);
        } else {
          row.push({
            hexType: randomHex,
          });
        }

        arrayOfHexTypesToUse.splice(arrayOfHexTypesToUse.indexOf(randomHex), 1);
      }

      hexes.push(row);
    });

  return hexes;
};
