"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo_main from "@/components/logo_main";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      router.push("/"); // Redirecting to Study Buddy page
    }
  };

  const handleSignUp = () => {
    router.push("/signup"); // You can customize this route
  };

  return (
    <div className="flex h-screen justify-center items-center bg-background text-foreground">
      <div className="w-96 p-6 bg-gray-800 rounded-lg shadow-lg">
        <Logo_main />

        <label className="block text-sm font-semibold mb-1 mt-2">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded bg-gray-900 text-white"
        />

        <label className="block text-sm font-semibold mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded bg-gray-900 text-white"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-2"
        >
          Login
        </button>

        <button
          onClick={handleSignUp}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-2"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
