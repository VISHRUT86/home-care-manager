import { 
  Heart, 
  Users, 
  Activity, 
  Stethoscope, 
  Baby, 
  Pill,
  Home,
  UserCheck,
  Clock,
  Shield
} from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Heart,
      title: "Elderly Care",
      description: "Comprehensive care for seniors including medication management, mobility assistance, and companionship.",
      features: ["Medication reminders", "Personal care assistance", "Companionship", "Safety monitoring"]
    },
    {
      icon: Activity,
      title: "Post-Surgical Care",
      description: "Professional recovery support following surgical procedures to ensure proper healing and comfort.",
      features: ["Wound care", "Pain management", "Recovery monitoring", "Mobility assistance"]
    },
    {
      icon: Stethoscope,
      title: "Chronic Disease Management",
      description: "Ongoing support for patients with chronic conditions like diabetes, hypertension, and heart disease.",
      features: ["Regular monitoring", "Treatment compliance", "Lifestyle guidance", "Emergency protocols"]
    },
    {
      icon: Baby,
      title: "Pediatric Care",
      description: "Specialized nursing care for children with medical needs in a comfortable home environment.",
      features: ["Child-friendly approach", "Family education", "Growth monitoring", "Immunization support"]
    },
    {
      icon: Home,
      title: "Home Health Care",
      description: "Complete healthcare services delivered in the comfort and privacy of your own home.",
      features: ["Medical assessments", "Treatment administration", "Health education", "Care coordination"]
    },
    {
      icon: UserCheck,
      title: "Personal Care Services",
      description: "Assistance with daily living activities to maintain independence and quality of life.",
      features: ["Bathing assistance", "Meal preparation", "Light housekeeping", "Transportation support"]
    }
  ];

  const additionalServices = [
    { icon: Pill, title: "Medication Management", description: "Expert oversight of medication schedules and compliance" },
    { icon: Clock, title: "24/7 Emergency Support", description: "Round-the-clock availability for urgent healthcare needs" },
    { icon: Shield, title: "Insurance Coordination", description: "Assistance with insurance claims and healthcare navigation" }
  ];

  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 fade-in">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Stethoscope className="h-4 w-4 mr-2" />
            Our Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Comprehensive Healthcare
            <span className="text-primary block">Services at Home</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            From routine care to specialized medical services, we provide professional nursing care 
            tailored to your specific needs and delivered with compassion.
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="card-service fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="h-8 w-8 text-primary" />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4">{service.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground text-sm">Key Features:</h4>
                <ul className="space-y-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="fade-in">
          <div className="bg-gradient-soft rounded-3xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">Additional Support Services</h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Beyond our core nursing services, we offer comprehensive support to ensure your complete well-being.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {additionalServices.map((service, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[var(--shadow-medium)]">
                    <service.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground mb-3">{service.title}</h4>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 fade-in">
          <div className="bg-white rounded-2xl shadow-[var(--shadow-large)] p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-4">Need a Custom Care Plan?</h3>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Every patient is unique. Let us create a personalized care plan that meets your specific needs and preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-hero"
              >
                Schedule a Consultation
              </button>
              <button className="btn-secondary">
                Learn More About Our Process
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;