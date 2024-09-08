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
import { StudentsContext } from "@/lib/contexts/students-context";

const formSchema = z
  .object({
    studentNumber: z.string({
      required_error: "Student number is required",
    }),
    name: z.string({
      required_error: "Name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({ message: "Must be a valid email" }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string({
        required_error: "Confirm password is required",
      })
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export default function NewStudentForm({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const { getData } = React.useContext(StudentsContext);
  const [loadingUpload, setLoadingUpload] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentNumber: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function formSubmitRequest(values: z.infer<typeof formSchema>) {
    const data = {
      student_number: values.studentNumber,
      name: values.name,
      email: values.email,
      password: values.password,
    };

    fetchAPI("/student/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            toast({
              title: "Student created",
              description: data.message,
            });
            setOpen(false);
            form.reset();
            getData();
          });
        }

        if (!res.ok) {
          res.json().then((data) => {
            toast({
              title: "Error",
              description: data.message,
              variant: "destructive",
            });
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      });
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoadingUpload(true);
    if (values.password !== values.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });

      setLoadingUpload(false);
      return;
    }

    formSubmitRequest(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="studentNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student number</FormLabel>
              <FormControl>
                <Input placeholder="19051204057" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Tomo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="tomo@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
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
