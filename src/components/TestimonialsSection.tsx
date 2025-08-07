import { Star, Quote, Heart, User } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Margaret Thompson",
      age: 78,
      condition: "Post-hip surgery recovery",
      rating: 5,
      text: "The care I received from CareConnect was exceptional. Sarah, my nurse, was not only professional but genuinely caring. She helped me regain my confidence and independence after my surgery. I couldn't have asked for better care.",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Robert Martinez",
      age: 65,
      condition: "Diabetes management",
      rating: 5,
      text: "Managing my diabetes became so much easier with Maria's help. She taught me proper monitoring techniques and worked with my doctor to adjust my care plan. The peace of mind is invaluable.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Jennifer Chen",
      age: 42,
      condition: "Mother of pediatric patient",
      rating: 5,
      text: "Emily was wonderful with my 8-year-old son during his recovery. She made him feel comfortable and explained everything in terms he could understand. As a parent, having such a caring professional was a blessing.",
      photo: "https://images.unsplash.com/photo-1494790108755-2616c30d4e8c?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "William Davis",
      age: 82,
      condition: "Cardiac care",
      rating: 5,
      text: "After my heart procedure, I was nervous about being at home. The team at CareConnect gave me and my family such confidence. Their 24/7 availability meant we never felt alone in this journey.",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Linda Johnson",
      age: 55,
      condition: "Elderly parent care",
      rating: 5,
      text: "Finding quality care for my 85-year-old mother was challenging until we found CareConnect. David has been incredible - patient, kind, and professional. Mom actually looks forward to his visits!",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "Thomas Wilson",
      age: 59,
      condition: "Chronic pain management",
      rating: 5,
      text: "Living with chronic pain was affecting my whole family. Michael's expertise in pain management and his compassionate approach have given me my life back. I'm grateful every day for their service.",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index}
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section id="testimonials" className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 fade-in">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="h-4 w-4 mr-2" />
            Patient Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            What Our Patients
            <span className="text-primary block">Say About Us</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Real stories from real patients and families who have experienced our compassionate care firsthand.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="card-floating p-8 fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="relative">
                  <img 
                    src={testimonial.photo} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover shadow-[var(--shadow-medium)]"
                  />
                  <div className="absolute -top-1 -right-1 bg-primary w-6 h-6 rounded-full flex items-center justify-center">
                    <User className="h-3 w-3 text-white" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">Age {testimonial.age} • {testimonial.condition}</p>
                  <div className="flex space-x-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                
                <Quote className="h-8 w-8 text-primary/20 flex-shrink-0" />
              </div>
              
              <blockquote className="text-muted-foreground leading-relaxed italic">
                "{testimonial.text}"
              </blockquote>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="fade-in">
          <div className="bg-gradient-primary rounded-3xl p-8 md:p-12 text-white">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Patient Satisfaction Speaks Volumes</h3>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                Our commitment to excellence is reflected in the feedback we receive from patients and their families.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
                <div className="text-white/80 font-medium">Patient Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">4.9</div>
                <div className="text-white/80 font-medium">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
                <div className="text-white/80 font-medium">Happy Families</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
                <div className="text-white/80 font-medium">Would Recommend</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 fade-in">
          <div className="bg-white rounded-2xl shadow-[var(--shadow-large)] p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-4">Ready to Experience Quality Care?</h3>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied patients who have trusted us with their healthcare needs. 
              Let us create a personalized care plan for you or your loved one.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-hero"
              >
                Start Your Care Journey
              </button>
              <button 
                onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary"
              >
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;