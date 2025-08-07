import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  MessageSquare, 
  Plus, 
  Edit3, 
  Trash2, 
  Download, 
  LogOut,
  Heart,
  Eye,
  Calendar,
  Phone,
  Mail
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('contacts');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Sample contact submissions - in real app this would come from backend
  const [contactSubmissions] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      message: 'I need nursing care for my elderly mother who recently had hip surgery.',
      submittedAt: '2024-01-15T10:30:00Z',
      status: 'new'
    },
    {
      id: 2,
      name: 'Mary Johnson',
      email: 'mary.j@email.com',
      phone: '(555) 987-6543',
      message: 'Looking for pediatric nursing care for my son with special needs.',
      submittedAt: '2024-01-14T14:20:00Z',
      status: 'reviewed'
    },
    {
      id: 3,
      name: 'Robert Davis',
      email: 'robert.davis@email.com',
      phone: '(555) 456-7890',
      message: 'Need post-surgical care following my heart procedure.',
      submittedAt: '2024-01-13T09:15:00Z',
      status: 'contacted'
    }
  ]);

  // Sample staff data - in real app this would come from backend
  const [staffMembers, setStaffMembers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Registered Nurse',
      photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
      specialties: ['Elderly Care', 'Chronic Disease Management'],
      experience: '8 years',
      addedAt: '2024-01-10T00:00:00Z'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Licensed Practical Nurse',
      photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
      specialties: ['Post-Surgical Care', 'Wound Care'],
      experience: '6 years',
      addedAt: '2024-01-08T00:00:00Z'
    }
  ]);

  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    role: '',
    photo: '',
    specialties: '',
    experience: ''
  });

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/admin');
  };

  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.role || !newStaff.experience) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const staff = {
      id: Date.now(),
      ...newStaff,
      specialties: newStaff.specialties.split(',').map(s => s.trim()),
      photo: newStaff.photo || `https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face`,
      addedAt: new Date().toISOString()
    };

    setStaffMembers(prev => [...prev, staff]);
    setNewStaff({ name: '', role: '', photo: '', specialties: '', experience: '' });
    setShowAddStaffModal(false);
    
    toast({
      title: "Staff Added",
      description: "New staff member has been added successfully.",
    });
  };

  const handleDeleteStaff = (id: number) => {
    setStaffMembers(prev => prev.filter(staff => staff.id !== id));
    toast({
      title: "Staff Removed",
      description: "Staff member has been removed from the system.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      new: 'bg-red-100 text-red-800',
      reviewed: 'bg-yellow-100 text-yellow-800',
      contacted: 'bg-green-100 text-green-800'
    };
    return styles[status as keyof typeof styles] || styles.new;
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <header className="bg-white shadow-[var(--shadow-medium)] border-b border-border">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-xl">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">CareConnect Admin</h1>
                <p className="text-muted-foreground">Dashboard & Management System</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="btn-secondary flex items-center space-x-2"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-[var(--shadow-medium)] mb-8">
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'contacts'
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <MessageSquare className="h-5 w-5 inline mr-2" />
              Contact Submissions ({contactSubmissions.length})
            </button>
            <button
              onClick={() => setActiveTab('staff')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'staff'
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Users className="h-5 w-5 inline mr-2" />
              Staff Management ({staffMembers.length})
            </button>
          </div>
        </div>

        {/* Contact Submissions Tab */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-2xl shadow-[var(--shadow-medium)] overflow-hidden">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">Contact Form Submissions</h2>
                <button className="btn-secondary flex items-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              {contactSubmissions.length > 0 ? (
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-6 py-4 font-medium text-foreground">Contact Info</th>
                      <th className="text-left px-6 py-4 font-medium text-foreground">Message</th>
                      <th className="text-left px-6 py-4 font-medium text-foreground">Status</th>
                      <th className="text-left px-6 py-4 font-medium text-foreground">Submitted</th>
                      <th className="text-left px-6 py-4 font-medium text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactSubmissions.map((submission) => (
                      <tr key={submission.id} className="border-t border-border hover:bg-muted/20">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-foreground">{submission.name}</p>
                            <p className="text-sm text-muted-foreground flex items-center">
                              <Mail className="h-4 w-4 mr-1" />
                              {submission.email}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center">
                              <Phone className="h-4 w-4 mr-1" />
                              {submission.phone}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-muted-foreground max-w-md">
                            {submission.message}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(submission.status)}`}>
                            {submission.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-muted-foreground flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(submission.submittedAt)}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-12 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No contact submissions yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Staff Management Tab */}
        {activeTab === 'staff' && (
          <div className="bg-white rounded-2xl shadow-[var(--shadow-medium)] overflow-hidden">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">Staff Management</h2>
                <button
                  onClick={() => setShowAddStaffModal(true)}
                  className="btn-hero flex items-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Staff Member</span>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {staffMembers.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {staffMembers.map((staff) => (
                    <div key={staff.id} className="card-service group">
                      <div className="relative mb-4">
                        <img 
                          src={staff.photo} 
                          alt={staff.name}
                          className="w-20 h-20 rounded-full mx-auto object-cover shadow-[var(--shadow-medium)]"
                        />
                        <div className="absolute top-0 right-0 flex space-x-1">
                          <button className="p-1 bg-white shadow-lg rounded-full text-primary hover:bg-primary hover:text-white transition-colors">
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteStaff(staff.id)}
                            className="p-1 bg-white shadow-lg rounded-full text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <h3 className="font-bold text-foreground mb-1">{staff.name}</h3>
                        <p className="text-primary font-medium mb-2">{staff.role}</p>
                        <p className="text-sm text-muted-foreground mb-3">{staff.experience} experience</p>
                        
                        <div className="flex flex-wrap gap-1 justify-center">
                          {staff.specialties.map((specialty, idx) => (
                            <span 
                              key={idx}
                              className="bg-primary/10 text-primary px-2 py-1 rounded text-xs"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No staff members added yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add Staff Modal */}
        {showAddStaffModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-[var(--shadow-large)] max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-foreground mb-6">Add New Staff Member</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
                  <input
                    type="text"
                    value={newStaff.name}
                    onChange={(e) => setNewStaff(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Enter staff name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Role *</label>
                  <input
                    type="text"
                    value={newStaff.role}
                    onChange={(e) => setNewStaff(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="e.g., Registered Nurse"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Photo URL</label>
                  <input
                    type="url"
                    value={newStaff.photo}
                    onChange={(e) => setNewStaff(prev => ({ ...prev, photo: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Experience *</label>
                  <input
                    type="text"
                    value={newStaff.experience}
                    onChange={(e) => setNewStaff(prev => ({ ...prev, experience: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="e.g., 5 years"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Specialties</label>
                  <input
                    type="text"
                    value={newStaff.specialties}
                    onChange={(e) => setNewStaff(prev => ({ ...prev, specialties: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Elderly Care, Wound Care (comma separated)"
                  />
                </div>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => setShowAddStaffModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddStaff}
                  className="flex-1 btn-hero"
                >
                  Add Staff
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;