"use client";

import Link from "next/link";
import { ThemeToggler } from "../theme/ThemeToggler";


function Navbar() {
  return (
    <nav className="flex items-center justify-center gap-3 p-4 bg-background text-foreground shadow-md dark:bg-background dark:text-foreground">
        <Link href="/" className="text-foreground">
            Home
        </Link>
        <Link href="/" className="text-foreground">
            Umeed
        </Link>
        <ThemeToggler />
    </nav>
  )
}

export default Navbar