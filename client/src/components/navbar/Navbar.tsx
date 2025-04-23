"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ThemeToggler } from "../theme/ThemeToggler";
import { useAuthStore } from "@/store/Auth";
import { Button } from "../ui/button";
import { LogOut, Menu, Home, LogIn, UserPlus, Droplet, Heart } from "lucide-react";
import { api } from "@/helpers/api";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { cn } from "@/lib/utils";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout, isAuthenticated } = useAuthStore();
  const [, setScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const navItems = [
    {
      name: "Dashboard",
      href: "/",
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
    }
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
      const res = await api.post("/users/logout", {}, { withCredentials: true });
      if (res.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        document.cookie = "accessToken=null, path=/; max-age=0";
        document.cookie = "refreshToken=null, path=/; max-age=0";
        toast.success("Logout successful");
        router.replace("/");
        logout();
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
    <nav className={cn(
      "fixed top-0 z-50 w-full px-4 py-3 transition-all duration-300 flex items-center justify-between bg-transparent backdrop-blur-3xl",
      "max-w-full overflow-x-hidden"
    )}>
      <div className="flex items-center">
        <Link href="/" className="flex items-center pl-10">
          <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent font-bold text-xl mr-2">Umeed</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-6">
        {navItems.filter((item) => item.auth === isAuthenticated).map((item, index) => (
          <Link 
            href={item.href} 
            key={index} 
            className={cn(
              "flex items-center transition-colors",
              isActive(item.href) 
                ? "text-primary font-medium" 
                : "text-foreground/80 hover:text-primary"
            )}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
        
        {isAuthenticated && (
          <Button
            variant="ghost"
            className="text-red-400 hover:text-red-600 hover:bg-red-100/10 flex items-center gap-2"
            onClick={handleLogout}
            aria-label="Logout"
          >
            Logout<LogOut className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggler />
        
        {!isAuthenticated && (
          <Link href="/register" className="hidden md:flex">
            <Button variant="default" className="flex items-center gap-1 text-foreground">
              <UserPlus className="h-4 w-4" />
              Get Started
            </Button>
          </Link>
        )}
        
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-foreground">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          
          <SheetContent side="right" className="w-64">
            <SheetHeader className="mb-6">
              <SheetTitle className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent text-xl">Umeed</SheetTitle>
            </SheetHeader>
            
            <div className="flex flex-col gap-4 px-2">
              {navItems.filter((item) => item.auth === isAuthenticated).map((item, index) => (
                <Link 
                  href={item.href} 
                  key={index} 
                  onClick={handleNavigation}
                  className={cn(
                    "flex items-center py-2 transition-colors",
                    isActive(item.href) 
                      ? "text-primary font-medium" 
                      : "text-foreground/80 hover:text-primary"
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
              
              {!isAuthenticated && (
                <Link href="/register" onClick={handleNavigation}>
                  <Button variant="default" className="w-full flex items-center justify-center gap-1 text-foreground">
                    <UserPlus className="h-4 w-4" />
                    Get Started
                  </Button>
                </Link>
              )}
              
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  className="text-red-400 hover:text-red-600 hover:bg-red-100/10 justify-start px-2"
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
    </nav>
  );
}

export default Navbar;