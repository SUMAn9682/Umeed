"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, Loader2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(formData);
    setIsLoading(false);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us Anytime",
      details: ["+91 1234567890", "Available 24/7 for emergencies"],
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      details: ["support@umeed.org", "Response within 24 hours"],
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Our Center",
      details: ["123 Health Street", "New Delhi, India"],
    },
  ];

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 pt-16 pb-24 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12 space-y-6 relative"
          variants={itemVariants}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
            Get In Touch
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join us in our mission to save lives through blood donation. 
            Every question matters, every concern counts.
          </p>
        </motion.div>

        {/* Two-row layout for medium screens */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* First Row: Contact Info Card */}
          <motion.div variants={itemVariants}>
            <Card className="h-full shadow-xl backdrop-blur-sm bg-card/80 border border-white/10 overflow-hidden hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-8 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Connect With Us</h2>
                
                <div className="space-y-8">
                  {contactInfo.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start space-x-4 group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                        <div className="text-primary">{item.icon}</div>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium text-lg">{item.title}</h3>
                        {item.details.map((detail, idx) => (
                          <p key={idx} className="text-muted-foreground">{detail}</p>
                        ))}
                      </div>
                      <ChevronRight className="w-5 h-5 text-primary/40 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 blur-xl rounded-full -z-10"></div>
                  <Card className="border-white/20 bg-background/50 backdrop-blur-md overflow-hidden">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">
                        Need immediate assistance? 
                        <span className="font-semibold text-primary ml-1">We&apos;re available 24/7</span>
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Second Row: Contact Form */}
          <motion.div variants={itemVariants}>
            <Card className="h-full shadow-xl backdrop-blur-sm bg-card/80 border border-white/10 overflow-hidden hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium ml-1">Full Name</label>
                    <Input
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-12 rounded-xl border-primary/20 focus:border-primary transition-all duration-300 bg-background/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium ml-1">Email Address</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12 rounded-xl border-primary/20 focus:border-primary transition-all duration-300 bg-background/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium ml-1">Subject</label>
                    <Input
                      placeholder="How can we help you today?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="h-12 rounded-xl border-primary/20 focus:border-primary transition-all duration-300 bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium ml-1">Your Message</label>
                    <Textarea
                      placeholder="Please share your thoughts..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="rounded-xl border-primary/20 focus:border-primary transition-all duration-300 resize-none bg-background/50"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg font-medium hover:scale-[1.02] transition-all duration-300 bg-gradient-to-r from-primary to-purple-500 rounded-xl mt-4 text-foreground"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <div className="text-center mt-4">
                    <p className="text-xs text-muted-foreground">
                      By submitting this form, you agree to our <span className="text-primary cursor-pointer">Privacy Policy</span>
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Contact;