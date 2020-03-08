import { PlayerID } from "../Types";
export const removeAFlagFromFlags = (
  flags: PlayerID[],
  index: number
): PlayerID[] => {
  const newFlags = [...flags];
  newFlags.splice(index, 1);
  return newFlags;
};
