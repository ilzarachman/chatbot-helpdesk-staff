"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import NewDocumentForm from "./new-doc-form"
import React from "react"


export default function NewDocument() {
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>New Document <Plus className="ml-2 h-4 w-4" /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a new document</DialogTitle>
                    <DialogDescription>
                        New document will be then processed to be stored inside embeddings database.
                    </DialogDescription>
                </DialogHeader>
                <NewDocumentForm setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    )
}