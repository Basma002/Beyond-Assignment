"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input"; 

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log("Login Response Data:", data); 
  
      if (response.ok) {
        if (!data.user || !data.user.id || !data.user.role) {
          throw new Error("User data is missing from response.");
        }
  
        // ✅ Store role properly
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userRole", data.user.role); 
  
        console.log("Stored User Role:", localStorage.getItem("userRole"));
  
        alert("Login successful!");
        router.push("/bookShelves");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("An error occurred. Please try again.");
    }
  };  

  return (
    <Card className="w-full max-w-sm shadow-lg"> 
      <CardHeader>
        <CardTitle className="text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <Button type="submit" className="w-full bg-yellow-700 text-white hover:bg-yellow-800">
            Login
          </Button>
          {error && <p className="text-center text-red-500">{error}</p>}
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-4">
        <span className="text-sm text-gray-500">
          Don’t have an account? <a href="/auth/signup" className="text-black">Create Now</a>
        </span>
      </CardFooter>
    </Card>
  );
}
