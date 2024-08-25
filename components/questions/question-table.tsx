"use client"

import React from "react"
import { columns, columnsAnswered } from "@/components/questions/columns"
import { DataTable } from "@/components/ui/data-table"
import { fetchAPI } from "@/lib/utils"
import { DocumentsContext } from "@/lib/contexts/documents-context"
import { Question, QuestionsContext } from "@/lib/contexts/questions-context"



export default function QuestionTable() {
    const { data, getData } = React.useContext(QuestionsContext)
    const [questions, setQuestions] = React.useState<Question[]>([])

    React.useEffect(() => {
        getData()
    }, [])

    function filterUnanswered(data: Question[]) {
        return data.filter((question) => !question.staff_answer)
    }

    function filterAnswered(data: Question[]) {
        return data.filter((question) => question.staff_answer)
    }

    return (
        <div className="my-4 max-w-[1280px]">
            <h2 className="text-3xl">Unanswered</h2>
            <DataTable columns={columns} data={filterUnanswered(data)} filterColumn="prompt" filterColumnPlaceholder="Filter name/title..." />

            <h2 className="text-3xl">Answered</h2>
            <DataTable columns={columnsAnswered} data={filterAnswered(data)} filterColumn="prompt" filterColumnPlaceholder="Filter name/title..." />
        </div>
    )
}
