import RequestForm from "@/components/blood bridge/RequestForm";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import UserRequests from "@/components/blood bridge/UserRequests";
import Requests from "@/components/blood bridge/Requests";
import Link from "next/link";
import { Info, GitBranch, Heart } from "lucide-react";

function BloodBridge() {
  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <header className="relative overflow-hidden py-12 bg-background dark:bg-background">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-0.5 h-full bg-red-600"></div>
          <div className="absolute top-0 left-1/3 w-0.5 h-full bg-red-600"></div>
          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-red-600"></div>
          <div className="absolute top-0 left-2/3 w-0.5 h-full bg-red-600"></div>
          <div className="absolute top-0 left-3/4 w-0.5 h-full bg-red-600"></div>

          <div className="absolute top-1/4 left-0 w-full h-0.5 bg-red-600"></div>
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-600"></div>
          <div className="absolute top-3/4 left-0 w-full h-0.5 bg-red-600"></div>
        </div>

        {/* Accent elements */}
        <div className="absolute -top-10 right-1/4 w-40 h-40 rounded-full bg-red-500/20 dark:bg-red-500/5 blur-3xl"></div>
        <div className="absolute -bottom-10 left-1/4 w-40 h-40 rounded-full bg-red-500/20 dark:bg-red-500/5 blur-3xl"></div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 flex items-center justify-center">
          <div className="absolute w-32 h-32 rounded-full border-4 border-red-500/20 animate-ping"></div>
          <div className="absolute w-20 h-20 rounded-full border-2 border-red-500/30 animate-pulse"></div>
        </div>

        {/* Highlight bar */}
        <div className="absolute h-1 top-0 left-0 right-0 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>

        <div className="container relative mx-auto px-6 py-7 text-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-foreground tracking-tight">
            Blood<span className="text-red-600">Bridge</span>
          </h1>

          <div className="relative inline-block">
            <p className="text-lg font-medium max-w-2xl mx-auto text-foreground/80">
              Your decision to donate blood can save up to three lives.
            </p>
            <div className="absolute -bottom-3 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
          </div>
        </div>
      </header>

      <main className="container mx-auto md:px-6 py-8 relative z-10">
        <Tabs defaultValue="donor" className="w-full max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <TabsList className="inline-flex space-x-2 p-1 bg-card/50 backdrop-blur-md rounded-xl shadow-md border border-border/30">
              <TabsTrigger
                value="donor"
                className="px-6 py-3 text-base font-medium rounded-lg data-[state=active]:bg-red-600 dark:data-[state=active]:bg-red-600 data-[state=active]:text-white transition-all duration-200"
              >
                <Heart className="w-4 h-4 mr-2 inline-block" />
                Be a Donor
              </TabsTrigger>
              <TabsTrigger
                value="requests"
                className="px-6 py-3 text-base font-medium rounded-lg data-[state=active]:bg-red-600 dark:data-[state=active]:bg-red-600 data-[state=active]:text-white transition-all duration-200"
              >
                <GitBranch className="w-4 h-4 mr-2 inline-block" />
                Blood Requests
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="backdrop-blur-sm bg-card/70 dark:bg-card/70 rounded-xl shadow-lg border border-border/30">
            <TabsContent
              value="donor"
              className="p-6 animate-in fade-in-50 duration-300"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Side: Request Form */}
                <div className="bg-background/50 backdrop-blur-sm rounded-xl p-5 border border-border/50 shadow-sm max-h-50">
                  <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-red-600" />
                    Create Donation Request
                  </h2>
                  <RequestForm />

                  <div className="mt-4">
                    <Link
                      href="/blood-bridge/guidelines"
                      className="group inline-flex items-center text-sm text-muted-foreground hover:text-red-600 transition-colors"
                    >
                      <Info className="h-4 w-4 mr-1.5 group-hover:text-red-600" />
                      Blood Donation Guidelines
                    </Link>
                  </div>
                </div>

                {/* Right Side: Current Requests */}
                <div className="bg-background/50 backdrop-blur-sm rounded-xl p-5 border border-border/50 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center">
                    <GitBranch className="mr-2 h-5 w-5 text-red-600" />
                    Current Donation Needs
                  </h2>
                  <div className="max-h-[500px] overflow-y-auto pr-2">
                    <Requests />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="requests"
              className="p-6 animate-in fade-in-50 duration-300"
            >
              <div className="bg-background/50 backdrop-blur-sm rounded-xl p-5 border border-border/50 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center">
                  <GitBranch className="mr-2 h-5 w-5 text-red-600" />
                  Your Blood Requests
                </h2>
                <UserRequests />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
}

export default BloodBridge;
