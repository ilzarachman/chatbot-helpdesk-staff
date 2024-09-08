"use client"

import React from "react";
import { useContext } from "react";
import { StudentsContext, Student } from "@/lib/contexts/students-context";
import { fetchAPI } from "@/lib/utils";
import StudentTable from "@/components/students/student-table";
import NewStudent from "@/components/students/new-student";

export default function Students() {
    const [students, setStudents] = React.useState<Student[]>([])

    function getData() {
        fetchAPI("/student/all", {
            method: "GET",
            credentials: "include",
        }).then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    console.log(data)
                    setStudents(data.data)
                })
            }
        })
    }

    return (
        <StudentsContext.Provider value={{ data: students, setData: setStudents, getData: getData }}>
            <h1 className="text-6xl font-bold mt-10 mb-5">Students</h1>
            <NewStudent />
            <StudentTable />
        </StudentsContext.Provider>
    )
}
