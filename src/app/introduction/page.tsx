"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Logo_profile from "@/components/logo_profile";

export default function IntroductionPage() {
  const router = useRouter(); // Initialize the router

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Topbar */}
      <header className="flex items-center justify-between bg-gray-800 p-2 shadow-md">
        <Logo_profile />
        <div className="space-x-4">
          <Button variant="outline" onClick={() => router.push("/login")}>
            Login
          </Button>
          <Button onClick={() => router.push("/signup")}>
            Sign Up
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-12 py-10 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Introducing: StudyBuddy</h1>
        <p className="text-xl md:text-2xl font-medium mb-8">
          Your AI-Powered Personalized Learning Sidekick 🧠🎓
        </p>

        <p className="mb-6 text-lg">
          Feeling lost in a sea of YouTube tutorials, online courses, and never-ending “Top 10 resources” lists?
          <br />
          <strong className="text-purple-600">Study Buddy</strong> is here to bring order to the chaos. 🌀✨
        </p>

        <div className="text-left bg-white/5 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-2">🚀 What is Study Buddy?</h2>
          <p className="mb-4">
            Study Buddy is your intelligent learning companion that creates fully personalized study timelines
            using only the best free content online (YouTube, blogs, open courses, etc.).
          </p>
          <p className="mb-4">
            Whether you're a night owl, a weekend warrior, or a 15-min-a-day learner, we’ve got you covered.
          </p>

          <h2 className="text-2xl font-semibold mb-2">🎯 What Can It Do?</h2>
          <ul className="list-disc list-inside mb-6 space-y-1">
            <li>✅ Generate smart, structured learning timelines from free content</li>
            <li>✅ Customize your plan based on time, preferred language, and learning style</li>
            <li>✅ Schedule daily learning tasks and regular quizzes</li>
            <li>✅ Add reminders to your Google Calendar</li>
            <li>✅ Get intelligent recommendations (free & paid)</li>
            <li>✅ Live-sourced content — no outdated links or static schedules</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-2">💡 Why Study Buddy Rocks:</h2>
          <ul className="list-disc list-inside mb-6 space-y-1">
            <li>Tailored to you: Your language, your pace, your vibe</li>
            <li>Dynamic & updated: No broken links or irrelevant content</li>
            <li>Education-first AI: Built solely for smart studying</li>
            <li>Sleek & simple UI: Designed to keep you focused</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-2">🔒 Safe & Seamless Login:</h2>
          <p className="mb-6">
            Log in securely with <strong>Auth0</strong>, and pick up right where you left off — across any device.
          </p>

          <h2 className="text-2xl font-semibold mb-2">🛠️ Tech Behind the Magic:</h2>
          <ul className="list-disc list-inside mb-6 space-y-1">
            <li>Frontend: React.js + Next.js + Tailwind CSS</li>
            <li>Backend: FastAPI</li>
            <li>Database: PostgreSQL and MongoDB</li>
            <li>AI/NLP: LLaMA 3 + T5</li>
            <li>Authentication: Auth0</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-2">🧑‍💻 Built for learners. Powered by intelligence.</h2>
          <p className="mb-6">
            Study Buddy isn’t just another planner — it’s your <strong>study strategist</strong>.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Start Learning</Button>
            <Button variant="outline">Explore Timeline</Button>
            <Button variant="outline">Take a Quiz</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
