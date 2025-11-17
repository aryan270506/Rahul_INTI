import React, { useState, useEffect } from 'react';
import { Search, Mail, Phone, MapPin, Calendar, Users, Plus, X, Trash2, AlertCircle } from 'lucide-react';

const StudyTour = () => {
  const API_BASE_URL = 'http://localhost:3001';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('All');
  const [tourList, setTourList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    tourName: '',
    destination: '',
    university: '',
    program: '',
    duration: '',
    startDate: '',
    cost: '',
    spotsAvailable: '',
    focusAreas: '',
    contactEmail: '',
    contactPhone: '',
    image: '',
    highlights: ''
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
    tourGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '1.5rem'
    },
    tourCard: {
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
    tourImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s'
    },
    cardBody: {
      padding: '1.5rem'
    },
    tourName: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    universityName: {
      color: '#2563eb',
      fontWeight: '600',
      marginBottom: '0.5rem'
    },
    destination: {
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
    programName: {
      fontWeight: '600',
      color: '#1f2937',
      fontSize: '0.875rem'
    },
    duration: {
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
    highlightsContainer: {
      marginTop: '1rem'
    },
    highlightList: {
      fontSize: '0.875rem',
      color: '#6b7280',
      margin: '0.5rem 0 0 1rem',
      padding: 0
    },
    highlightItem: {
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

  // Fetch study tours from backend
  useEffect(() => {
    fetchStudyTours();
  }, []);

  const fetchStudyTours = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/studytours`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch study tours');
      }
      
      const tours = await response.json();
      setTourList(tours);
    } catch (err) {
      setError('Error connecting to server. Make sure the backend is running on port 3001.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const destinations = ['All', ...new Set(tourList.map(t => t.destination))];

  const filteredTours = tourList.filter(tour => {
    const matchesSearch = tour.tourName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.program.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDestination = selectedDestination === 'All' || tour.destination === selectedDestination;
    return matchesSearch && matchesDestination;
  });

  const handleOpenModal = (tour = null) => {
    if (tour) {
      setEditingTour(tour);
      setFormData({
        ...tour,
        highlights: Array.isArray(tour.highlights) ? tour.highlights.join(', ') : tour.highlights,
        spotsAvailable: tour.spotsAvailable || ''
      });
    } else {
      setEditingTour(null);
      setFormData({
        tourName: '',
        destination: '',
        university: '',
        program: '',
        duration: '',
        startDate: '',
        cost: '',
        spotsAvailable: '',
        focusAreas: '',
        contactEmail: '',
        contactPhone: '',
        image: '',
        highlights: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTour(null);
    setFormData({
      tourName: '',
      destination: '',
      university: '',
      program: '',
      duration: '',
      startDate: '',
      cost: '',
      spotsAvailable: '',
      focusAreas: '',
      contactEmail: '',
      contactPhone: '',
      image: '',
      highlights: ''
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
    if (!formData.tourName || !formData.destination || !formData.university) {
      alert('Please fill in all required fields (Tour Name, Destination, University)');
      return;
    }

    try {
      setSubmitting(true);
      const tourData = {
        ...formData,
        spotsAvailable: parseInt(formData.spotsAvailable) || 0,
        highlights: formData.highlights.split(',').map(h => h.trim()).filter(h => h)
      };

      let response;
      if (editingTour) {
        // Update existing tour
        response = await fetch(`${API_BASE_URL}/api/studytours/${editingTour._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(tourData)
        });
      } else {
        // Add new tour
        response = await fetch(`${API_BASE_URL}/api/studytours`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(tourData)
        });
      }

      if (!response.ok) {
        throw new Error('Failed to save study tour');
      }

      // Refresh the tour list
      await fetchStudyTours();
      handleCloseModal();
      alert(editingTour ? 'Study tour updated successfully!' : 'Study tour added successfully!');
    } catch (error) {
      console.error('Error saving study tour:', error);
      alert('Failed to save study tour. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this study tour?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/studytours/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete study tour');
      }

      // Refresh the tour list
      await fetchStudyTours();
      alert('Study tour deleted successfully!');
    } catch (error) {
      console.error('Error deleting study tour:', error);
      alert('Failed to delete study tour. Please try again.');
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Study Tour Programs</h1>
          <p style={styles.headerSubtitle}>Global learning experiences for students</p>
        </div>
        <div style={styles.contentContainer}>
          <div style={styles.loadingSpinner}>
            Loading study tours...
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
          Add Tour
        </button>
        <h1 style={styles.headerTitle}>Study Tour Programs</h1>
        <p style={styles.headerSubtitle}>Global learning experiences for students</p>
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
                placeholder="Search by tour name, university, destination, or program..."
                style={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
            <select
              style={styles.filterSelect}
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            >
              {destinations.map(dest => (
                <option key={dest} value={dest}>{dest}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={styles.tourGrid}>
          {filteredTours.map(tour => (
            <div 
              key={tour._id} 
              style={styles.tourCard}
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
                  src={tour.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop'}
                  alt={tour.tourName}
                  style={styles.tourImage}
                />
              </div>

              <div style={styles.cardBody}>
                <h3 style={styles.tourName}>{tour.tourName}</h3>
                <p style={styles.universityName}>{tour.university}</p>
                <p style={styles.destination}>{tour.destination}</p>

                <div style={styles.detailRow}>
                  <MapPin color="#9333ea" size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <p style={styles.detailText}>{tour.program}</p>
                </div>

                <div style={styles.detailRow}>
                  <Calendar color="#3b82f6" size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <p style={styles.programName}>{tour.duration}</p>
                    <p style={styles.duration}>Starts: {tour.startDate}</p>
                  </div>
                </div>

                <div style={styles.statsContainer}>
                  <div style={styles.statBox}>
                    <div style={styles.statNumber}>{tour.cost}</div>
                    <div style={styles.statLabel}>Program Cost</div>
                  </div>
                  <div style={{...styles.statBox, borderLeft: '1px solid #e5e7eb'}}>
                    <div style={{...styles.statNumber, color: '#9333ea'}}>{tour.spotsAvailable}</div>
                    <div style={styles.statLabel}>Spots Available</div>
                  </div>
                </div>

                <div style={styles.highlightsContainer}>
                  <div style={styles.detailRow}>
                    <Users color="#3b82f6" size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <p style={styles.detailText}>Focus Areas: {tour.focusAreas}</p>
                  </div>
                  <ul style={styles.highlightList}>
                    {tour.highlights && tour.highlights.map((highlight, index) => (
                      <li key={index} style={styles.highlightItem}>• {highlight}</li>
                    ))}
                  </ul>
                </div>

                <div style={styles.contactInfo}>
                  <a 
                    href={`mailto:${tour.contactEmail}`} 
                    style={styles.contactLink}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
                  >
                    <Mail size={16} />
                    <span style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>{tour.contactEmail}</span>
                  </a>
                  <a 
                    href={`tel:${tour.contactPhone}`} 
                    style={styles.contactLink}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
                  >
                    <Phone size={16} />
                    <span>{tour.contactPhone}</span>
                  </a>
                </div>

                <button 
                  style={styles.viewDetailsBtn}
                  onClick={() => handleOpenModal(tour)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(90deg, #1d4ed8 0%, #7e22ce 100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(90deg, #2563eb 0%, #9333ea 100%)';
                  }}
                >
                  Edit Tour
                </button>

                <button 
                  style={styles.deleteButton}
                  onClick={() => handleDelete(tour._id)}
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

        {filteredTours.length === 0 && (
          <div style={styles.noResults}>
            No study tours found matching your criteria.
          </div>
        )}
      </div>

      {showModal && (
        <div style={styles.modal} onClick={handleCloseModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingTour ? 'Edit Study Tour' : 'Add New Study Tour'}
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
                <label style={styles.label}>Tour Image</label>
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
                <label style={styles.label}>Tour Name *</label>
                <input
                  type="text"
                  name="tourName"
                  value={formData.tourName}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Silicon Valley Tech Immersion"
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
                  placeholder="California, USA"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>University *</label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Stanford University"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Program</label>
                <input
                  type="text"
                  name="program"
                  value={formData.program}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Technology & Innovation Program"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="2 Weeks"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Start Date</label>
                <input
                  type="text"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="June 15, 2025"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Cost</label>
                <input
                  type="text"
                  name="cost"
                  value={formData.cost}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="$3,500"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Spots Available</label>
                <input
                  type="number"
                  name="spotsAvailable"
                  value={formData.spotsAvailable}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="25"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Focus Areas</label>
                <textarea
                  name="focusAreas"
                  value={formData.focusAreas}
                  onChange={handleInputChange}
                  style={styles.textarea}
                  placeholder="AI, Entrepreneurship, Software Engineering"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Highlights (comma separated)</label>
                <textarea
                  name="highlights"
                  value={formData.highlights}
                  onChange={handleInputChange}
                  style={styles.textarea}
                  placeholder="Tech company visits, Startup workshops, Industry networking"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Contact Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="tech.tours@university.edu"
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
                {submitting ? 'Saving...' : (editingTour ? 'Update' : 'Add')} Tour
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyTour;