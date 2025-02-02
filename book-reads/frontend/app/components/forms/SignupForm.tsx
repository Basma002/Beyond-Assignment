"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input"; 

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [error, setError] = useState(""); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Signup successful!");
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-orange-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              required
            />
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <div>
              <label htmlFor="role" className="block text-sm font-medium">
                Role
              </label>
              <select
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <Button type="submit" className="w-full bg-yellow-700 text-white hover:bg-yellow-800">
              Signup
            </Button>
            {error && <p className="text-center text-red-500">{error}</p>}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <span className="text-sm text-gray-500">
            Already have an account? <a href="/auth/login" className="text-black">Login</a>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
