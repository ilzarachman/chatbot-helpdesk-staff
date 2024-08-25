import { createContext } from "react";

export type Question = {
    id: number
    prompt: string
    staff_answer: string
    bot_answer: string
    intent: string
    public: boolean
    message: string
    questioner_email: string
    questioner_name: string
    created_at: string
}

export const QuestionsContext = createContext({data: [] as Question[], setData: (data: Question[]) => {}, getData: () => {}})