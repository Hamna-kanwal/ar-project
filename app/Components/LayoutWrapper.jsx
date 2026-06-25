"use client";
import { useState } from "react";
import { Navbar } from "./navbar"; // Apni path check kar lein
import { Sidebar } from "./sidebar"; // Apni path check kar lein
import { Toaster } from "react-hot-toast";

export default function LayoutWrapper({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return (
    <>
      <Navbar onOpenSidebar={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {children}
      <Toaster position="top-right" />
    </>
  );
}