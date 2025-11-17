import React, { useState, useEffect } from 'react';
import { Search, Mail, Phone, BookOpen, Globe, Plus, X, Trash2, AlertCircle } from 'lucide-react';

const FacultyExchange = () => {
  const API_BASE_URL = 'http://localhost:3001';
  
  const [facultyList, setFacultyList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    position: '',
    specialization: '',
    email: '',
    phone: '',
    image: '',
    exchangeProgram: '',
    duration: '',
    publications: '',
    experience: ''
  });

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0f2fe 0%, #ffffff 50%, #fae8ff 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
    },
    header: {
      background: 'linear-gradient(90deg, #2563eb 0%, #9333ea 100%)',
      color: 'white',
      padding: '4rem 1.5rem',
      textAlign: 'center',
      position: 'relative'
    },
    addButton: {
      position: 'absolute',
      top: '2rem',
      right: '2rem',
      padding: '0.75rem 1.5rem',
      background: 'white',
      color: '#2563eb',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    headerTitle: {
      fontSize: '3rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      margin: 0
    },
    headerSubtitle: {
      fontSize: '1.25rem',
      color: '#bfdbfe',
      margin: 0
    },
    contentContainer: {
      maxWidth: '1280px',
      margin: '-2rem auto 0',
      padding: '0 1.5rem 3rem'
    },
    searchSection: {
      background: 'white',
      borderRadius: '1rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      padding: '1.5rem',
      marginBottom: '2rem'
    },
    searchControls: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    },
    searchBox: {
      flex: 1,
      minWidth: '250px',
      position: 'relative'
    },
    searchIcon: {
      position: 'absolute',
      left: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af',
      pointerEvents: 'none'
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem 1rem 0.75rem 2.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.3s'
    },
    filterSelect: {
      padding: '0.75rem 1.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      background: 'white',
      cursor: 'pointer',
      outline: 'none',
      transition: 'all 0.3s'
    },
    facultyGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '1.5rem'
    },
    facultyCard: {
      background: 'white',
      borderRadius: '1rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      transition: 'all 0.3s',
      cursor: 'pointer'
    },
    cardHeader: {
      background: 'linear-gradient(90deg, #3b82f6 0%, #a855f7 100%)',
      height: '8rem',
      position: 'relative'
    },
    profileImage: {
      width: '6rem',
      height: '6rem',
      borderRadius: '50%',
      border: '4px solid white',
      position: 'absolute',
      bottom: '-3rem',
      left: '1.5rem',
      objectFit: 'cover'
    },
    cardBody: {
      padding: '4rem 1.5rem 1.5rem'
    },
    facultyName: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '0.25rem'
    },
    facultyPosition: {
      color: '#2563eb',
      fontWeight: '600',
      marginBottom: '0.25rem'
    },
    facultyDepartment: {
      color: '#6b7280',
      fontSize: '0.875rem',
      marginBottom: '1rem'
    },
    detailRow: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '0.75rem',
      alignItems: 'flex-start'
    },
    detailText: {
      fontSize: '0.875rem',
      color: '#374151'
    },
    exchangeProgram: {
      fontWeight: '600',
      color: '#1f2937',
      fontSize: '0.875rem'
    },
    exchangeDuration: {
      fontSize: '0.75rem',
      color: '#6b7280'
    },
    statsContainer: {
      display: 'flex',
      gap: '1rem',
      padding: '1rem 0',
      margin: '1rem 0',
      borderTop: '1px solid #e5e7eb'
    },
    statBox: {
      flex: 1,
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#2563eb'
    },
    statLabel: {
      fontSize: '0.75rem',
      color: '#6b7280',
      marginTop: '0.25rem'
    },
    contactInfo: {
      marginTop: '1rem'
    },
    contactLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#6b7280',
      textDecoration: 'none',
      fontSize: '0.875rem',
      marginBottom: '0.5rem',
      transition: 'color 0.3s'
    },
    viewProfileBtn: {
      width: '100%',
      padding: '0.5rem',
      marginTop: '1rem',
      background: 'linear-gradient(90deg, #2563eb 0%, #9333ea 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    deleteButton: {
      width: '100%',
      padding: '0.5rem',
      marginTop: '0.5rem',
      background: '#ef4444',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    noResults: {
      textAlign: 'center',
      padding: '3rem',
      color: '#6b7280',
      fontSize: '1.125rem'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    },
    modalContent: {
      background: 'white',
      borderRadius: '1rem',
      maxWidth: '600px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'auto',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    modalHeader: {
      padding: '1.5rem',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      background: 'white',
      zIndex: 1
    },
    modalTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: 0
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#6b7280',
      padding: '0.25rem',
      width: '2rem',
      height: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '0.25rem',
      transition: 'all 0.3s'
    },
    modalBody: {
      padding: '1.5rem'
    },
    formGroup: {
      marginBottom: '1.25rem'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '0.5rem'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.3s',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.3s',
      boxSizing: 'border-box',
      minHeight: '80px',
      resize: 'vertical'
    },
    modalFooter: {
      padding: '1.5rem',
      borderTop: '1px solid #e5e7eb',
      display: 'flex',
      gap: '1rem',
      justifyContent: 'flex-end',
      position: 'sticky',
      bottom: 0,
      background: 'white'
    },
    cancelButton: {
      padding: '0.75rem 1.5rem',
      background: 'white',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s',
      color: '#374151'
    },
    saveButton: {
      padding: '0.75rem 1.5rem',
      background: 'linear-gradient(90deg, #2563eb 0%, #9333ea 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    errorAlert: {
      background: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '0.5rem',
      padding: '1rem',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#991b1b'
    },
    loadingSpinner: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '3rem',
      fontSize: '1.125rem',
      color: '#6b7280'
    }
  };

  // Fetch all faculty on component mount
  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/faculty`);
      const result = await response.json();
      
      if (result.success) {
        setFacultyList(result.data);
      } else {
        setError('Failed to fetch faculty data');
      }
    } catch (err) {
      setError('Error connecting to server. Make sure the backend is running on port 3001.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const departments = ['All', ...new Set(facultyList.map(f => f.department))];

  const filteredFaculty = facultyList.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || faculty.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleOpenModal = (faculty = null) => {
    if (faculty) {
      setEditingFaculty(faculty);
      setFormData({
        name: faculty.name || '',
        department: faculty.department || '',
        position: faculty.position || '',
        specialization: faculty.specialization || '',
        email: faculty.email || '',
        phone: faculty.phone || '',
        image: faculty.image || '',
        exchangeProgram: faculty.exchangeProgram || '',
        duration: faculty.duration || '',
        publications: faculty.publications || '',
        experience: faculty.experience || ''
      });
    } else {
      setEditingFaculty(null);
      setFormData({
        name: '',
        department: '',
        position: '',
        specialization: '',
        email: '',
        phone: '',
        image: '',
        exchangeProgram: '',
        duration: '',
        publications: '',
        experience: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingFaculty(null);
    setFormData({
      name: '',
      department: '',
      position: '',
      specialization: '',
      email: '',
      phone: '',
      image: '',
      exchangeProgram: '',
      duration: '',
      publications: '',
      experience: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.department || !formData.email) {
      alert('Please fill in all required fields (Name, Department, Email)');
      return;
    }

    try {
      setSubmitting(true);
      const dataToSend = {
        ...formData,
        publications: parseInt(formData.publications) || 0
      };

      let response;
      if (editingFaculty) {
        // Update existing faculty
        response = await fetch(`${API_BASE_URL}/api/faculty/${editingFaculty._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend)
        });
      } else {
        // Create new faculty
        response = await fetch(`${API_BASE_URL}/api/faculty`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend)
        });
      }

      const result = await response.json();

      if (result.success) {
        // Refresh faculty list
        await fetchFaculty();
        handleCloseModal();
        alert(editingFaculty ? 'Faculty updated successfully!' : 'Faculty added successfully!');
      } else {
        alert(result.message || 'Operation failed');
      }
    } catch (err) {
      console.error('Save error:', err);
      alert('Error saving faculty. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this faculty member?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/faculty/${id}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (result.success) {
        await fetchFaculty();
        alert('Faculty deleted successfully!');
      } else {
        alert(result.message || 'Delete failed');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting faculty. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button 
          style={styles.addButton}
          onClick={() => handleOpenModal()}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f3f4f6';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <Plus size={20} />
          Add Faculty
        </button>
        <h1 style={styles.headerTitle}>Faculty Exchange Program</h1>
        <p style={styles.headerSubtitle}>Connecting excellence through international collaboration</p>
      </div>

      <div style={styles.contentContainer}>
        {error && (
          <div style={styles.errorAlert}>
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <div style={styles.searchSection}>
          <div style={styles.searchControls}>
            <div style={styles.searchBox}>
              <Search style={styles.searchIcon} size={20} />
              <input
                type="text"
                placeholder="Search by name, specialization, or department..."
                style={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
            <select
              style={styles.filterSelect}
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div style={styles.loadingSpinner}>Loading faculty data...</div>
        ) : (
          <>
            <div style={styles.facultyGrid}>
              {filteredFaculty.map(faculty => (
                <div 
                  key={faculty._id} 
                  style={styles.facultyCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={styles.cardHeader}>
                    <img
                      src={faculty.image || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop'}
                      alt={faculty.name}
                      style={styles.profileImage}
                    />
                  </div>

                  <div style={styles.cardBody}>
                    <h3 style={styles.facultyName}>{faculty.name}</h3>
                    <p style={styles.facultyPosition}>{faculty.position}</p>
                    <p style={styles.facultyDepartment}>{faculty.department}</p>

                    <div style={styles.detailRow}>
                      <BookOpen color="#9333ea" size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
                      <p style={styles.detailText}>{faculty.specialization}</p>
                    </div>

                    <div style={styles.detailRow}>
                      <Globe color="#3b82f6" size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <p style={styles.exchangeProgram}>{faculty.exchangeProgram}</p>
                        <p style={styles.exchangeDuration}>{faculty.duration}</p>
                      </div>
                    </div>

                    <div style={styles.statsContainer}>
                      <div style={styles.statBox}>
                        <div style={styles.statNumber}>{faculty.publications}</div>
                        <div style={styles.statLabel}>Publications</div>
                      </div>
                      <div style={{...styles.statBox, borderLeft: '1px solid #e5e7eb'}}>
                        <div style={{...styles.statNumber, color: '#9333ea'}}>{faculty.experience}</div>
                        <div style={styles.statLabel}>Experience</div>
                      </div>
                    </div>

                    <div style={styles.contactInfo}>
                      <a 
                        href={`mailto:${faculty.email}`} 
                        style={styles.contactLink}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
                      >
                        <Mail size={16} />
                        <span style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>{faculty.email}</span>
                      </a>
                      <a 
                        href={`tel:${faculty.phone}`} 
                        style={styles.contactLink}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
                      >
                        <Phone size={16} />
                        <span>{faculty.phone}</span>
                      </a>
                    </div>

                    <button 
                      style={styles.viewProfileBtn}
                      onClick={() => handleOpenModal(faculty)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(90deg, #1d4ed8 0%, #7e22ce 100%)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(90deg, #2563eb 0%, #9333ea 100%)';
                      }}
                    >
                      Edit Profile
                    </button>

                    <button 
                      style={styles.deleteButton}
                      onClick={() => handleDelete(faculty._id)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#dc2626';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#ef4444';
                      }}
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredFaculty.length === 0 && !loading && (
              <div style={styles.noResults}>
                No faculty members found matching your criteria.
              </div>
            )}
          </>
        )}
      </div>

      {showModal && (
        <div style={styles.modal} onClick={handleCloseModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingFaculty ? 'Edit Faculty Member' : 'Add New Faculty Member'}
              </h2>
              <button 
                style={styles.closeButton}
                onClick={handleCloseModal}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
              >
                <X size={24} />
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={styles.input}
                />
                {formData.image && (
                  <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '3px solid #e5e7eb'
                      }}
                    />
                  </div>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Dr. John Doe"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Department *</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Computer Science"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Position *</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Professor"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Specialization *</label>
                <textarea
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  style={styles.textarea}
                  placeholder="Artificial Intelligence & Machine Learning"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="john.doe@university.edu"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Exchange Program *</label>
                <input
                  type="text"
                  name="exchangeProgram"
                  value={formData.exchangeProgram}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="MIT Exchange Program"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Duration *</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Fall 2025"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Publications</label>
                <input
                  type="number"
                  name="publications"
                  value={formData.publications}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="45"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Experience *</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="15 years"
                  required
                />
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button 
                style={styles.cancelButton}
                onClick={handleCloseModal}
                disabled={submitting}
                onMouseEnter={(e) => !submitting && (e.currentTarget.style.background = '#f3f4f6')}
                onMouseLeave={(e) => !submitting && (e.currentTarget.style.background = 'white')}
              >
                Cancel
              </button>
              <button 
                style={{
                  ...styles.saveButton,
                  opacity: submitting ? 0.7 : 1,
                  cursor: submitting ? 'not-allowed' : 'pointer'
                }}
                onClick={handleSave}
                disabled={submitting}
                onMouseEnter={(e) => {
                  if (!submitting) {
                    e.currentTarget.style.background = 'linear-gradient(90deg, #1d4ed8 0%, #7e22ce 100%)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!submitting) {
                    e.currentTarget.style.background = 'linear-gradient(90deg, #2563eb 0%, #9333ea 100%)';
                  }
                }}
              >
                {submitting ? 'Saving...' : (editingFaculty ? 'Update' : 'Add')} Faculty
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyExchange;