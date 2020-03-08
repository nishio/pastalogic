import { CursorDirection } from "../Types";
export const reverseCursorDirection = (v: CursorDirection): CursorDirection => {
  if (v === "forward") {
    return "backward";
  }
  return "forward";
};
