"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, Users, MessageCircle, Calendar } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-bg-emerald-500 to-emerald-600 bg-clip-text text-transparent">
  About Umeed
</h1>
          <p className="text-xl max-w-2xl mx-auto text-muted-foreground">
            Connecting donors with recipients when every second counts
          </p>
        </div>
        
        {/* Main Content */}
        <div className="max-w-4xl mx-auto bg-card rounded-2xl p-8 shadow-lg border border-border">
          <div className="space-y-8 text-lg">
            <div className="flex gap-6 items-start">
              <div className="bg-primary/10 p-3 rounded-full shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
                <p className="text-card-foreground">
                  Umeed is a project designed to connect blood donors with those in need during critical situations. 
                  Our platform sends real-time email notifications to registered donors when blood is urgently required, creating 
                  a bridge between donors and recipients when it matters most.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="bg-primary/10 p-3 rounded-full shrink-0">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">Meet Umeed</h2>
                <p className="text-card-foreground">
                  At the heart of our platform is Umeed, our AI chatbot that assists users with information about blood donation, 
                  compatibility, and answering common questions. Currently, we're using the Grock model to power Umeed, but we have 
                  plans to develop our own AI model in the future to better serve our community's specific needs.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="bg-primary/10 p-3 rounded-full shrink-0">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">Saving Lives</h2>
                <p className="text-card-foreground">
                  Our mission is simple: to save lives by making blood donation more accessible and efficient. By connecting donors 
                  directly with those in need, we hope to reduce response times and increase successful donations across communities.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="bg-primary/10 p-3 rounded-full shrink-0">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">Our Story</h2>
                <p className="text-card-foreground">
                  BloodBridge was created as a passion project by a team of developers who believe technology can make a meaningful 
                  difference in healthcare accessibility. While we're starting small, we have big dreams for how this platform can grow 
                  to serve more communities and save more lives.
                </p>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">100+</p>
              <p className="text-muted-foreground">Donors Registered</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">24/7</p>
              <p className="text-muted-foreground">Emergency Support</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">50+</p>
              <p className="text-muted-foreground">Lives Impacted</p>
            </div>
          </div>
          
          {/* CTA */}
          <div className="mt-12 text-center">
            <Link 
              href="/register" 
              className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2 shadow-lg"
            >
              Register as a Donor <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="mt-4 text-muted-foreground">Join our community of life-savers today</p>
          </div>
        </div>
        
        {/* Testimonial */}
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <blockquote className="text-xl italic text-muted-foreground">
            "In a world where every second counts during medical emergencies, 
            BloodBridge stands as a beacon of hope, connecting those who can give 
            with those who desperately need."
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;