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


export default function NewDocument() {
    return (
        <Dialog>
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
                <NewDocumentForm />
            </DialogContent>
        </Dialog>
    )
}