import { createContext } from "react";

export type Document = {
    uuid: string
    name: string
    staff_email: string
    intent: string
    public: boolean
    embedded: boolean
    created_at: string
}

export const DocumentsContext = createContext({data: [] as Document[], setData: (data: Document[]) => {}, getData: () => {}})