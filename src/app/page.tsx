"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Logo from "@/components/logo";
import Logo_main from "@/components/logo_main";
import Logo_left from "@/components/logo_left";

export default function StudyBuddy() {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents hydration mismatch

  return (
    <div className="min-h-screen flex transition-all bg-background text-foreground">
      {/* Sidebar */}
      {isSidebarOpen && (
          <aside className="w-64 h-screen bg-gray-900 text-white p-6 flex flex-col gap-6 relative">
              <Logo/>
              {/* Other sidebar items */}

            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg"
                    onClick={() => router.push("/create-course")}>
              Create New Course
            </Button>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg"
                    onClick={() => router.push("/scheduled-quizzes")}>
              Scheduled Quizzes
            </Button>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg">
              Calendar
            </Button>

            {/* Profile & Settings Buttons */}
            <div className="mt-auto flex items-center gap-2">
              <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
                onClick={() => router.push("/profile")}>
                Profile
              </Button>
              <button
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-700 hover:bg-gray-600 text-white">
                ⚙️
              </button>
            </div>

            {/* Sidebar Close Button */}
            <button
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-700 hover:bg-gray-600"
                onClick={() => setIsSidebarOpen(false)}
            >
              <X size={20}/>
            </button>
          </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 p-8 transition-all">
        {/* Top Buttons (Sidebar Toggle & Theme Toggle) */}
        <div className="flex justify-between items-center mb-6">
          {!isSidebarOpen && (
            <button
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
          )}

          {/* Theme Toggle */}
          <button
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        {/* Search Bar */}
        <div className="text-center mb-6">
          <Logo_main/>
          <div className="flex gap-2 justify-center mt-4">
            <Input
              type="text"
              placeholder="Search for a course..."
              className="p-3 rounded-lg w-96 text-black"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Search
            </Button>
          </div>
        </div>

        {/* Course Dashboard */}
        <div className="w-[60%] mx-auto grid grid-cols-1 gap-6">
         <Card
  className="bg-purple-600 text-white p-4 rounded-xl shadow-lg hover:bg-purple-700 cursor-pointer transition-colors"
  onClick={() => console.log("Ongoing Courses clicked")}
>
  <CardContent>
    <h2 className="text-xl font-bold">Ongoing Courses</h2>
    <p>No active courses</p>
  </CardContent>
</Card>

<Card
  className="bg-purple-600 text-white p-4 rounded-xl shadow-lg hover:bg-purple-700 cursor-pointer transition-colors"
  onClick={() => console.log("Recent Courses clicked")}
>
  <CardContent>
    <h2 className="text-xl font-bold">Recent Courses</h2>
    <p>Explore your recent searches</p>
  </CardContent>
</Card>
        </div>
      </div>
    </div>
  );
}
