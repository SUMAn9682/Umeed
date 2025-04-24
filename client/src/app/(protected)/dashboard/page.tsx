"use client";

import { useState, useEffect } from "react";
import { api } from "@/helpers/api";
import { User } from "@/types/user";
import { AxiosError } from "axios";
import {
  UserCircle,
  Phone,
  Mail,
  MapPin,
  Droplet,
  Ruler,
  Weight,
  AlertCircle,
  CheckCircle,
  Shield,
  Zap,
} from "lucide-react";

// Import shadcn components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import BMICard from "@/components/BMICard";

export default function UserDashboard() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const getUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("/users/current-user/details");

      if (res.status === 200) {
        setUser(res.data.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md">
        <Alert variant="destructive" className="mb-4 border border-destructive/20 shadow-lg animate-pulse">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>System Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={getUserData} className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 transition-all duration-300">
          Reinitialize Connection
        </Button>
      </div>
    );
  }

  // Skeleton loading UI with futuristic pulse
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl bg-gradient-to-b from-background to-background/50">
        <Card className="border border-primary/30 shadow-lg shadow-primary/5 overflow-hidden backdrop-blur-md">
          <CardHeader className="bg-gradient-to-r from-primary/80 to-purple-700/80 p-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full bg-white/20 animate-pulse" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-48 bg-white/20 animate-pulse" />
                <Skeleton className="h-4 w-24 bg-white/20 animate-pulse" />
              </div>
              <div className="ml-auto">
                <Skeleton className="h-10 w-40 rounded-full bg-white/20 animate-pulse" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 bg-gradient-to-b from-background/90 to-background/70">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <Skeleton className="h-6 w-40 animate-pulse" />
                </div>
                <Separator className="bg-primary/30" />

                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-lg animate-pulse" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-16 animate-pulse" />
                      <Skeleton className="h-5 w-32 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <Skeleton className="h-6 w-40 animate-pulse" />
                </div>
                <Separator className="bg-primary/30" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className={`border border-primary/20 backdrop-blur-sm bg-background/30 ${i === 3 ? "sm:col-span-2" : ""}`}>
                      <CardContent className="p-6 flex flex-col items-center justify-center">
                        <Skeleton className="h-12 w-12 rounded-full mb-3 animate-pulse" />
                        <Skeleton className="h-5 w-24 mb-2 animate-pulse" />
                        <Skeleton className="h-8 w-16 animate-pulse" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <Card className="mt-8 border border-primary/20 backdrop-blur-sm bg-background/30">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-32 mb-4 animate-pulse" />
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-64 animate-pulse" />
                    <Skeleton className="h-4 w-80 animate-pulse" />
                  </div>
                  <Skeleton className="h-10 w-40 animate-pulse" />
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md">
        <Alert className="mb-4 border border-primary/20 shadow-lg shadow-primary/10 backdrop-blur-md">
          <AlertCircle className="h-4 w-4 text-primary" />
          <AlertTitle>No Biometric Data Available</AlertTitle>
          <AlertDescription>
            User data retrieval unsuccessful. Please resync with the network.
          </AlertDescription>
        </Alert>
        <Button onClick={getUserData} className="w-full mt-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 transition-all duration-300">
          Resync Biometrics
        </Button>
      </div>
    );
  }

  // Get user initials for the avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl bg-gradient-to-b from-background to-background/50">
      <Card className="border border-primary/30 shadow-lg shadow-primary/10 overflow-hidden backdrop-blur-md transition-all duration-500 hover:shadow-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/80 to-purple-700/80 p-6 relative overflow-hidden">
          {/* Abstract pattern overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,transparent_50%)]"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.2)_0%,transparent_50%)]"></div>
          </div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-purple-600 animate-spin-slow blur-md opacity-50"></div>
              <Avatar className="h-16 w-16 border-2 border-white/50 relative shadow-lg shadow-primary/30">
                <AvatarFallback className="bg-primary-foreground text-primary text-xl font-semibold">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {user.name}
              </h1>
              <Badge
                variant="outline"
                className="text-white border-white/30 backdrop-blur-sm bg-white/10 capitalize"
              >
                {user.status}
              </Badge>
            </div>
            <div className="ml-auto">
              {user.canDonate ? (
                <Badge
                  variant="outline"
                  className="bg-green-400/20 backdrop-blur-sm text-green-100 border-green-400/50 flex items-center gap-2 px-4 py-1 shadow-lg shadow-green-500/20"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Donation Eligible</span>
                </Badge>
              ) : (
                <Badge
                  variant="destructive"
                  className="flex items-center gap-2 px-4 py-1 bg-red-500/80 backdrop-blur-sm border-red-400/50 shadow-lg shadow-red-500/20"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span className="font-medium">Donation Restricted</span>
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 bg-gradient-to-b from-background/90 to-background/70">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <CardTitle className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Personal Profile
              </CardTitle>
              <Separator className="bg-primary/30" />

              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3 group hover:bg-primary/5 p-2 rounded-lg transition-all duration-300">
                  <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-all duration-300 shadow-inner">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Communication</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 group hover:bg-primary/5 p-2 rounded-lg transition-all duration-300">
                  <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-all duration-300 shadow-inner">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Direct Link</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 group hover:bg-primary/5 p-2 rounded-lg transition-all duration-300">
                  <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-all duration-300 shadow-inner">
                    <UserCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Chronological</p>
                    <p className="font-medium">{user.age} years</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 group hover:bg-primary/5 p-2 rounded-lg transition-all duration-300">
                  <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-all duration-300 shadow-inner">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Geographic Node</p>
                    <p className="font-medium">
                      {user.address.city}, {user.address.district},{" "}
                      {user.address.state}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div className="space-y-6">
              <CardTitle className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Biometric Analysis
              </CardTitle>
              <Separator className="bg-primary/30" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="backdrop-blur-sm bg-background/30 border border-primary/20 shadow-lg hover:shadow-primary/20 transition-all duration-300">
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <div className="bg-red-500/10 p-3 rounded-full mb-3 shadow-inner shadow-red-500/10">
                      <Droplet className="w-6 h-6 text-red-500" />
                    </div>
                    <h3 className="text-md font-medium">Hemo-Type</h3>
                    <p className="text-2xl font-bold mt-1 text-red-500">
                      {user.info.bloodGroup}
                    </p>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-sm bg-background/30 border border-primary/20 shadow-lg hover:shadow-primary/20 transition-all duration-300">
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <div className="bg-blue-500/10 p-3 rounded-full mb-3 shadow-inner shadow-blue-500/10">
                      <Ruler className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="text-md font-medium">Vertical Metrics</h3>
                    <p className="text-2xl font-bold mt-1 text-blue-500">
                      {user.info.height} <span className="text-sm font-normal">cm</span>
                    </p>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-sm bg-background/30 border border-primary/20 shadow-lg hover:shadow-primary/20 transition-all duration-300">
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <div className="bg-green-500/10 p-3 rounded-full mb-3 shadow-inner shadow-green-500/10">
                      <Weight className="w-6 h-6 text-green-500" />
                    </div>
                    <h3 className="text-md font-medium">Mass Index</h3>
                    <p className="text-2xl font-bold mt-1 text-green-500">
                      {user.info.weight} <span className="text-sm font-normal">kg</span>
                    </p>
                  </CardContent>
                </Card>

                <BMICard height={user.info.height} weight={user.info.weight} />
              </div>
            </div>
          </div>

          {/* Donation Status */}
          <Card className="mt-8 backdrop-blur-sm bg-gradient-to-r from-background/80 to-background/50 border border-primary/20 shadow-lg hover:shadow-primary/20 transition-all duration-300">
            <CardContent className="p-6">
              <CardTitle className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Droplet className="w-5 h-5 text-primary" />
                Donation Protocol Status
              </CardTitle>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <p className="text-lg">
                    {user.canDonate
                      ? "Your biometrics indicate donation eligibility is active."
                      : "Your biometrics indicate donation eligibility is currently suspended."}
                  </p>
                  <p className="text-muted-foreground mt-1">
                    {user.canDonate
                      ? "Your contribution to the global life-preservation network is valued."
                      : "Please consult your health interface technician for status change requirements."}
                  </p>
                </div>

                <Button
                  size="lg"
                  disabled={!user.canDonate}
                  variant={user.canDonate ? "default" : "outline"}
                  className={user.canDonate ? "bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-primary/20 text-white/80" : ""}
                >
                  {user.canDonate ? "View Active Donation Requests" : "Donation Access Restricted"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </div>
  );
}