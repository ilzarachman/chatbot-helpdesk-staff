"use client"

import React from "react";
import { useContext } from "react";
import { QuestionsContext, Question } from "@/lib/contexts/questions-context";
import { fetchAPI } from "@/lib/utils";
import QuestionTable from "@/components/questions/question-table";

export default function Questions() {
    const [questions, setQuestions] = React.useState<Question[]>([])

    function getData() {
        fetchAPI("/question", {
            method: "GET",
            credentials: "include",
        }).then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    setQuestions(data)
                })
            }
        })
    }

    return (
        <QuestionsContext.Provider value={{ data: questions, setData: setQuestions, getData: getData }}>
            <h1 className="text-6xl font-bold mt-10 mb-5">Questions</h1>
            <QuestionTable />
        </QuestionsContext.Provider>
    )
}
