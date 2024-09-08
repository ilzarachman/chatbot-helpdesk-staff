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
import React from "react"
import NewStudentForm from "./new-student-form"


export default function NewStudent() {
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <Button>New Student <Plus className="ml-2 h-4 w-4" /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a new student</DialogTitle>
                    <DialogDescription>
                        New student will be then processed to be stored inside embeddings database.
                    </DialogDescription>
                </DialogHeader>
                <NewStudentForm setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    )
}