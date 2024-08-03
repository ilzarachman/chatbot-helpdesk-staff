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
import { Check, CheckIcon, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

const formSchema = z.object({
    name: z.string({
        required_error: "Name is required",
    }),
    intent: z.string({
        required_error: "Intent is required",
    }),
    public: z.boolean({
        required_error: "Public is required",
    }),
})

const intents = [
    { label: "Academic and Administration Information", value: "academic_administration_info" },
    { label: "Resource and Service Information", value: "resource_service_info" },
    { label: "Need Assistant Support", value: "need_assistant_support" },
    { label: "Other", value: "other" }
] as const


export default function NewDocumentForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name/Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Buku harian kampus" {...field} />
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

                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </form>
        </Form>
    )
}