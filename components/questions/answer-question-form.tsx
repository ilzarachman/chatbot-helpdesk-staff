"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { DialogFooter } from "@/components/ui/dialog"
import { Check, CheckIcon, ChevronsUpDown, LoaderCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Checkbox } from "../ui/checkbox"
import Link from "next/link"
import { fetchAPI } from "@/lib/utils"
import React from "react"
import { useToast } from "@/components/ui/use-toast"
import { DocumentsContext } from "@/lib/contexts/documents-context"
import { Textarea } from "@/components/ui/textarea"
import { QuestionsContext } from "@/lib/contexts/questions-context"


const formSchema = z.object({
    answer: z.string({
        required_error: "Answer is required",
    }),
    intent: z.string({
        required_error: "Intent is required",
    }),
    public: z.boolean().default(false),
})

const intents = [
    { label: "Academic and Administration Information", value: "academic_administration_info" },
    { label: "Resource and Service Information", value: "resource_service_info" },
    { label: "Need Assistant Support", value: "need_assistant_support" },
    { label: "Other", value: "other" }
] as const

export default function AnswerQuestionForm({ setOpen, question_id }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>; question_id: number }) {

    const { getData } = React.useContext(QuestionsContext)

    const [loadingUpload, setLoadingUpload] = React.useState(false)
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function formSubmitRequest(values: z.infer<typeof formSchema>) {
        setLoadingUpload(true)

        // const formData = new FormData()
        // formData.append("name", values.answer)
        // formData.append("intent", values.intent)
        // formData.append("public", String(values.public))

        const data = {
            answer: values.answer,
            intent: values.intent,
            public: values.public
        }

        fetchAPI(`/question/answer/${question_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        }).then((res) => {
            if (res.ok) {
                toast({
                    title: "Document uploaded successfully!",
                    description: "Document will be processed to be stored inside embeddings database.",
                    variant: "default",
                })
                setLoadingUpload(false)
                setOpen(false)
                getData()
            }
        }).catch((err) => {
            console.log(err)
            setLoadingUpload(false)
        })
    }


    function onSubmit(values: z.infer<typeof formSchema>) {
        formSubmitRequest(values)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="answer"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Answer</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Jawaban pertanyaan anda di sini" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="intent"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Intent</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-full justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? intents.find(
                                                    (intent) => intent.value === field.value
                                                )?.label
                                                : "Select an intent"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput
                                            placeholder="Search intent..."
                                            className="h-9"
                                        />
                                        <CommandList>
                                            <CommandEmpty>No intent found.</CommandEmpty>
                                            <CommandGroup>
                                                {intents.map((intent) => (
                                                    <CommandItem
                                                        value={intent.label}
                                                        key={intent.value}
                                                        onSelect={() => {
                                                            form.setValue("intent", intent.value)
                                                        }}
                                                    >
                                                        {intent.label}
                                                        <CheckIcon
                                                            className={cn(
                                                                "ml-auto h-4 w-4",
                                                                intent.value === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="public"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Buat dokumen ini publik
                                </FormLabel>
                                <FormDescription>
                                    Dokumen ini dapat diakses oleh siapa saja
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />

                <DialogFooter>
                    <Button type="submit" disabled={loadingUpload}>Save changes {loadingUpload ? <LoaderCircle className="ml-2 h-4 w-4 animate-spin" /> : ""}</Button>
                </DialogFooter>
            </form>
        </Form>
    )
}