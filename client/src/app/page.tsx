"use client";
import {
  MessageCircle,
  Droplet,
  Bell,
  Search,
  ArrowRight,
  Heart,
  Shield,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { NumberTicker } from "@/components/magicui/number-ticker";
import Footer from "@/components/footer/Footer";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-36 md:pb-28">
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1.5 }}
        >
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          ></motion.div>
          <motion.div
            className="absolute bottom-0 left-0 w-96 h-96 bg-chart-1 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1,
            }}
          ></motion.div>
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="flex flex-col items-center max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="px-4 py-2 bg-primary/10 text-primary rounded-full mb-4 items-center flex justify-center gap-1.5">
              <span className="font-medium">✨ Introducing Umeed</span>
              <ArrowRight size={16} />
            </div>
            <motion.h1
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-chart-4 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Welcome to Umeed
            </motion.h1>
            <motion.p
              className="mt-6 text-xl text-muted-foreground max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Revolutionizing healthcare with AI assistance and connecting blood
              donors with those in need.
            </motion.p>
            <motion.div
              className="flex flex-col md:flex-row gap-4 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                className="px-6 py-3 bg-primary text-white/80 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all hover:cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/register")}
              >
                Get Started <ArrowRight size={18} />
              </motion.button>
              <motion.button
                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-muted transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Animated floating elements for visual interest */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-primary/20"
              animate={{
                y: [0, -15, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            ></motion.div>
            <motion.div
              className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-chart-5/20"
              animate={{
                y: [0, -20, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1,
              }}
            ></motion.div>
            <motion.div
              className="absolute bottom-1/3 right-1/3 w-6 h-6 rounded-full bg-chart-1/20"
              animate={{
                y: [0, -10, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.5,
              }}
            ></motion.div>
          </div>
        </div>
      </section>

      {/* Umeed AI Section */}
      <section className="py-16 md:py-24 bg-muted/30 overflow-x-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full self-start mb-4">
                <MessageCircle size={16} className="mr-2" />
                <span className="font-medium">AI Medical Assistant</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                24/7 Medical Assistance Powered by AI
              </h2>
              <p className="mt-6 text-muted-foreground text-lg">
                Get immediate medical advice, symptom assessment, and early
                disease detection from our advanced AI system. Umeed is always
                available to provide guidance when you need it most.
              </p>
              <motion.div
                className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div
                  className="flex items-start"
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <div className="p-2 bg-secondary rounded-lg mr-4">
                    <Search size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Symptom Analysis</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Detailed assessment of your health concerns
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start"
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <div className="p-2 bg-secondary rounded-lg mr-4">
                    <Shield size={20} className="text-chart-1" />
                  </div>
                  <div>
                    <h3 className="font-medium">Early Detection</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Identify potential health issues before they worsen
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start"
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <div className="p-2 bg-secondary rounded-lg mr-4">
                    <Clock size={20} className="text-chart-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Available 24/7</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Get medical assistance anytime, anywhere
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start"
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <div className="p-2 bg-secondary rounded-lg mr-4">
                    <Heart size={20} className="text-chart-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Personalized Care</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Advice tailored to your medical history
                    </p>
                  </div>
                </motion.div>
              </motion.div>
              <motion.button
                className="mt-8 px-6 py-3 bg-primary text-foreground rounded-lg font-medium self-start flex items-center gap-2 hover:cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                onClick={() => router.push("/signin")}
              >
                Chat with Umeed
                <MessageCircle size={18} />
              </motion.button>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-chart-1/20 rounded-2xl blur-xl"></div>
              <motion.div
                className="relative bg-card p-6 rounded-2xl border border-border shadow-lg"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      <MessageCircle size={20} />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">Umeed AI</h3>
                      <p className="text-xs text-muted-foreground">
                        Medical Assistant
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-chart-5"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.div>
                    <span className="text-xs text-muted-foreground">
                      Online
                    </span>
                  </div>
                </div>
                <div className="space-y-4 mb-4">
                  <motion.div
                    className="bg-muted p-3 rounded-lg rounded-tl-none max-w-xs"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-sm">
                      Hello! I&apos;m experiencing a headache and slight fever
                      since yesterday.
                    </p>
                  </motion.div>
                  <motion.div
                    className="bg-primary/10 p-3 rounded-lg rounded-tr-none max-w-xs ml-auto"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <p className="text-sm">
                      I understand. Let me help you assess your symptoms. How
                      severe is your headache on a scale of 1-10?
                    </p>
                  </motion.div>
                  <motion.div
                    className="bg-muted p-3 rounded-lg rounded-tl-none max-w-xs"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    <p className="text-sm">
                      It&apos;s about a 6. The pain is mostly in my forehead.
                    </p>
                  </motion.div>
                  <motion.div
                    className="bg-primary/10 p-3 rounded-lg rounded-tr-none max-w-xs ml-auto"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                  >
                    <p className="text-sm">
                      Thank you. And what&apos;s your temperature? Have you
                      taken any medication so far?
                    </p>
                  </motion.div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full px-4 py-3 bg-input rounded-lg focus:ring-1 focus:ring-primary"
                  />
                  <motion.button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-primary rounded-full text-primary-foreground"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ArrowRight size={18} />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Blood Bridge Section - Now positioned below Umeed */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="order-2 md:order-1 relative"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-chart-5/20 to-primary/20 rounded-2xl blur-xl"></div>
              <motion.div
                className="relative bg-card p-6 rounded-2xl border border-border shadow-lg"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="space-y-6">
                  <motion.div
                    className="p-4 bg-muted/50 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: "-100px" }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-chart-5/20 flex items-center justify-center">
                          <Droplet size={18} className="text-chart-5" />
                        </div>
                        <div className="ml-3">
                          <h3 className="font-medium">Urgent Request</h3>
                          <p className="text-xs text-muted-foreground">
                            10 minutes ago
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-chart-5/10 text-chart-5 text-xs rounded-full">
                        B+
                      </span>
                    </div>
                    <p className="text-sm">
                      Need 2 units of B+ blood at City Hospital for emergency
                      surgery. Location: North Wing, 3rd Floor.
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        2.5 km away
                      </span>
                      <motion.button
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Respond
                      </motion.button>
                    </div>
                  </motion.div>

                  <motion.div
                    className="p-4 bg-muted/50 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-chart-1/20 flex items-center justify-center">
                          <Droplet size={18} className="text-chart-1" />
                        </div>
                        <div className="ml-3">
                          <h3 className="font-medium">Scheduled Donation</h3>
                          <p className="text-xs text-muted-foreground">
                            1 hour ago
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-chart-1/10 text-chart-1 text-xs rounded-full">
                        A-
                      </span>
                    </div>
                    <p className="text-sm">
                      Blood donation drive at Community Center on Saturday. Need
                      A- donors for leukemia patients.
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        4.8 km away
                      </span>
                      <motion.button
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Schedule
                      </motion.button>
                    </div>
                  </motion.div>

                  <motion.div
                    className="p-4 bg-muted/50 rounded-xl opacity-60"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 0.6, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true, margin: "-100px" }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-chart-4/20 flex items-center justify-center">
                          <Droplet size={18} className="text-chart-4" />
                        </div>
                        <div className="ml-3">
                          <h3 className="font-medium">Fulfilled Request</h3>
                          <p className="text-xs text-muted-foreground">
                            Yesterday
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-chart-4/10 text-chart-4 text-xs rounded-full">
                        O+
                      </span>
                    </div>
                    <p className="text-sm">
                      Required 1 unit O+ blood for surgery at Memorial Hospital.
                      Thank you to all donors!
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Completed
                      </span>
                      <div className="flex items-center gap-1">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Heart size={14} className="text-chart-5" />
                        </motion.div>
                        <span className="text-xs text-muted-foreground">
                          3 donors helped
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-chart-5/10 text-chart-5 rounded-full self-start mb-4">
                <Droplet size={16} className="mr-2" />
                <span className="font-medium">Blood Donation Network</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Blood Bridge: Connecting Lives
              </h2>
              <p className="mt-6 text-muted-foreground text-lg">
                Our innovative platform connects blood donors with those in
                urgent need. Post requests, get notified about nearby donation
                opportunities, and save lives together.
              </p>
              <motion.div
                className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div
                  className="flex items-start"
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <div className="p-2 bg-secondary rounded-lg mr-4">
                    <Bell size={20} className="text-chart-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Real-time Alerts</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Get notified about nearby donation requests
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start"
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <div className="p-2 bg-secondary rounded-lg mr-4">
                    <Droplet size={20} className="text-chart-1" />
                  </div>
                  <div>
                    <h3 className="font-medium">Blood Type Matching</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Automatic matching with compatible donors
                    </p>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                className="mt-8 flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.button
                  className="px-6 py-3 bg-chart-5 text-foreground/90 rounded-lg font-medium flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/signin")}
                >
                  Post Blood Request
                </motion.button>
                <motion.button
                  className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/register")}
                >
                  Register as Donor
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Animated counters */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold">Making a Difference Together</h2>
            <p className="mt-4 text-muted-foreground">
              Join thousands of users already benefiting from Umeed
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.p
                className="text-4xl font-bold text-primary"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                24/7
              </motion.p>
              <p className="mt-2 text-muted-foreground">Medical Assistance</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <NumberTicker
                value={500}
                className="text-4xl font-bold text-chart-1 dark:text-chart-1"
              />
              <p className="mt-2 text-muted-foreground">Registered Donors</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <NumberTicker
                value={500}
                className="text-4xl font-bold text-chart-2 dark:text-chart-2"
              />

              <p className="mt-2 text-muted-foreground">Donation Centers</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <NumberTicker
                value={500}
                className="text-4xl font-bold text-chart-3 dark:text-chart-3"
              />

              <p className="mt-2 text-muted-foreground">Registered Requests</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
