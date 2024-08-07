"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Document = {
    uuid: string
    name: string
    intent: string
    public: boolean
    embedded: boolean
    created_at: string
}

export const columns: ColumnDef<Document>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "intent",
        header: "Intent",
    },
    {
        accessorKey: "public",
        header: "Public",
    },
    {
        accessorKey: "embedded",
        header: "Embedded",
        cell: (info) => {
            return info.getValue() ? 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
        },
    },
    {
        accessorKey: "created_at",
        header: "Created At",
    },
]
