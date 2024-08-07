"use client"

import React from "react"
import { Document, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { fetchAPI } from "@/lib/utils"



export default function DocumentsTable() {
    const [data, setData] = React.useState<Document[]>([])

    function getData() {
        fetchAPI("/document", {
            method: "GET",
            credentials: "include",
        }).then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    setData(data.data)
                    console.log(data.data)
                })
            }
        })
    }

    React.useEffect(() => {
        getData()
    }, [])

    return (
        <div className="my-4 max-w-[1280px]">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
