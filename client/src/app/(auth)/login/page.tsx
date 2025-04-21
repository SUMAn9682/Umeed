"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { api } from "@/helpers/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Mail, ShieldCheck } from "lucide-react";
import { useAuthStore } from "@/store/Auth";
import { AxiosError } from "axios";

const Page = () => {
  const { login } = useAuthStore()
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/users/login", formData);
      
      if (response.status === 200) {

        // Store the access token in local storage as backup
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        localStorage.setItem("userId", response.data.data.user._id);

        document.cookie = `accessToken=${response.data.data.accessToken}; path=/; max-age=86400`;
        document.cookie = `refreshToken=${response.data.data.refreshToken}; path=/; max-age=864000`;

        toast("Login successful");
        login(response.data.data.user._id, response.data.data.user.info.bloodGroup)
        router.push("/dashboard");
      } else {
        toast.error(response.data.message || "An error occurred during login. Please try again.");
      }
    } catch (error: unknown) {
      if ( error instanceof AxiosError ) {
        const errorMessage = error.response?.data.message || "An error occurred during login. Please try again.";
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex justify-center items-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 backdrop-blur-[100px]" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>
      
      {/* Grid lines for futuristic effect */}
      <div className="fixed inset-0 z-0 opacity-10">
        <div className="grid grid-cols-12 h-full w-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-primary/30" />
          ))}
        </div>
        <div className="grid grid-rows-12 h-full w-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-b border-primary/30" />
          ))}
        </div>
      </div>

      <Card className="relative z-10 w-full max-w-md backdrop-blur-md bg-card/60 shadow-xl border border-border/50 overflow-hidden">
        {/* Glowing effect on card border */}
        <div className="absolute inset-0 border-t border-l rounded-lg border-primary/20 opacity-50" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary/20 blur-xl" />
        
        <CardHeader className="space-y-4 relative">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-primary/10" />
          <CardTitle className="text-3xl font-bold text-center text-foreground flex items-center justify-center gap-2">
            <ShieldCheck className="text-primary" size={28} />
            <span>Welcome Back</span>
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <div className="space-y-2 relative">
              <Label htmlFor="email" className="flex items-center gap-1">
                <Mail size={14} className="text-primary" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="h-11 pl-3 transition-all border-border/50 focus:border-primary bg-card/50"
                required
              />
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="password" className="flex items-center gap-1">
                <ShieldCheck size={14} className="text-primary" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="h-11 pl-3 transition-all border-border/50 focus:border-primary bg-card/50"
                required
              />
            </div>

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground relative overflow-hidden group"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 blur opacity-30 group-hover:opacity-100 transition-opacity duration-300 group-hover:duration-200 animate-pulse" />
                </>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="relative">
          <p className="text-sm text-muted-foreground text-center w-full">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;