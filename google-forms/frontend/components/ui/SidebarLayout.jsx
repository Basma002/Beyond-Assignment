"use client";

import { useRouter } from "next/navigation";

export default function SidebarLayout({ children }) {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path); // Simplified navigation function
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-400 text-white p-6">
        <h2 className="text-lg font-semibold mb-6 flex items-center">
          <span className="mr-2">📄</span> Form Builder
        </h2>
        <ul className="space-y-4">
          <li
            className="cursor-pointer hover:underline"
            onClick={() => navigateTo("/myForms")}
          >
            My Forms
          </li>
          <li
            className="cursor-pointer hover:underline"
            onClick={() => navigateTo("/responses")}
          >
            Responses
          </li>
          <li
            className="cursor-pointer hover:underline"
            onClick={() => navigateTo("/help&support")}
          >
            Help & Support
          </li>
          <li
            className="cursor-pointer hover:underline"
            onClick={() => navigateTo("/login")}
          >
            Logout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
