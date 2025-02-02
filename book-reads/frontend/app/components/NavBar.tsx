"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

export function NavBarDemo() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  const navItems = [
    { name: "BookShelves", url: "/bookShelves" },
    { name: "Browse Books", url: "/reviews" },
    { name: "Categories", url: "/categories" },
    userRole === "ADMIN" ? { name: "Add a Book", url: "/addBooks" } : null, 
    { name: "Analytics", url: "/analytics" },
  ].filter((item): item is { name: string; url: string } => item !== null); 

  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b bg-white shadow-md">
      <div className="text-2xl font-bold">
        <Image 
          src="/logo.png" 
          alt="Book Logo"
          width={100}  
          height={100} 
          priority  
        />
      </div>
      <ul className="flex space-x-6">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.url}
              className={`text-lg px-4 py-2 rounded-lg transition-all ${
                pathname === item.url
                  ? "font-bold text-black border-b-2 border-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
