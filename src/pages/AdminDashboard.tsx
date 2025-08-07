import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  Users, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Download,
  Search,
  Calendar,
  Badge,
  UserPlus,
  X
} from 'lucide-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Staff {
  id: string;
  name: string;
  position: string;
  department: string;
  bio: string;
  image_url: string;
  phone: string;
  email: string;
  years_experience: number;
  qualifications: string[];
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('contacts');
  const [staffMembers, setStaffMembers] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const navigate = useNavigate();
  const { admin, logout } = useAdminAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Redirect if not logged in
    if (!admin) {
      navigate('/admin');
      return;
    }
    fetchStaff();
  }, [admin, navigate]);

  const fetchStaff = async () => {
    try {
      const { data, error } = await supabase
        .from('staff')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setStaffMembers(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch staff members",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Sample data for contact submissions
  const contactSubmissions = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      message: "I need information about home healthcare services for my elderly mother.",
      status: "New",
      submittedAt: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      message: "Can you provide details about your physical therapy programs?",
      status: "Replied",
      submittedAt: "2024-01-14T14:22:00Z"
    },
    {
      id: 3,
      name: "Michael Davis",
      email: "m.davis@email.com",
      message: "I'm interested in your nursing services. What are your rates?",
      status: "In Progress",
      submittedAt: "2024-01-13T09:15:00Z"
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleAddStaff = async (staffData: any) => {
    try {
      const { data, error } = await supabase
        .from('staff')
        .insert({
          name: staffData.name,
          position: staffData.role,
          department: staffData.department || 'General',
          bio: staffData.bio || '',
          image_url: staffData.photoUrl,
          phone: staffData.phone || '',
          email: staffData.email || '',
          years_experience: parseInt(staffData.experience) || 0,
          qualifications: staffData.specialties.split(',').map((s: string) => s.trim()).filter(Boolean),
          display_order: staffMembers.length,
          is_active: true
        })
        .select()
        .single();

      if (error) throw error;

      setStaffMembers([...staffMembers, data]);
      setShowAddStaffModal(false);
      setNewStaffData({
        name: '',
        role: '',
        department: '',
        bio: '',
        photoUrl: '',
        phone: '',
        email: '',
        experience: '',
        specialties: ''
      });

      toast({
        title: "Success",
        description: "Staff member added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add staff member",
        variant: "destructive",
      });
    }
  };

  const handleDeleteStaff = async (staffId: string) => {
    try {
      const { error } = await supabase
        .from('staff')
        .delete()
        .eq('id', staffId);

      if (error) throw error;

      setStaffMembers(staffMembers.filter(staff => staff.id !== staffId));
      
      toast({
        title: "Success",
        description: "Staff member deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete staff member",
        variant: "destructive",
      });
    }
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
      'New': 'bg-red-100 text-red-800',
      'Replied': 'bg-yellow-100 text-yellow-800',
      'In Progress': 'bg-green-100 text-green-800'
    };
    return styles[status as keyof typeof styles] || styles['New'];
  };

  const [newStaffData, setNewStaffData] = useState({
    name: '',
    role: '',
    department: '',
    bio: '',
    photoUrl: '',
    phone: '',
    email: '',
    experience: '',
    specialties: ''
  });

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">CareConnect Admin</h1>
            <p className="text-sm text-muted-foreground">Welcome, {admin?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="flex border-b border-gray-200">
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

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Contact Submissions */}
          {activeTab === 'contacts' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Contact Submissions</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  <Download className="h-5 w-5" />
                  <span>Export Data</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-foreground">Name</th>
                      <th className="text-left px-4 py-3 font-medium text-foreground">Email</th>
                      <th className="text-left px-4 py-3 font-medium text-foreground">Message</th>
                      <th className="text-left px-4 py-3 font-medium text-foreground">Status</th>
                      <th className="text-left px-4 py-3 font-medium text-foreground">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactSubmissions.map((submission) => (
                      <tr key={submission.id} className="border-t border-gray-200">
                        <td className="px-4 py-3 text-foreground">{submission.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{submission.email}</td>
                        <td className="px-4 py-3 text-muted-foreground max-w-xs truncate">{submission.message}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(submission.status)}`}>
                            {submission.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{formatDate(submission.submittedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Staff Management */}
          {activeTab === 'staff' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Staff Management</h2>
                <button 
                  onClick={() => setShowAddStaffModal(true)}
                  className="flex items-center space-x-2 btn-primary"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Add Staff Member</span>
                </button>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                  <p className="mt-2 text-muted-foreground">Loading staff members...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {staffMembers.map((staff) => (
                    <div key={staff.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <img 
                          src={staff.image_url || '/api/placeholder/150/150'} 
                          alt={staff.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <button
                          onClick={() => handleDeleteStaff(staff.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <h3 className="font-semibold text-foreground mb-1">{staff.name}</h3>
                      <p className="text-primary font-medium mb-2">{staff.position}</p>
                      {staff.department && (
                        <p className="text-sm text-muted-foreground mb-1">{staff.department}</p>
                      )}
                      <p className="text-sm text-muted-foreground mb-3">{staff.years_experience} years experience</p>
                      
                      {staff.qualifications && staff.qualifications.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {staff.qualifications.map((qualification, index) => (
                            <span 
                              key={index}
                              className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded"
                            >
                              {qualification}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Add Staff Modal */}
        {showAddStaffModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-foreground">Add New Staff Member</h3>
                <button
                  onClick={() => setShowAddStaffModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleAddStaff(newStaffData);
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
                      <input
                        type="text"
                        value={newStaffData.name}
                        onChange={(e) => setNewStaffData({...newStaffData, name: e.target.value})}
                        className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Position *</label>
                      <input
                        type="text"
                        value={newStaffData.role}
                        onChange={(e) => setNewStaffData({...newStaffData, role: e.target.value})}
                        className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Department</label>
                      <input
                        type="text"
                        value={newStaffData.department}
                        onChange={(e) => setNewStaffData({...newStaffData, department: e.target.value})}
                        className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Experience (years)</label>
                      <input
                        type="number"
                        value={newStaffData.experience}
                        onChange={(e) => setNewStaffData({...newStaffData, experience: e.target.value})}
                        className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="5"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Photo URL</label>
                      <input
                        type="url"
                        value={newStaffData.photoUrl}
                        onChange={(e) => setNewStaffData({...newStaffData, photoUrl: e.target.value})}
                        className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                      <input
                        type="tel"
                        value={newStaffData.phone}
                        onChange={(e) => setNewStaffData({...newStaffData, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <input
                        type="email"
                        value={newStaffData.email}
                        onChange={(e) => setNewStaffData({...newStaffData, email: e.target.value})}
                        className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                      <textarea
                        value={newStaffData.bio}
                        onChange={(e) => setNewStaffData({...newStaffData, bio: e.target.value})}
                        className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        rows={3}
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">Qualifications</label>
                      <input
                        type="text"
                        value={newStaffData.specialties}
                        onChange={(e) => setNewStaffData({...newStaffData, specialties: e.target.value})}
                        className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Comma-separated qualifications"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowAddStaffModal(false)}
                      className="px-4 py-2 text-muted-foreground hover:text-foreground"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Add Staff
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;