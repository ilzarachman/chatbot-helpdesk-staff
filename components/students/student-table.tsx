"use client";

import React from "react";
import { columns } from "@/components/students/columns";
import { DataTable } from "@/components/ui/data-table";
import { fetchAPI } from "@/lib/utils";
import { DocumentsContext } from "@/lib/contexts/documents-context";
import { Question, QuestionsContext } from "@/lib/contexts/questions-context";
import { StudentsContext } from "@/lib/contexts/students-context";

export default function StudentTable() {
  const { data: students, getData } = React.useContext(StudentsContext);

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className="my-4 max-w-[1280px]">
      <DataTable
        columns={columns}
        data={students}
        filterColumn="name"
        filterColumnPlaceholder="Filter name/title..."
      />
    </div>
  );
}
