import { createContext } from "react";

export type Student = {
  id: number;
  student_number: string;
  name: string;
  access_level: number;
  email: string;
  created_at: string;
};

export const StudentsContext = createContext({
  data: [] as Student[],
  setData: (data: Student[]) => {},
  getData: () => {},
});
