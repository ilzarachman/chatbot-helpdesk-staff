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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { Log } from "@/lib/contexts/logs-context";
import { Badge } from "@/components/ui/badge";
import { Student } from "@/lib/contexts/students-context";
import { fetchAPI } from "@/lib/utils";

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "student_number",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          Student Number
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
      const data = info.getValue() as string;

      return data;
    },
  },

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          Name
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
      const data = info.getValue() as string;

      return data;
    },
  },

  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          Email
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
      const data = info.getValue() as string;

      return data;
    },
  },

  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          Date created
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
      const data = info.getValue() as string;
      const isoDateString = data.replace(",", ".");
      return new Date(isoDateString).toLocaleString("in-ID", {
        weekday: "short",
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
      // Delete button

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
                fetchAPI(`/student/delete/${row.original.id}`, {
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
