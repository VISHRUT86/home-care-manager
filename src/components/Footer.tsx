import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About Us' },
    { href: '#services', label: 'Our Services' },
    { href: '#staff', label: 'Our Team' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' }
  ];

  const services = [
    'Elderly Care',
    'Post-Surgical Care',
    'Chronic Disease Management',
    'Pediatric Care',
    'Home Health Care',
    'Personal Care Services'
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-white/20 p-2 rounded-xl">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">CareConnect</h3>
                <p className="text-white/80 text-sm">Professional Nursing</p>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed mb-6">
              Providing compassionate, professional nursing care in the comfort of your home. 
              Your health and well-being are our top priorities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/80 hover:text-white transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-white/80">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Information</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-white/80 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">(555) 123-4567</p>
                  <p className="text-white/80 text-sm">24/7 Emergency Support</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-white/80 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">care@careconnect.com</p>
                  <p className="text-white/80 text-sm">General inquiries</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-white/80 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Greater Metro Area</p>
                  <p className="text-white/80 text-sm">Serving 50+ mile radius</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/80 text-sm">
              © {currentYear} CareConnect Nursing Services. All rights reserved.
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                HIPAA Compliance
              </a>
              <a href="/admin" className="text-white/80 hover:text-white transition-colors">
                Admin Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;