"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/session/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", // Include cookies for session handling
      });

      if (response.ok) {
        alert("Login successful!");
        router.push("/landingPage"); // Redirect to landing page
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert("An error occurred. Please try again.");
    }
  };

  const handleCreateAccount = () => {
    router.push("/signin");
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Section */}
      <div className="lg:w-1/2 bg-blue-500 text-white flex flex-col justify-center items-center px-10 relative">
        {/* Background Image */}
        <img
          src="/background.png"
          alt="Background"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-6">
            Welcome back to your custom forms!
          </h1>
          <p className="text-lg">
            Access your account and manage your professional forms.
          </p>
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-blue-500 opacity-70"></div>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 flex flex-col justify-center items-center px-10 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              placeholder="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full"
              required
            />
            <Input
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full"
              required
            />
            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-full max-w-xs bg-blue-500 hover:bg-blue-700"
              >
                Login
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don’t have an account?{" "}
              <button
                onClick={handleCreateAccount}
                className="text-blue-500 hover:underline"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
