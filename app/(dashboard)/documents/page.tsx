"use client"

import DocumentsTable from "@/components/documents/list-document/documents-table";
import NewDocument from "@/components/documents/new-document"
import React from "react";
import { DocumentsContext, Document } from "@/lib/contexts/documents-context";
import { fetchAPI } from "@/lib/utils";

export default function Documents() {
    const [documents, setDocuments] = React.useState<Document[]>([])

    function getData() {
        fetchAPI("/document", {
            method: "GET",
            credentials: "include",
        }).then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    setDocuments(data.data)
                })
            }
        })
    }

    return (
        <DocumentsContext.Provider value={{ data: documents, setData: setDocuments, getData }}>
            <h1 className="text-6xl font-bold mt-10 mb-5">Documents</h1>
            <NewDocument />
            <DocumentsTable />
        </DocumentsContext.Provider>
    )
}