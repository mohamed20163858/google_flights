"use client";
import dynamic from "next/dynamic";
const DarkModeToggle = dynamic(() => import("./DarkModeToggle"), {
  ssr: false,
});

export default function Navbar() {
  return (
    <nav className=" sticky flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 shadow-sm">
      {/* Logo */}
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
        Google Flight Clone
      </h1>

      {/* Dark Mode Toggle */}
      <DarkModeToggle />
    </nav>
  );
}
