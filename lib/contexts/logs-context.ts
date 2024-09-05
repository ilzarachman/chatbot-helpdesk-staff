import { createContext } from "react";

export type Log = {
  ts: string;
  lvl: string;
  file: string;
  line: number;
  msg: string;
  func: string;
};

export const LogsContext = createContext({ data: [] as Log[] });
