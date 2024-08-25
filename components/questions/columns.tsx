"use client"

import { ColumnDef } from "@tanstack/react-table"
import { LoaderCircle } from 'lucide-react';
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react"
import { Question } from "@/lib/contexts/questions-context"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import AnswerQuestionForm from "./answer-question-form";
import React from "react";


export const columns: ColumnDef<Question>[] = [

    {
        accessorKey: "prompt",
        header: ({ column }) => {
            return (
                <div className="flex items-center justify-center">
                    Prompt
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="ml-2 p-1"
                    >
                        <ArrowUpDown className="h-3 w-3" />
                    </Button>
                </div>
            )
        },
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "bot_answer",
        header: ({ column }) => {
            return (
                <div className="flex items-center justify-center">
                    Bot Answer
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="ml-2 p-1"
                    >
                        <ArrowUpDown className="h-3 w-3" />
                    </Button>
                </div>
            )
        },
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "message",
        header: ({ column }) => {
            return (
                <div className="flex items-center justify-center">
                    Feedback
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="ml-2 p-1"
                    >
                        <ArrowUpDown className="h-3 w-3" />
                    </Button>
                </div>
            )
        },
        cell: (info) => info.getValue(),
    },

    {
        accessorKey: "questioner_email",
        header: ({ column }) => {
            return (
                <div className="flex items-center">
                    Questioner
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="ml-2 p-1"
                    >
                        <ArrowUpDown className="h-3 w-3" />
                    </Button>
                </div>
            )
        },
        cell: (info) => info.getValue(),
    },

    // {
    //     id: "answered",
    //     header: ({ column }) => {
    //         return (
    //             <div className="flex items-center justify-center">
    //                 Answered
    //                 <Button
    //                     variant="ghost"
    //                     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //                     className="ml-2 p-1"
    //                 >
    //                     <ArrowUpDown className="h-3 w-3" />
    //                 </Button>
    //             </div>
    //         )
    //     },
    //     cell: ({ row }) => {
    //         const question = row.original

    //         return (
    //             <div className="flex items-center justify-center">
    //                 {question.staff_answer ? <span className="text-green-500">Yes</span> : <span className="text-red-500">No</span>}
    //             </div>
    //         )
    //     },
    // },

    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <>
                    Date
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="ml-2 p-1"
                    >
                        <ArrowUpDown className="h-3 w-3" />
                    </Button>
                </>
            )
        },
        cell: (info) => {
            const date = new Date(info.getValue() as string)

            return date.toLocaleString("in-ID", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "numeric" })
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const [open, setOpen] = React.useState(false)
            const question = row.original

            if (question.staff_answer) return null

            return (
                // Add dialog and button for answer question here
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default">
                            Answer
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Answer Question</DialogTitle>
                            <DialogDescription>
                                Prompt: {question.prompt}
                            </DialogDescription>
                        </DialogHeader>
                        <AnswerQuestionForm setOpen={setOpen} question_id={question.id} />
                    </DialogContent>
                </Dialog>
            )
        },
    }
]


export const columnsAnswered: ColumnDef<Question>[] = [

    {
        accessorKey: "prompt",
        header: ({ column }) => {
            return (
                <div className="flex items-center justify-center">
                    Prompt
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="ml-2 p-1"
                    >
                        <ArrowUpDown className="h-3 w-3" />
                    </Button>
                </div>
            )
        },
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "bot_answer",
        header: ({ column }) => {
            return (
                <div className="flex items-center justify-center">
                    Bot Answer
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="ml-2 p-1"
                    >
                        <ArrowUpDown className="h-3 w-3" />
                    </Button>
                </div>
            )
        },
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "message",
        header: ({ column }) => {
            return (
                <div className="flex items-center justify-center">
                    Feedback
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="ml-2 p-1"
                    >
                        <ArrowUpDown className="h-3 w-3" />
                    </Button>
                </div>
            )
        },
        cell: (info) => info.getValue(),
    },

    {
        accessorKey: "questioner_email",
        header: ({ column }) => {
            return (
                <div className="flex items-center">
                    Questioner
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="ml-2 p-1"
                    >
                        <ArrowUpDown className="h-3 w-3" />
                    </Button>
                </div>
            )
        },
        cell: (info) => info.getValue(),
    },

    {
        accessorKey: "staff_answer",
        header: ({ column }) => {
            return (
                <div className="flex items-center justify-center">
                    Staff Answer
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="ml-2 p-1"
                    >
                        <ArrowUpDown className="h-3 w-3" />
                    </Button>
                </div>
            )
        },
        cell: (info) => info.getValue(),
    },

    {
        accessorKey: "intent",
        header: ({ column }) => {
            return (
                <div className="flex items-center">
                    Intent
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="ml-2 p-1"
                    >
                        <ArrowUpDown className="h-3 w-3" />
                    </Button>
                </div>
            )
        },
        cell: (info) => info.getValue(),
    },

    {
        accessorKey: "public",
        header: ({ column }) => {
            return (
                <div className="flex items-center justify-center">
                    Public
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="ml-2 p-1"
                    >
                        <ArrowUpDown className="h-3 w-3" />
                    </Button>
                </div>
            )
        },
        cell: (info) => {
            return info.getValue() ?
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500 mx-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500 mx-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
        }
    },

    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <>
                    Date
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="ml-2 p-1"
                    >
                        <ArrowUpDown className="h-3 w-3" />
                    </Button>
                </>
            )
        },
        cell: (info) => {
            const date = new Date(info.getValue() as string)

            return date.toLocaleString("in-ID", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "numeric" })
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const [open, setOpen] = React.useState(false)
            const question = row.original

            if (question.staff_answer) return null

            return (
                // Add dialog and button for answer question here
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default">
                            Answer
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Answer Question</DialogTitle>
                            <DialogDescription>
                                Prompt: {question.prompt}
                            </DialogDescription>
                        </DialogHeader>
                        <AnswerQuestionForm setOpen={setOpen} question_id={question.id} />
                    </DialogContent>
                </Dialog>
            )
        },
    }
]