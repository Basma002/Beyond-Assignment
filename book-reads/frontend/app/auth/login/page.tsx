"use client";

import React from "react";
import LoginForm from "../../components/forms/LoginForm";
import Spline from "@splinetool/react-spline";

export default function LoginPage() {
  return (
    <div className="flex h-screen">
      {/* Left Half: Spline 3D Shape */}
      <div className="w-1/2 flex items-center justify-center bg-yellow-700">
        <Spline scene="https://prod.spline.design/ROMoL-MqaLqHWtAb/scene.splinecode" />
      </div>

      {/* Right Half: Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-orange-50">
        <LoginForm />
      </div>
    </div>
  );
}
