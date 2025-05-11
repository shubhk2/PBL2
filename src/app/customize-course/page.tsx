"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function CustomizeCourse() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");
  const [duration, setDuration] = useState("");
  const [time, setTime] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [level, setLevel] = useState("");

  const durationOptions = [
    { value: "", label: "Select..." },
    { value: "1 week", label: "1 Week" },
    { value: "1 month", label: "1 Month" },
    { value: "3 months", label: "3 Months" },
  ];

  const timeOptions = [
    { value: "", label: "Select..." },
    { value: "Weekends", label: "Weekends" },
    { value: "Evenings", label: "Evenings" },
    { value: "Anytime", label: "Anytime" },
  ];

  const knowledgeOptions = [
    { value: "", label: "Select..." },
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
  ];

  const levelOptions = [
    { value: "", label: "Select..." },
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Hard", label: "Hard" },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-white p-6">
    <div className="w-120 p-6 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Setup Your Course: {topic}</h1>

      <div className="w-96 space-y-4">
        <label className="block">
          Preferred Duration:
          <Select value={duration} onChange={(e) => setDuration(e.target.value)} options={durationOptions} />
        </label>

        <label className="block">
          Preferred Time/Day:
          <Select value={time} onChange={(e) => setTime(e.target.value)} options={timeOptions} />
        </label>

        <label className="block">
          Prior Knowledge:
          <Select value={knowledge} onChange={(e) => setKnowledge(e.target.value)} options={knowledgeOptions} />
        </label>

        <label className="block">
          Difficulty Level:
          <Select value={level} onChange={(e) => setLevel(e.target.value)} options={levelOptions} />
        </label>

        <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600">Setup Course</Button>
      </div>
      </div>
    </div>
  );
}