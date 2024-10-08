"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LoaderCircle } from "lucide-react";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fetchAPI } from "@/lib/utils";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Document = {
  uuid: string;
  name: string;
  staff_email: string;
  intent: string;
  public: boolean;
  embedded: boolean;
  created_at: string;
};

const intentsComp = (intent: string) => {
  switch (intent) {
    case "academic_administration_info":
      return (
        <Badge variant="default" className="bg-green-200">
          Academic and Administration Information
        </Badge>
      );
    case "resource_service_info":
      return (
        <Badge variant="default" className="bg-blue-200">
          Resource and Service Information
        </Badge>
      );
    case "need_assistant_support":
      return (
        <Badge variant="default" className="bg-red-200">
          Need Assistant Support
        </Badge>
      );
    case "other":
      return <Badge variant="default">Other</Badge>;
    default:
      return <Badge variant="default">UNKNOWN</Badge>;
  }
};

export const columns: ColumnDef<Document>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          Name/Title
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="ml-2 p-1"
          >
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        </div>
      );
    },
    cell: ({ row, getValue }) => {
      // Get document_uuid from row data
      const document_uuid = row.original.document_uuid;

      return (
        <Link
          href={`${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
          }/api/v1/document/${document_uuid}`}
          target="_blank"
          className="hover:underline"
        >
          {getValue() as string}
        </Link>
      );
    },
  },
  {
    accessorKey: "staff_email",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          Uploader
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="ml-2 p-1"
          >
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        </div>
      );
    },
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
      );
    },
    cell: (info) => {
      const intents = info.getValue() as string;

      return (
        <div className="flex flex-wrap gap-2">
          {intents.split(",").map((intent, index) => {
            return intentsComp(intent);
          })}
        </div>
      );
    },
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
      );
    },
    cell: (info) => {
      return info.getValue() ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-green-500 mx-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-red-500 mx-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    },
  },
  {
    accessorKey: "embedded",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          Embedded
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="ml-2 p-1"
          >
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        </div>
      );
    },
    cell: (info) => {
      return info.getValue() ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-green-500 mx-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ) : (
        <LoaderCircle className="w-6 h-6 text-slate-500 animate-spin mx-auto" />
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <>
          Date Created
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="ml-2 p-1"
          >
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        </>
      );
    },
    cell: (info) => {
      const date = new Date(info.getValue() as string);

      return date.toLocaleString("in-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const document = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                fetchAPI(`/document/${document.document_uuid}`, {
                  method: "DELETE",
                  credentials: "include",
                }).then((res) => {
                  if (res.ok) {
                    window.location.reload();
                  }
                });
              }}
              className="cursor-pointer text-red-400"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
