"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo_main from "@/components/logo_main";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    language: "",
    profession: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = () => {
    // Here you can add validation or backend integration
    if (
      formData.fullName &&
      formData.email &&
      formData.contact &&
      formData.language &&
      formData.profession &&
      formData.password
    ) {
      router.push("/login"); // Redirect to login
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-background text-foreground">
      <div className="w-96 p-6 bg-gray-800 rounded-lg shadow-lg">
        <Logo_main />

        <label className="block text-sm font-semibold mb-1 mt-2">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded bg-gray-900 text-white"
        />

        <label className="block text-sm font-semibold mb-1 mt-2">Username</label>
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded bg-gray-900 text-white"
        />

        <label className="block text-sm font-semibold mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded bg-gray-900 text-white"
        />

        <label className="block text-sm font-semibold mb-1">Contact Number</label>
        <input
          type="tel"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded bg-gray-900 text-white"
        />

        <label className="block text-sm font-semibold mb-1">Preferred Language</label>
        <input
          type="text"
          name="language"
          value={formData.language}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded bg-gray-900 text-white"
        />

        <label className="block text-sm font-semibold mb-1">Profession</label>
        <input
          type="text"
          name="profession"
          value={formData.profession}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded bg-gray-900 text-white"
        />

        <label className="block text-sm font-semibold mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded bg-gray-900 text-white"
        />

        <button
          onClick={handleSignUp}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
