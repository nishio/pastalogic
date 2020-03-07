import { setGlobal, getGlobal } from "reactn";

const INITIAL_GLOBAL_STATE = {
  log: [] as any[]
};

export const initializeGlobalState = () => {
  setGlobal(INITIAL_GLOBAL_STATE);
};

type TYPE_GLOBAL_STATE = typeof INITIAL_GLOBAL_STATE;

declare module "reactn/default" {
  export interface State extends TYPE_GLOBAL_STATE {}
}

export const pushLog = (x: any) => {
  setGlobal(g => ({
    log: [...g.log, x]
  }));
};

export const popLog = () => {
  const log = getGlobal().log;
  log.pop();
  setGlobal({
    log: [...log]
  });
};
