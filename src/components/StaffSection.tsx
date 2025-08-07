import { Users, Award, Star, Heart } from 'lucide-react';
import staffTeamImage from '@/assets/staff-team.jpg';

const StaffSection = () => {
  // Sample staff data - in real app this would come from backend
  const sampleStaff = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Registered Nurse",
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      specialties: ["Elderly Care", "Chronic Disease Management"],
      experience: "8 years"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Licensed Practical Nurse",
      photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      specialties: ["Post-Surgical Care", "Wound Care"],
      experience: "6 years"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Pediatric Nurse",
      photo: "https://images.unsplash.com/photo-1594824492314-d0b83e76e1b9?w=400&h=400&fit=crop&crop=face",
      specialties: ["Pediatric Care", "Family Education"],
      experience: "5 years"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Home Health Aide",
      photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
      specialties: ["Personal Care", "Medication Management"],
      experience: "4 years"
    },
    {
      id: 5,
      name: "Maria Garcia",
      role: "Registered Nurse",
      photo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=face",
      specialties: ["Cardiac Care", "Diabetes Management"],
      experience: "10 years"
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Certified Nursing Assistant",
      photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face",
      specialties: ["Mobility Assistance", "Companionship"],
      experience: "3 years"
    }
  ];

  return (
    <section id="staff" className="section-padding bg-gradient-soft">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 fade-in">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="h-4 w-4 mr-2" />
            Our Professional Team
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Meet Our Caring
            <span className="text-primary block">Healthcare Professionals</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Our team consists of highly qualified, licensed healthcare professionals who are passionate 
            about providing exceptional care with compassion and expertise.
          </p>
        </div>

        {/* Team Photo */}
        <div className="fade-in mb-16" style={{ animationDelay: '0.2s' }}>
          <div className="relative rounded-3xl overflow-hidden shadow-[var(--shadow-large)] max-w-4xl mx-auto">
            <img 
              src={staffTeamImage} 
              alt="Our healthcare team" 
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold mb-2">United in Care</h3>
              <p className="text-white/90">Dedicated professionals working together for your health</p>
            </div>
          </div>
        </div>

        {/* Staff Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {sampleStaff.map((staff, index) => (
            <div 
              key={staff.id} 
              className="card-floating p-6 text-center fade-in"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="relative mb-6">
                <img 
                  src={staff.photo} 
                  alt={staff.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover shadow-[var(--shadow-medium)]"
                />
                <div className="absolute -bottom-2 -right-2 bg-primary w-8 h-8 rounded-full flex items-center justify-center">
                  <Heart className="h-4 w-4 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-2">{staff.name}</h3>
              <p className="text-primary font-semibold mb-3">{staff.role}</p>
              
              <div className="flex items-center justify-center text-sm text-muted-foreground mb-4">
                <Award className="h-4 w-4 mr-1" />
                {staff.experience} experience
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Specialties:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {staff.specialties.map((specialty, idx) => (
                    <span 
                      key={idx}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Qualifications Section */}
        <div className="fade-in">
          <div className="bg-white rounded-3xl shadow-[var(--shadow-large)] p-8 md:p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">Team Qualifications & Standards</h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Every member of our team meets rigorous professional standards and maintains current certifications.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Licensed Professionals</h4>
                <p className="text-sm text-muted-foreground">All staff hold current state licenses</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Continuous Training</h4>
                <p className="text-sm text-muted-foreground">Regular education and skill updates</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Compassionate Care</h4>
                <p className="text-sm text-muted-foreground">Dedicated to patient well-being</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Team Approach</h4>
                <p className="text-sm text-muted-foreground">Collaborative care coordination</p>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Note */}
        <div className="mt-12 text-center fade-in">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 max-w-2xl mx-auto">
            <p className="text-muted-foreground">
              <strong>Note:</strong> Our staff directory is regularly updated through our admin panel. 
              New team members are added as they join our professional healthcare family.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaffSection;