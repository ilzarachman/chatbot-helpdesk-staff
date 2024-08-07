import DocumentsTable from "@/components/documents/list-document/documents-table";
import NewDocument from "@/components/documents/new-document"

export default function Documents() {
    return (
        <>
            <h1 className="text-6xl font-bold mt-10 mb-5">Documents</h1>
            <NewDocument />

            <DocumentsTable />
        </>
    )
}