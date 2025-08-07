import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - in real app this would connect to backend
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: "(555) 123-4567",
      description: "24/7 emergency support available"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "care@careconnect.com",
      description: "We respond within 2 hours"
    },
    {
      icon: MapPin,
      title: "Service Area",
      details: "Greater Metro Area",
      description: "Serving 50+ mile radius"
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: "Mon-Fri: 8AM-6PM",
      description: "Weekend appointments available"
    }
  ];

  return (
    <section id="contact" className="section-padding bg-gradient-soft">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 fade-in">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Phone className="h-4 w-4 mr-2" />
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Ready to Start Your
            <span className="text-primary block">Care Journey?</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Contact us today to discuss your healthcare needs. Our team is ready to create 
            a personalized care plan that's right for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="fade-in">
            <div className="bg-white rounded-3xl shadow-[var(--shadow-large)] p-8 md:p-10">
              <h3 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your care needs, when you'd like to start, and any specific requirements..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn-hero flex items-center justify-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
              
              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium text-foreground mb-1">Quick Response Guarantee</p>
                    <p>We'll contact you within 2 hours during business hours, or first thing the next business day.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <div 
                key={index} 
                className="card-floating p-6 fade-in"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                    <info.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-1">{info.title}</h4>
                    <p className="text-xl font-bold text-primary mb-2">{info.details}</p>
                    <p className="text-muted-foreground text-sm">{info.description}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Emergency Notice */}
            <div className="fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-red-800 mb-3">Medical Emergency?</h4>
                <p className="text-red-700 mb-4">
                  For immediate medical emergencies, please call 911 or go to your nearest emergency room.
                </p>
                <p className="text-red-600 text-sm">
                  For urgent but non-emergency care needs, call our 24/7 support line at (555) 123-4567.
                </p>
              </div>
            </div>

            {/* Service Areas */}
            <div className="fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="bg-white rounded-2xl shadow-[var(--shadow-medium)] p-6">
                <h4 className="text-lg font-semibold text-foreground mb-4">Service Areas</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Downtown Metro Area</p>
                  <p>• North Suburbs</p>
                  <p>• East Side Communities</p>
                  <p>• West End Neighborhoods</p>
                  <p>• Surrounding Counties</p>
                </div>
                <p className="text-xs text-muted-foreground mt-4 italic">
                  Don't see your area listed? Contact us - we may still be able to serve you!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;