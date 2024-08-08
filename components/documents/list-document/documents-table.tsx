"use client"

import React from "react"
import { Document, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { fetchAPI } from "@/lib/utils"
import { DocumentsContext } from "@/lib/contexts/documents-context"



export default function DocumentsTable() {
    const {data, getData} = React.useContext(DocumentsContext)

    React.useEffect(() => {
        getData()
    }, [])

    return (
        <div className="my-4 max-w-[1280px]">
            <DataTable columns={columns} data={data} filterColumn="name" filterColumnPlaceholder="Filter name/title..."/>
        </div>
    )
}
