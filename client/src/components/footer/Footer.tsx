import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-sidebar text-sidebar-foreground py-12 px-4 shadow-lg border-t border-sidebar-border overflow-hidden animate__animated animate__fadeInUp animate__faster">
      {/* Glowing background overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-tr from-primary/60 via-accent/40 to-secondary/50 blur-2xl" />

      <div className="relative z-10 container mx-auto text-center space-y-8">
        {/* Title */}
        <h2 className="text-3xl font-semibold tracking-wide animate__animated animate__fadeInDown animate__delay-1s">
          Umeed — Empowering Lives Through AI & Compassion ❤️
        </h2>

        {/* Description */}
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          &copy; {new Date().getFullYear()} Umeed. Revolutionizing healthcare with AI-driven solutions, making life-saving connections between blood donors and those in need.
        </p>

        {/* Navigation Links */}
        <nav className="flex justify-center flex-wrap gap-6 text-sm font-medium">
          {[
            { name: "About Us", href: "/about" },
            { name: "Contact", href: "/contact" },
            { name: "Privacy Policy", href: "/privacy-policy" },
            { name: "Terms of Service", href: "/terms-of-service" },
          ].map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-primary hover:text-primary-foreground hover:underline underline-offset-4 transition duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Tagline */}
        <p className="text-xs text-muted-foreground italic">
          Built with 💉 + ❤️ by the Umeed Team — for a smarter, healthier future.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
