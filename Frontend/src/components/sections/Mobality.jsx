import React, { useState, useEffect } from 'react';
import { Search, Mail, Phone, MapPin, Calendar, Users, Plane, GraduationCap, Plus, X, Trash2, AlertCircle } from 'lucide-react';

const MobilityManagement = () => {
  const API_BASE_URL = 'http://localhost:3001';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDestination, setSelectedDestination] = useState('All');
  const [mobilityList, setMobilityList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMobility, setEditingMobility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    programName: '',
    destination: '',
    programType: 'Student Exchange',
    duration: '',
    startDate: '',
    applicationDeadline: '',
    availableSlots: '',
    eligibility: '',
    funding: '',
    contactEmail: '',
    contactPhone: '',
    image: '',
    benefits: '',
    participants: ''
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
    mobilityGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '1.5rem'
    },
    mobilityCard: {
      background: 'white',
      borderRadius: '1rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      transition: 'all 0.3s',
      cursor: 'pointer'
    },
    cardHeader: {
      height: '12rem',
      position: 'relative',
      overflow: 'hidden'
    },
    programImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s'
    },
    typeBadge: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      padding: '0.25rem 0.75rem',
      borderRadius: '1rem',
      fontSize: '0.75rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      background: 'rgba(255, 255, 255, 0.9)',
      color: '#2563eb',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    cardBody: {
      padding: '1.5rem'
    },
    programName: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    destination: {
      color: '#2563eb',
      fontWeight: '600',
      marginBottom: '0.5rem'
    },
    programType: {
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
    duration: {
      fontWeight: '600',
      color: '#1f2937',
      fontSize: '0.875rem'
    },
    deadline: {
      fontSize: '0.75rem',
      color: '#dc2626',
      fontWeight: '600'
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
    eligibilityContainer: {
      marginTop: '1rem'
    },
    eligibilityList: {
      fontSize: '0.875rem',
      color: '#6b7280',
      margin: '0.5rem 0 0 1rem',
      padding: 0
    },
    eligibilityItem: {
      marginBottom: '0.25rem'
    },
    benefitsContainer: {
      marginTop: '1rem'
    },
    benefitList: {
      fontSize: '0.875rem',
      color: '#6b7280',
      margin: '0.5rem 0 0 1rem',
      padding: 0
    },
    benefitItem: {
      marginBottom: '0.25rem'
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
    viewDetailsBtn: {
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

  // Fetch mobility programs from backend
  useEffect(() => {
    fetchMobilityPrograms();
  }, []);

  const fetchMobilityPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/mobality`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch mobility programs');
      }
      
      const result = await response.json();
      setMobilityList(result.data || []);
    } catch (err) {
      setError('Error connecting to server. Make sure the backend is running on port 3001.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const programTypes = ['All', 'Student Exchange', 'Faculty Exchange', 'Research Internship', 'Industry Internship', 'Short-term Program', 'Language Program', 'Research Fellowship'];
  const destinations = ['All', ...new Set(mobilityList.map(m => m.destination))];

  const filteredMobility = mobilityList.filter(mobility => {
    const matchesSearch = mobility.programName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mobility.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mobility.programType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || mobility.programType === selectedType;
    const matchesDestination = selectedDestination === 'All' || mobility.destination === selectedDestination;
    return matchesSearch && matchesType && matchesDestination;
  });

  const getProgramIcon = (type) => {
    switch (type) {
      case 'Student Exchange': return <GraduationCap size={12} />;
      case 'Faculty Exchange': return <Users size={12} />;
      case 'Research Internship': return <Search size={12} />;
      case 'Industry Internship': return <MapPin size={12} />;
      default: return <Plane size={12} />;
    }
  };

  const handleOpenModal = (mobility = null) => {
    if (mobility) {
      setEditingMobility(mobility);
      setFormData({
        ...mobility,
        benefits: Array.isArray(mobility.benefits) ? mobility.benefits.join(', ') : mobility.benefits,
        startDate: mobility.startDate ? mobility.startDate.split('T')[0] : '',
        applicationDeadline: mobility.applicationDeadline ? mobility.applicationDeadline.split('T')[0] : '',
        availableSlots: mobility.availableSlots || '',
        participants: mobility.participants || ''
      });
    } else {
      setEditingMobility(null);
      setFormData({
        programName: '',
        destination: '',
        programType: 'Student Exchange',
        duration: '',
        startDate: '',
        applicationDeadline: '',
        availableSlots: '',
        eligibility: '',
        funding: '',
        contactEmail: '',
        contactPhone: '',
        image: '',
        benefits: '',
        participants: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMobility(null);
    setFormData({
      programName: '',
      destination: '',
      programType: 'Student Exchange',
      duration: '',
      startDate: '',
      applicationDeadline: '',
      availableSlots: '',
      eligibility: '',
      funding: '',
      contactEmail: '',
      contactPhone: '',
      image: '',
      benefits: '',
      participants: ''
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
    if (!formData.programName || !formData.destination || !formData.contactEmail) {
      alert('Please fill in all required fields (Program Name, Destination, Contact Email)');
      return;
    }

    try {
      setSubmitting(true);
      const mobilityData = {
        ...formData,
        benefits: formData.benefits.split(',').map(b => b.trim()).filter(b => b),
        availableSlots: parseInt(formData.availableSlots) || 0,
        participants: parseInt(formData.participants) || 0
      };

      let response;
      if (editingMobility) {
        // Update existing mobility program
        response = await fetch(`${API_BASE_URL}/api/mobality/${editingMobility._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mobilityData)
        });
      } else {
        // Add new mobility program
        response = await fetch(`${API_BASE_URL}/api/mobality`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mobilityData)
        });
      }

      if (!response.ok) {
        throw new Error('Failed to save mobility program');
      }

      // Refresh the mobility list
      await fetchMobilityPrograms();
      handleCloseModal();
      alert(editingMobility ? 'Mobility program updated successfully!' : 'Mobility program added successfully!');
    } catch (error) {
      console.error('Error saving mobility program:', error);
      alert('Failed to save mobility program. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this mobility program?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/mobality/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete mobility program');
      }

      // Refresh the mobility list
      await fetchMobilityPrograms();
      alert('Mobility program deleted successfully!');
    } catch (error) {
      console.error('Error deleting mobility program:', error);
      alert('Failed to delete mobility program. Please try again.');
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Mobility Programs</h1>
          <p style={styles.headerSubtitle}>Global learning opportunities for students and faculty</p>
        </div>
        <div style={styles.contentContainer}>
          <div style={styles.loadingSpinner}>
            Loading mobility programs...
          </div>
        </div>
      </div>
    );
  }

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
          Add Program
        </button>
        <h1 style={styles.headerTitle}>Mobility Programs</h1>
        <p style={styles.headerSubtitle}>Global learning opportunities for students and faculty</p>
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
                placeholder="Search by program name, destination, or type..."
                style={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
            <select
              style={styles.filterSelect}
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            >
              {programTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <select
              style={styles.filterSelect}
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            >
              {destinations.map(destination => (
                <option key={destination} value={destination}>{destination}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={styles.mobilityGrid}>
          {filteredMobility.map(mobility => (
            <div 
              key={mobility._id} 
              style={styles.mobilityCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                const image = e.currentTarget.querySelector('img');
                if (image) image.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
                const image = e.currentTarget.querySelector('img');
                if (image) image.style.transform = 'scale(1)';
              }}
            >
              <div style={styles.cardHeader}>
                <img
                  src={mobility.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop'}
                  alt={mobility.programName}
                  style={styles.programImage}
                />
                <div style={styles.typeBadge}>
                  {getProgramIcon(mobility.programType)}
                  {mobility.programType}
                </div>
              </div>

              <div style={styles.cardBody}>
                <h3 style={styles.programName}>{mobility.programName}</h3>
                <p style={styles.destination}>{mobility.destination}</p>
                <p style={styles.programType}>{mobility.funding}</p>

                <div style={styles.detailRow}>
                  <Calendar color="#9333ea" size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <p style={styles.duration}>{mobility.duration}</p>
                    <p style={styles.detailText}>Start: {new Date(mobility.startDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div style={styles.detailRow}>
                  <MapPin color="#3b82f6" size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <p style={styles.detailText}>Application Deadline:</p>
                    <p style={styles.deadline}>{new Date(mobility.applicationDeadline).toLocaleDateString()}</p>
                  </div>
                </div>

                <div style={styles.statsContainer}>
                  <div style={styles.statBox}>
                    <div style={styles.statNumber}>{mobility.availableSlots}</div>
                    <div style={styles.statLabel}>Available Slots</div>
                  </div>
                  <div style={{...styles.statBox, borderLeft: '1px solid #e5e7eb'}}>
                    <div style={{...styles.statNumber, color: '#9333ea'}}>{mobility.participants}</div>
                    <div style={styles.statLabel}>Past Participants</div>
                  </div>
                </div>

                <div style={styles.eligibilityContainer}>
                  <div style={styles.detailRow}>
                    <Users color="#3b82f6" size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <p style={styles.detailText}>Eligibility: {mobility.eligibility}</p>
                  </div>
                </div>

                <div style={styles.benefitsContainer}>
                  <ul style={styles.benefitList}>
                    {mobility.benefits && mobility.benefits.map((benefit, index) => (
                      <li key={index} style={styles.benefitItem}>• {benefit}</li>
                    ))}
                  </ul>
                </div>

                <div style={styles.contactInfo}>
                  <a 
                    href={`mailto:${mobility.contactEmail}`} 
                    style={styles.contactLink}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
                  >
                    <Mail size={16} />
                    <span style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>{mobility.contactEmail}</span>
                  </a>
                  <a 
                    href={`tel:${mobility.contactPhone}`} 
                    style={styles.contactLink}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
                  >
                    <Phone size={16} />
                    <span>{mobility.contactPhone}</span>
                  </a>
                </div>

                <button 
                  style={styles.viewDetailsBtn}
                  onClick={() => handleOpenModal(mobility)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(90deg, #1d4ed8 0%, #7e22ce 100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(90deg, #2563eb 0%, #9333ea 100%)';
                  }}
                >
                  Edit Program
                </button>

                <button 
                  style={styles.deleteButton}
                  onClick={() => handleDelete(mobility._id)}
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

        {filteredMobility.length === 0 && (
          <div style={styles.noResults}>
            No mobility programs found matching your criteria.
          </div>
        )}
      </div>

      {showModal && (
        <div style={styles.modal} onClick={handleCloseModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingMobility ? 'Edit Mobility Program' : 'Add New Mobility Program'}
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
                <label style={styles.label}>Program Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
                {formData.image && (
                  <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '0.5rem',
                        border: '3px solid #e5e7eb'
                      }}
                    />
                    <div style={{ marginTop: '0.5rem' }}>
                      <label 
                        htmlFor="change-image"
                        style={{
                          display: 'inline-block',
                          padding: '0.5rem 1rem',
                          background: '#f3f4f6',
                          color: '#374151',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
                      >
                        Change Image
                      </label>
                      <input
                        id="change-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Program Name *</label>
                <input
                  type="text"
                  name="programName"
                  value={formData.programName}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Semester Exchange Program"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Destination *</label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Stanford University, USA"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Program Type</label>
                <select
                  name="programType"
                  value={formData.programType}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                >
                  <option value="Student Exchange">Student Exchange</option>
                  <option value="Faculty Exchange">Faculty Exchange</option>
                  <option value="Research Internship">Research Internship</option>
                  <option value="Industry Internship">Industry Internship</option>
                  <option value="Short-term Program">Short-term Program</option>
                  <option value="Language Program">Language Program</option>
                  <option value="Research Fellowship">Research Fellowship</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="6 Months"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Application Deadline</label>
                <input
                  type="date"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Available Slots</label>
                <input
                  type="number"
                  name="availableSlots"
                  value={formData.availableSlots}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="15"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Eligibility Criteria</label>
                <textarea
                  name="eligibility"
                  value={formData.eligibility}
                  onChange={handleInputChange}
                  style={styles.textarea}
                  placeholder="GPA 3.0+, 2nd Year+"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Funding Information</label>
                <input
                  type="text"
                  name="funding"
                  value={formData.funding}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Partial Scholarship Available"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Benefits (comma separated)</label>
                <textarea
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleInputChange}
                  style={styles.textarea}
                  placeholder="Tuition Waiver, Credit Transfer, Housing Support"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Past Participants</label>
                <input
                  type="number"
                  name="participants"
                  value={formData.participants}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="45"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Contact Email *</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="exchange@university.edu"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Contact Phone</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="+1 (555) 123-4567"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
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
                {submitting ? 'Saving...' : (editingMobility ? 'Update' : 'Add')} Program
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobilityManagement;