"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, Loader2, Heart } from "lucide-react";
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(formData);
    setIsLoading(false);
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90 pt-16 pb-24 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      
        
        
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-20 space-y-6 relative"
          variants={itemVariants}
        >
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
            Let's Connect
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join us in our mission to save lives through blood donation. 
            Every question matters, every concern counts.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
        >
          {[
            {
              icon: <Phone className="w-6 h-6 " />,
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
          ].map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-primary/10 overflow-hidden">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <div className="text-primary group-hover:rotate-12 transition-transform">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-xl">{item.title}</h3>
                  {item.details.map((detail, idx) => (
                    <p key={idx} className="text-muted-foreground">{detail}</p>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div variants={itemVariants}>
          <Card className="border-primary/10 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden backdrop-blur-sm bg-card/80">
            <CardContent className="p-10">
              <div className="max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="h-12 border-primary/20 focus:border-primary transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Email Address</label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="h-12 border-primary/20 focus:border-primary transition-all duration-300"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Subject</label>
                    <Input
                      placeholder="How can we help you today?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="h-12 border-primary/20 focus:border-primary transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Your Message</label>
                    <Textarea
                      placeholder="Please share your thoughts..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      className="border-primary/20 focus:border-primary transition-all duration-300 resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-medium hover:scale-[1.02] transition-all duration-300 bg-gradient-to-r from-primary to-primary/80"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending your message...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer Note */}
        <motion.div 
          className="text-center mt-12 text-muted-foreground flex items-center justify-center gap-2"
          variants={itemVariants}
        >
          <span>Made with</span>
          <Heart className="w-4 h-4 text-red-500 animate-pulse" />
          <span>by Umeed Team</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Contact;