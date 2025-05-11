"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Logo_left from "@/components/logo_left";

export default function ScheduledQuizzes() {
  const [sortBy, setSortBy] = useState<"name" | "date" | "deadline">("date");

  const quizzes = [
    {
      course: "Course 1",
      quiz: "Quiz 1",
      date: "2025-02-20",
      deadline: "2025-03-01",
      attempted: false,
      topic: "Introduction to Databases",
      questions: 10,
      duration: "30 mins",
    },
    {
      course: "Course 2",
      quiz: "Quiz 2",
      date: "2025-02-18",
      deadline: "2025-02-28",
      attempted: true,
      topic: "Algorithms and Complexity",
      questions: 12,
      duration: "45 mins",
    },
    {
      course: "Course 3",
      quiz: "Quiz 3",
      date: "2025-02-25",
      deadline: "2025-03-05",
      attempted: false,
      topic: "Operating Systems",
      questions: 8,
      duration: "25 mins",
    },
  ];

  const sortedQuizzes = [...quizzes].sort((a, b) => {
    if (sortBy === "name") return a.quiz.localeCompare(b.quiz);
    if (sortBy === "date")
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sortBy === "deadline")
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    return 0;
  });

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <Logo_left />
      <h1 className="text-4xl font-bold mb-6 text-center">Scheduled Quizzes</h1>

      <div className="flex justify-center gap-4 mb-6">
        <Button onClick={() => setSortBy("name")}>Sort by Name</Button>
        <Button onClick={() => setSortBy("date")}>Sort by Date</Button>
        <Button onClick={() => setSortBy("deadline")}>Sort by Deadline</Button>
      </div>

      <div className="w-[90%] md:w-[80%] mx-auto grid grid-cols-2 gap-6">
        {sortedQuizzes.map((quiz, index) => (
          <Card
            key={index}
            className="bg-purple-600 text-white rounded-xl shadow-lg hover:bg-purple-700 transition-colors"
          >
            <CardContent className="flex flex-row h-40 px-6 py-4 items-center justify-between">
              {/* Left Center - Quiz Info */}
              <div className="w-1/3">
                <h2 className="text-lg font-bold">
                  {quiz.course} - {quiz.quiz}
                </h2>
                <p className="text-sm text-gray-200 font-semibold">{quiz.topic}</p>
                <p className="text-sm text-gray-200 mt-1">Date: {quiz.date}</p>
                <p className="text-sm text-gray-200">Deadline: {quiz.deadline}</p>
                <p className="text-sm text-gray-200">
                  Status: {quiz.attempted ? "✅ Attempted" : "⏳ Pending"}
                </p>
                <p className="text-md font-semibold">
                  Questions: {quiz.questions}
                </p>
                <p className="text-md font-semibold">
                  Duration: {quiz.duration}
                </p>
                <Button
                  className={`text-white text-md px-6 py-2 rounded-md ${
                    quiz.attempted
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {quiz.attempted ? "Review Quiz" : "Start Quiz"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}