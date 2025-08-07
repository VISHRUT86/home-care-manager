import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import heroImage from '@/assets/hero-nursing.jpg';

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Professional nursing care" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-accent/80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8">
            <div className="fade-in">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Compassionate
                <span className="block text-accent-soft">Nursing Care</span>
                <span className="block text-3xl md:text-4xl lg:text-5xl font-semibold mt-2">
                  You Can Trust
                </span>
              </h1>
            </div>
            
            <div className="fade-in" style={{ animationDelay: '0.2s' }}>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl">
                Providing professional, personalized healthcare services in the comfort of your home. 
                Our certified nurses are dedicated to your well-being and recovery.
              </p>
            </div>

            <div className="fade-in flex flex-col sm:flex-row gap-4" style={{ animationDelay: '0.4s' }}>
              <button 
                onClick={scrollToContact}
                className="btn-hero group"
              >
                Contact Us Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-secondary">
                Learn More About Our Services
              </button>
            </div>

            {/* Quick Contact Info */}
            <div className="fade-in grid md:grid-cols-3 gap-6 pt-8" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center space-x-3 text-white/90">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">24/7 Support</p>
                  <p className="text-sm">(555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-white/90">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email Us</p>
                  <p className="text-sm">care@careconnect.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-white/90">
                <div className="bg-white/20 p-2 rounded-lg">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Service Area</p>
                  <p className="text-sm">Greater Metro Area</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="fade-in lg:block" style={{ animationDelay: '0.8s' }}>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Why Choose Us?</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent-soft">10+</div>
                  <div className="text-white/80 text-sm">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent-soft">500+</div>
                  <div className="text-white/80 text-sm">Happy Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent-soft">24/7</div>
                  <div className="text-white/80 text-sm">Available</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent-soft">100%</div>
                  <div className="text-white/80 text-sm">Licensed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;