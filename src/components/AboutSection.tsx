import { Heart, Shield, Users, Award, Clock, CheckCircle } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "We treat every patient with dignity, respect, and genuine compassion."
    },
    {
      icon: Shield,
      title: "Licensed Professionals",
      description: "All our nurses are fully licensed and continuously trained in best practices."
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock care when you need it most, including weekends and holidays."
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description: "Committed to the highest standards of healthcare delivery and patient satisfaction."
    }
  ];

  const values = [
    "Personalized care plans tailored to each patient",
    "Experienced and certified healthcare professionals",
    "Continuous monitoring and progress tracking",
    "Coordination with family members and physicians",
    "Emergency response protocols in place",
    "Affordable and flexible service options"
  ];

  return (
    <section id="about" className="section-padding bg-gradient-soft">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="fade-in">
              <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Users className="h-4 w-4 mr-2" />
                About CareConnect
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Your Trusted Partner in 
                <span className="text-primary block">Healthcare Excellence</span>
              </h2>
            </div>

            <div className="fade-in" style={{ animationDelay: '0.2s' }}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With over a decade of experience in healthcare, CareConnect has been providing exceptional 
                nursing services to families across our community. We understand that quality healthcare 
                should be accessible, compassionate, and tailored to each individual's unique needs.
              </p>
            </div>

            <div className="fade-in" style={{ animationDelay: '0.4s' }}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our team of dedicated professionals is committed to delivering the highest standard of care, 
                ensuring that patients can recover and thrive in the comfort of their own homes while 
                maintaining their independence and dignity.
              </p>
            </div>

            {/* Values List */}
            <div className="fade-in space-y-3" style={{ animationDelay: '0.6s' }}>
              <h3 className="text-xl font-semibold text-foreground mb-4">What Sets Us Apart:</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="card-service fade-in"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-20 fade-in">
          <div className="bg-white rounded-3xl shadow-[var(--shadow-large)] p-8 md:p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">Trusted by Hundreds of Families</h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our commitment to excellence has earned us the trust of patients and healthcare providers throughout the region.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground font-medium">Patients Served</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10+</div>
                <div className="text-muted-foreground font-medium">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground font-medium">Healthcare Professionals</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground font-medium">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;