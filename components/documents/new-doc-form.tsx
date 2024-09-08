"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Check, CheckIcon, ChevronsUpDown, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { fetchAPI } from "@/lib/utils";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { DocumentsContext } from "@/lib/contexts/documents-context";

const formSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  intent: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  document_file: z.unknown().refine((file) => file instanceof FileList, {
    message: "File is required",
  }),
  public: z.boolean().default(false),
});

const intents = [
  {
    label: "Academic and Administration Information",
    value: "academic_administration_info",
  },
  { label: "Resource and Service Information", value: "resource_service_info" },
  { label: "Need Assistant Support", value: "need_assistant_support" },
  { label: "Other", value: "other" },
] as const;

export default function NewDocumentForm({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data, getData } = React.useContext(DocumentsContext);

  const [loadingUpload, setLoadingUpload] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      intent: [intents[0].value],
    },
  });

  const fileRef = form.register("document_file");

  function formSubmitRequest(values: z.infer<typeof formSchema>) {
    setLoadingUpload(true);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("intent", values.intent.join(","));
    formData.append("public", String(values.public));
    formData.append("document_file", values.document_file[0]);

    fetchAPI("/document/upload", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          toast({
            title: "Document uploaded successfully!",
            description:
              "Document will be processed to be stored inside embeddings database.",
            variant: "default",
          });
          setLoadingUpload(false);
          setOpen(false);
          getData();
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingUpload(false);
      });
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    formSubmitRequest(values);
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
              {intents.map((intent) => (
                <FormField
                  key={intent.value}
                  control={form.control}
                  name="intent"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={intent.value}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(intent.value)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...field.value, intent.value]);
                              } else {
                                field.onChange(
                                  field.value.filter(
                                    (value) => value !== intent.value
                                  )
                                );
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {intent.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              {/* <Popover>
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
                        ? intents.find((intent) => intent.value === field.value)
                            ?.label
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
                              form.setValue("intent", intent.value);
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
              </Popover> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="document_file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Document File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  {...fileRef}
                  accept="application/pdf,text/plain,text/csv,application/docx,application/doc"
                />
              </FormControl>
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
                <FormLabel>Buat dokumen ini publik</FormLabel>
                <FormDescription>
                  Dokumen ini dapat diakses oleh siapa saja
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="submit" disabled={loadingUpload}>
            Save changes{" "}
            {loadingUpload ? (
              <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />
            ) : (
              ""
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
