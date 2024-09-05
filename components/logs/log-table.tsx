"use client"

import React from "react"
import { columns } from "@/components/logs/columns"
import { DataTable } from "@/components/ui/data-table"
import { fetchAPI } from "@/lib/utils"
import { DocumentsContext } from "@/lib/contexts/documents-context"
import { Question, QuestionsContext } from "@/lib/contexts/questions-context"
import { LogsContext } from "@/lib/contexts/logs-context"



export default function LogTable() {
    const { data: logs } = React.useContext(LogsContext)

    return (
        <div className="my-4 max-w-[1280px]">
            <DataTable columns={columns} data={logs} filterColumn="ts" filterColumnPlaceholder="Filter name/title..." />
        </div>
    )
}
