import React from 'react';
import Link from 'next/link';
import { ChevronRight, Users, Zap, Globe } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">FT</span>
            </div>
            <span className="font-bold text-xl">FutureTech</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/about" className="text-primary font-medium">About</Link>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <Link href="/team" className="hover:text-primary transition-colors">Team</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </nav>
          
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2">
            Get Started <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Pioneering the <span className="text-primary">Future</span> of Technology
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              We&apos;re a team of visionaries, creators, and innovators building tomorrow&apos;s solutions today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium">
                Our Mission
              </button>
              <button className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium">
                Meet the Team
              </button>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-l from-primary/5 to-transparent rounded-l-3xl"></div>
          <div className="absolute top-20 right-40 w-64 h-64 border border-primary/20 rounded-full"></div>
          <div className="absolute bottom-40 right-80 w-40 h-40 border border-chart-3/20 rounded-full"></div>
          <div className="absolute top-60 right-96 w-24 h-24 border border-chart-2/20 rounded-full"></div>
        </div>
      </section>
      
      {/* Vision Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              At FutureTech, we&apos;re redefining what&apos;s possible through innovation, collaboration, and a commitment to excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-10 h-10 text-primary" />,
                title: "Collaborative Innovation",
                description: "We believe in the power of diverse teams working toward common goals."
              },
              {
                icon: <Zap className="w-10 h-10 text-chart-1" />,
                title: "Cutting-Edge Technology",  
                description: "Our solutions leverage the latest advancements to solve complex problems."
              },
              {
                icon: <Globe className="w-10 h-10 text-chart-3" />,
                title: "Global Impact",
                description: "We&apos;re building solutions that improve lives across the planet."
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-background rounded-xl p-6 border border-border flex flex-col items-center text-center"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Company Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10+", label: "Years Experience" },
              { value: "250+", label: "Team Members" },
              { value: "100+", label: "Global Clients" },
              { value: "15", label: "Industry Awards" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Timeline */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Journey</h2>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-border"></div>
            
            {[
              { year: "2015", title: "Founded", description: "FutureTech was established with a vision to transform industries." },
              { year: "2017", title: "First Major Client", description: "Partnered with a Fortune 500 company to deliver innovative solutions." },
              { year: "2019", title: "Global Expansion", description: "Opened offices in Europe and Asia to serve our growing client base." },
              { year: "2022", title: "Breakthrough Innovation", description: "Launched our flagship AI platform revolutionizing data analytics." },
              { year: "2025", title: "Industry Leadership", description: "Recognized as an industry leader in technological innovation." }
            ].map((event, index) => (
              <div key={index} className={`flex items-start mb-12 relative ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-10 text-right' : 'md:pl-10 text-left'}`}>
                  <div className="bg-background p-6 rounded-xl border border-border">
                    <div className="text-primary font-bold text-xl mb-2">{event.year}</div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground">{event.description}</p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-primary"></div>
                </div>
                
                <div className="w-full md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Leaders */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Leadership Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-center mb-12">
            Meet the visionaries leading our company toward a brighter future.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Alex Chen", title: "CEO & Founder", image: "/api/placeholder/400/400" },
              { name: "Sarah Johnson", title: "CTO", image: "/api/placeholder/400/400" },
              { name: "Michael Rodriguez", title: "Head of Innovation", image: "/api/placeholder/400/400" }
            ].map((person, index) => (
              <div key={index} className="bg-card rounded-xl overflow-hidden border border-border">
                <img src={person.image} alt={person.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold">{person.name}</h3>
                  <p className="text-primary">{person.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Ready to Shape the Future?</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Join us on our mission to create transformative technology solutions that make a difference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="bg-background text-foreground px-6 py-3 rounded-lg font-medium">
              Contact Us
            </Link>
            <Link href="/careers" className="bg-primary-foreground text-primary px-6 py-3 rounded-lg font-medium">
              Join Our Team
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-card py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xs">FT</span>
                </div>
                <span className="font-bold">FutureTech</span>
              </div>
              <p className="text-muted-foreground max-w-md">
                Building innovative solutions for a better tomorrow.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-muted-foreground hover:text-primary">About</Link></li>
                  <li><Link href="/careers" className="text-muted-foreground hover:text-primary">Careers</Link></li>
                  <li><Link href="/news" className="text-muted-foreground hover:text-primary">News</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Services</h4>
                <ul className="space-y-2">
                  <li><Link href="/services/ai" className="text-muted-foreground hover:text-primary">AI Solutions</Link></li>
                  <li><Link href="/services/cloud" className="text-muted-foreground hover:text-primary">Cloud Services</Link></li>
                  <li><Link href="/services/consulting" className="text-muted-foreground hover:text-primary">Consulting</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Connect</h4>
                <ul className="space-y-2">
                  <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
                  <li><Link href="/support" className="text-muted-foreground hover:text-primary">Support</Link></li>
                  <li><Link href="/social" className="text-muted-foreground hover:text-primary">Social Media</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground mb-4 md:mb-0">
              © 2025 FutureTech. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/terms" className="text-muted-foreground hover:text-primary">
                Terms
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                Privacy
              </Link>
              <Link href="/cookies" className="text-muted-foreground hover:text-primary">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;