import { useState, useEffect } from 'react';
import { Menu, X, Heart, Shield } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#staff', label: 'Our Staff' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-[var(--shadow-medium)]' 
        : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-xl">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">CareConnect</h1>
              <p className="text-xs text-muted-foreground">Professional Nursing</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-foreground hover:text-primary transition-colors duration-300 font-medium relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="btn-hero"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-[var(--shadow-medium)] border-t border-border">
            <div className="py-4 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="block w-full text-left px-6 py-3 text-foreground hover:bg-primary/5 hover:text-primary transition-colors duration-300 font-medium"
                >
                  {link.label}
                </button>
              ))}
              <div className="px-6 py-2">
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="btn-hero w-full text-center"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;