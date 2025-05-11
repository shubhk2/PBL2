"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import Logo_left from "@/components/logo_left";

export default function CreateCourse() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [funFact, setFunFact] = useState("");
  const router = useRouter();

  const funFacts = [
    "Did you know? The first programming language was created in 1843 by Ada Lovelace!",
    "Fact: Python is named after Monty Python, not the snake!",
    "Ever wondered? The first website ever made is still online at info.cern.ch.",
  ];

  // Select a random fun fact
  useEffect(() => {
    if (loading) {
      setFunFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
    }
  }, [loading]);

  const handleSubmit = () => {
    if (topic.trim() === "") return;

    setLoading(true);

    // Simulate backend validation
    setTimeout(() => {
      setLoading(false);
      router.push(`/customize-course?topic=${encodeURIComponent(topic)}`);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-white p-4">
    <div className="w-120 p-6 bg-gray-800 rounded-lg shadow-lg">
      {!loading ? (
        <>
          <h1 className="text-3xl font-bold mb-4">Create a New Course</h1>
          <p className="text-gray-400 mb-4">Enter a topic to get started</p>
          <Input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic..."
            className="w-80 p-2 text-black rounded-md"
          />
          <div className="mt-0"></div>
          <Button
            onClick={handleSubmit}
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600"
          >
            Submit
          </Button>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-semibold">Verifying your topic...</h2>
          <p className="mt-2 italic text-gray-400">{funFact}</p>
          <div className="mt-4 w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      )}
    </div>
    </div>
  );
}
