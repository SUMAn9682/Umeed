"use client";

import Link from "next/link";
import { ThemeToggler } from "../theme/ThemeToggler";
import { useAuthStore } from "@/store/Auth";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { api } from "@/helpers/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  const { logout } = useAuthStore()
  const { isAuthenticated } = useAuthStore();

  const navItems = [
    {
      name: "Umeed",
      href: "/",
      auth: true,
    },
    {
      name: "Login",
      href: "/login",
      auth: false,
    },
    {
      name: "Register",
      href: "/register",
      auth: false,
    },
  ];

  const handleLogout = async() => {
    try {
      const res = await api.post("/users/logout", {}, { withCredentials: true });
      if(res.status === 200) {
        toast("Logout successful")
        router.replace("/")
      }
      logout()
    } catch {
      toast.error("Logout failed")
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-screen flex items-center justify-center gap-3 p-1 bg-background text-foreground">
      <Link href="/" className="text-foreground">
        Home
      </Link>
      {navItems.filter((item) => item.auth === isAuthenticated).map((item, index) => (
        <Link href={item.href} key={index} className="text-foreground">
          {item.name}
        </Link>
      ))}
      {isAuthenticated && (
        <Button
        variant="ghost"
        className="text-red-400 hover:text-red-600 flex items-center gap-2"
        onClick={handleLogout}
        aria-label="Logout"
        >
          Logout<LogOut className="h-4 w-4" />
        </Button>
      )}
      <ThemeToggler />
    </nav>
  );
}

export default Navbar;
