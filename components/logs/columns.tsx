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

const Level = ({ level }: { level: string }) => {
  switch (level) {
    case "INFO":
      return <Badge variant="default">INFO</Badge>;
    case "DEBUG":
      return (
        <Badge variant="default" className="bg-yellow-200">
          DEBUG
        </Badge>
      );
    case "WARNING":
      return (
        <Badge variant="default" className="bg-orange-200">
          WARN
        </Badge>
      );
    case "ERROR":
      return (
        <Badge variant="default" className="bg-red-200">
          ERROR
        </Badge>
      );
    default:
      return <Badge variant="default">UNKNOWN</Badge>;
  }
};

export const columns: ColumnDef<Log>[] = [
  {
    accessorKey: "lvl",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          Level
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

      return <Level level={data} />;
    },
  },

  {
    accessorKey: "ts",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          Date
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
    accessorKey: "msg",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          Message
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
    accessorKey: "file",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          File
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
];
