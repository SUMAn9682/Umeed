"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ThemeToggler } from "../theme/ThemeToggler";
import { useAuthStore } from "@/store/Auth";
import { Button } from "../ui/button";
import {
  LogOut,
  Menu,
  Home,
  LogIn,
  UserPlus,
  Droplet,
  Heart,
  User,
  Settings,
} from "lucide-react";
import { api } from "@/helpers/api";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { cn } from "@/lib/utils";
import Notifications from "./Notifications";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar } from "../ui/avatar";
import { motion } from "framer-motion";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout, isAuthenticated } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <Home className="h-4 w-4 mr-1" />,
      auth: true,
    },
    {
      name: "Home",
      href: "/",
      auth: false,
    },
    {
      name: "Umeed",
      href: "/umeed",
      icon: <Heart className="h-4 w-4 mr-1" />,
      auth: true,
    },
    {
      name: "Blood Bridge",
      href: "/blood-bridge",
      icon: <Droplet className="h-4 w-4 mr-1" />,
      auth: true,
    },
    {
      name: "About Us",
      href: "/about",
      auth: false,
    },
    {
      name: "Contact Us",
      href: "/contact",
      auth: false,
    },
    {
      name: "Sign in",
      href: "/login",
      icon: <LogIn className="h-4 w-4 mr-1" />,
      auth: false,
    },
  ];
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await api.post(
        "/users/logout",
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        document.cookie = "accessToken=null, path=/; max-age=0";
        document.cookie = "refreshToken=null, path=/; max-age=0";
        toast.success("Logout successful");
        router.replace("/");
        logout();
        router.refresh();
        setIsSheetOpen(false); // Close sheet on logout
      }
    } catch {
      toast.error("Logout failed");
    }
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  // Handle navigation and close sheet
  const handleNavigation = () => {
    setIsSheetOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 z-50 w-[99vw] md:w-full px-6 py-3 transition-all duration-300 flex items-center justify-between",
        scrolled 
          ? "bg-background/80 backdrop-blur-xl shadow-lg border-b border-primary/10" 
          : "bg-transparent backdrop-blur-md",
        "max-w-full overflow-x-hidden"
      )}
    >
      <div className="flex items-center pl-5">
        <Link href="/" className="flex items-center">
          <motion.span 
            className="bg-gradient-to-r from-primary via-purple-500 to-pink-400 bg-clip-text text-transparent font-bold text-2xl relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Umeed
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-purple-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </motion.span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {navItems
          .filter((item) => item.auth === isAuthenticated)
          .map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className="group relative"
            >
              <span
                className={cn(
                  "flex items-center transition-colors duration-300",
                  isActive(item.href)
                    ? "text-primary font-medium"
                    : "text-foreground/80 hover:text-primary"
                )}
              >
                {item.icon}
                {item.name}
              </span>
              <span 
                className={cn(
                  "absolute -bottom-1 left-0 w-full h-0.5 transform transition-transform duration-300 bg-gradient-to-r from-primary to-purple-500",
                  isActive(item.href) 
                    ? "scale-x-100" 
                    : "scale-x-0 group-hover:scale-x-100"
                )}
              ></span>
            </Link>
          ))}
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggler />

        {!isAuthenticated && (
          <Link href="/register" className="hidden md:flex">
            <Button
              variant="default"
              className="flex items-center gap-1 text-white/90 bg-gradient-to-r from-primary/90 to-purple-500/90 hover:from-primary hover:to-purple-500 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary/20"
            >
              <UserPlus className="h-4 w-4" />
              Get Started
            </Button>
          </Link>
        )}

        {isAuthenticated && <Notifications />}

        {isAuthenticated && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-10 h-10 cursor-pointer bg-gradient-to-br from-primary/20 to-purple-500/20 border-2 border-primary/30 hover:border-primary transition-all duration-300 shadow-sm items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="backdrop-blur-xl bg-background/80 border border-primary/20 shadow-lg shadow-primary/5">
              <DropdownMenuItem className="hover:bg-primary/10 focus:bg-primary/10">
                <Link href="/settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" /> Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-red-500/10 focus:bg-red-500/10">
                <Button
                  variant="ghost"
                  className="text-red-400 hover:text-red-600 hover:bg-transparent flex items-center gap-2 p-0"
                  onClick={handleLogout}
                  aria-label="Logout"
                >
                  Logout
                  <LogOut className="h-4 w-4" />
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-foreground ml-2 p-2 rounded-full hover:bg-primary/10">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-72 border-l border-primary/20 backdrop-blur-xl bg-background/90">
            <SheetHeader className="mb-8">
              <SheetTitle className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent text-2xl">
                Umeed
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-5 px-2">
              {navItems
                .filter((item) => item.auth === isAuthenticated)
                .map((item, index) => (
                  <Link
                    href={item.href}
                    key={index}
                    onClick={handleNavigation}
                    className={cn(
                      "flex items-center py-2 px-3 rounded-lg transition-all duration-300",
                      isActive(item.href)
                        ? "text-primary font-medium bg-primary/10"
                        : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}

              {!isAuthenticated && (
                <Link href="/register" onClick={handleNavigation} className="mt-4">
                  <Button
                    variant="default"
                    className="w-full flex items-center justify-center gap-1 text-foreground bg-gradient-to-r from-primary/90 to-purple-500/90 hover:from-primary hover:to-purple-500"
                  >
                    <UserPlus className="h-4 w-4" />
                    Get Started
                  </Button>
                </Link>
              )}

              {isAuthenticated && (
                <Button
                  variant="ghost"
                  className="text-red-400 hover:text-red-600 hover:bg-red-100/10 justify-start px-3 rounded-lg mt-4"
                  onClick={handleLogout}
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  );
}

export default Navbar;