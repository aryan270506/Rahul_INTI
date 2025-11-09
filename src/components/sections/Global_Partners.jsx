import React, { useState } from 'react';
import { Search, Mail, Phone, MapPin, Calendar, Users, Star, Plus, X, Trash2, Globe } from 'lucide-react';

const GlobalPartners = () => {
  const initialPartnersData = [
    {
      id: 1,
      institutionName: "Stanford University",
      country: "United States",
      partnershipType: "Strategic Alliance",
      establishedDate: "2018-03-15",
      partnershipLevel: "Platinum",
      status: "Active",
      focusAreas: "Technology, Business, Engineering",
      contactPerson: "Dr. Michael Chen",
      contactEmail: "global.partners@stanford.edu",
      contactPhone: "+1 (650) 123-4567",
      image: "https://images.unsplash.com/photo-1541336032412-2048a678540d?w=400&h=300&fit=crop",
      benefits: ["Student Exchange", "Joint Research", "Faculty Development", "Dual Degrees"],
      studentsExchanged: 245,
      jointProjects: 47
    },
    {
      id: 2,
      institutionName: "University of Cambridge",
      country: "United Kingdom",
      partnershipType: "Research Partnership",
      establishedDate: "2015-09-10",
      partnershipLevel: "Gold",
      status: "Active",
      focusAreas: "Science, Humanities, Medicine",
      contactPerson: "Prof. Sarah Wilkinson",
      contactEmail: "international@cam.ac.uk",
      contactPhone: "+44 1223 765432",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
      benefits: ["Research Collaboration", "PhD Cotutelle", "Conference Sponsorship"],
      studentsExchanged: 189,
      jointProjects: 63
    },
    {
      id: 3,
      institutionName: "National University of Singapore",
      country: "Singapore",
      partnershipType: "Comprehensive Partnership",
      establishedDate: "2019-06-22",
      partnershipLevel: "Platinum",
      status: "Active",
      focusAreas: "Business, Engineering, Computing",
      contactPerson: "Dr. Li Wei Ming",
      contactEmail: "global.relations@nus.edu.sg",
      contactPhone: "+65 6789 1234",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
      benefits: ["Student Mobility", "Joint Degrees", "Industry Projects"],
      studentsExchanged: 312,
      jointProjects: 89
    },
    {
      id: 4,
      institutionName: "Technical University of Munich",
      country: "Germany",
      partnershipType: "Engineering Alliance",
      establishedDate: "2016-11-05",
      partnershipLevel: "Gold",
      status: "Active",
      focusAreas: "Engineering, Technology, Innovation",
      contactPerson: "Prof. Hans Mueller",
      contactEmail: "partnerships@tum.de",
      contactPhone: "+49 89 289 12345",
      image: "https://images.unsplash.com/photo-1564059813745-7e62a5836ea3?w=400&h=300&fit=crop",
      benefits: ["Research Exchange", "Internship Programs", "Innovation Labs"],
      studentsExchanged: 176,
      jointProjects: 52
    },
    {
      id: 5,
      institutionName: "University of Tokyo",
      country: "Japan",
      partnershipType: "Academic Exchange",
      establishedDate: "2020-08-18",
      partnershipLevel: "Silver",
      status: "Active",
      focusAreas: "Robotics, AI, Cultural Studies",
      contactPerson: "Dr. Yuki Nakamura",
      contactEmail: "global.initiatives@u-tokyo.ac.jp",
      contactPhone: "+81 3 5841 1234",
      image: "https://images.unsplash.com/photo-1540959733332-8ab048c745f7?w=400&h=300&fit=crop",
      benefits: ["Student Exchange", "Cultural Programs", "Research Visits"],
      studentsExchanged: 98,
      jointProjects: 23
    },
    {
      id: 6,
      institutionName: "University of Sydney",
      country: "Australia",
      partnershipType: "Research Collaboration",
      establishedDate: "2017-04-30",
      partnershipLevel: "Gold",
      status: "Active",
      focusAreas: "Medicine, Environmental Science, Business",
      contactPerson: "Dr. Emily Watson",
      contactEmail: "global.partners@sydney.edu.au",
      contactPhone: "+61 2 9351 1234",
      image: "https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?w=400&h=300&fit=crop",
      benefits: ["Joint Research", "Faculty Exchange", "Summer Schools"],
      studentsExchanged: 201,
      jointProjects: 67
    },
    {
      id: 7,
      institutionName: "ETH Zurich",
      country: "Switzerland",
      partnershipType: "Technology Partnership",
      establishedDate: "2019-02-14",
      partnershipLevel: "Platinum",
      status: "Active",
      focusAreas: "Engineering, Computer Science, Physics",
      contactPerson: "Prof. Markus Fischer",
      contactEmail: "international@ethz.ch",
      contactPhone: "+41 44 632 1111",
      image: "https://images.unsplash.com/photo-1516549655669-df4e6d5fd181?w=400&h=300&fit=crop",
      benefits: ["Research Grants", "PhD Programs", "Innovation Center"],
      studentsExchanged: 134,
      jointProjects: 41
    },
    {
      id: 8,
      institutionName: "Seoul National University",
      country: "South Korea",
      partnershipType: "Cultural & Academic Exchange",
      establishedDate: "2021-07-08",
      partnershipLevel: "Silver",
      status: "Active",
      focusAreas: "Technology, Korean Studies, Business",
      contactPerson: "Dr. Park Min-ho",
      contactEmail: "global.office@snu.ac.kr",
      contactPhone: "+82 2 880 5114",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      benefits: ["Language Programs", "Student Exchange", "Joint Conferences"],
      studentsExchanged: 87,
      jointProjects: 19
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [partnersList, setPartnersList] = useState(initialPartnersData);
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [formData, setFormData] = useState({
    institutionName: '',
    country: '',
    partnershipType: '',
    establishedDate: '',
    partnershipLevel: '',
    status: '',
    focusAreas: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    image: '',
    benefits: '',
    studentsExchanged: '',
    jointProjects: ''
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
    partnersGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '1.5rem'
    },
    partnerCard: {
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
    partnerImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s'
    },
    levelBadge: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      padding: '0.25rem 0.75rem',
      borderRadius: '1rem',
      fontSize: '0.75rem',
      fontWeight: '600',
      textTransform: 'uppercase'
    },
    platinumBadge: {
      background: 'linear-gradient(45deg, #e5e7eb, #fbbf24)',
      color: '#92400e'
    },
    goldBadge: {
      background: 'linear-gradient(45deg, #fef3c7, #f59e0b)',
      color: '#92400e'
    },
    silverBadge: {
      background: 'linear-gradient(45deg, #f3f4f6, #9ca3af)',
      color: '#374151'
    },
    cardBody: {
      padding: '1.5rem'
    },
    institutionName: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    country: {
      color: '#2563eb',
      fontWeight: '600',
      marginBottom: '0.5rem'
    },
    partnershipType: {
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
    focusAreas: {
      fontWeight: '600',
      color: '#1f2937',
      fontSize: '0.875rem'
    },
    establishedDate: {
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
    }
  };

  const countries = ['All', ...new Set(partnersList.map(p => p.country))];
  const partnershipLevels = ['All', 'Platinum', 'Gold', 'Silver'];

  const filteredPartners = partnersList.filter(partner => {
    const matchesSearch = partner.institutionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.focusAreas.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === 'All' || partner.country === selectedCountry;
    const matchesLevel = selectedLevel === 'All' || partner.partnershipLevel === selectedLevel;
    return matchesSearch && matchesCountry && matchesLevel;
  });

  const getLevelBadgeStyle = (level) => {
    switch (level) {
      case 'Platinum': return { ...styles.levelBadge, ...styles.platinumBadge };
      case 'Gold': return { ...styles.levelBadge, ...styles.goldBadge };
      case 'Silver': return { ...styles.levelBadge, ...styles.silverBadge };
      default: return styles.levelBadge;
    }
  };

  const handleOpenModal = (partner = null) => {
    if (partner) {
      setEditingPartner(partner);
      setFormData({
        ...partner,
        benefits: Array.isArray(partner.benefits) ? partner.benefits.join(', ') : partner.benefits
      });
    } else {
      setEditingPartner(null);
      setFormData({
        institutionName: '',
        country: '',
        partnershipType: '',
        establishedDate: '',
        partnershipLevel: 'Silver',
        status: 'Active',
        focusAreas: '',
        contactPerson: '',
        contactEmail: '',
        contactPhone: '',
        image: '',
        benefits: '',
        studentsExchanged: '',
        jointProjects: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPartner(null);
    setFormData({
      institutionName: '',
      country: '',
      partnershipType: '',
      establishedDate: '',
      partnershipLevel: 'Silver',
      status: 'Active',
      focusAreas: '',
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      image: '',
      benefits: '',
      studentsExchanged: '',
      jointProjects: ''
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

  const handleSave = () => {
    if (!formData.institutionName || !formData.country || !formData.contactEmail) {
      alert('Please fill in all required fields (Institution Name, Country, Contact Email)');
      return;
    }

    const partnerData = {
      ...formData,
      benefits: formData.benefits.split(',').map(b => b.trim()).filter(b => b),
      studentsExchanged: parseInt(formData.studentsExchanged) || 0,
      jointProjects: parseInt(formData.jointProjects) || 0
    };

    if (editingPartner) {
      // Update existing partner
      setPartnersList(prev => prev.map(p => 
        p.id === editingPartner.id ? { ...partnerData, id: p.id } : p
      ));
    } else {
      // Add new partner
      const newPartner = {
        ...partnerData,
        id: Math.max(...partnersList.map(p => p.id), 0) + 1
      };
      setPartnersList(prev => [...prev, newPartner]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this global partner?')) {
      setPartnersList(prev => prev.filter(p => p.id !== id));
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
          Add Partner
        </button>
        <h1 style={styles.headerTitle}>Global Partners Network</h1>
        <p style={styles.headerSubtitle}>Building international academic collaborations worldwide</p>
      </div>

      <div style={styles.contentContainer}>
        <div style={styles.searchSection}>
          <div style={styles.searchControls}>
            <div style={styles.searchBox}>
              <Search style={styles.searchIcon} size={20} />
              <input
                type="text"
                placeholder="Search by institution, country, or focus areas..."
                style={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
            <select
              style={styles.filterSelect}
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            >
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <select
              style={styles.filterSelect}
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            >
              {partnershipLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={styles.partnersGrid}>
          {filteredPartners.map(partner => (
            <div 
              key={partner.id} 
              style={styles.partnerCard}
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
                  src={partner.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop'}
                  alt={partner.institutionName}
                  style={styles.partnerImage}
                />
                <div style={getLevelBadgeStyle(partner.partnershipLevel)}>
                  <Star size={12} style={{ marginRight: '4px' }} />
                  {partner.partnershipLevel}
                </div>
              </div>

              <div style={styles.cardBody}>
                <h3 style={styles.institutionName}>{partner.institutionName}</h3>
                <p style={styles.country}>{partner.country}</p>
                <p style={styles.partnershipType}>{partner.partnershipType}</p>

                <div style={styles.detailRow}>
                  <MapPin color="#9333ea" size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <p style={styles.detailText}>{partner.focusAreas}</p>
                </div>

                <div style={styles.detailRow}>
                  <Calendar color="#3b82f6" size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <p style={styles.focusAreas}>Established: {partner.establishedDate}</p>
                    <p style={styles.establishedDate}>Status: {partner.status}</p>
                  </div>
                </div>

                <div style={styles.statsContainer}>
                  <div style={styles.statBox}>
                    <div style={styles.statNumber}>{partner.studentsExchanged}</div>
                    <div style={styles.statLabel}>Students Exchanged</div>
                  </div>
                  <div style={{...styles.statBox, borderLeft: '1px solid #e5e7eb'}}>
                    <div style={{...styles.statNumber, color: '#9333ea'}}>{partner.jointProjects}</div>
                    <div style={styles.statLabel}>Joint Projects</div>
                  </div>
                </div>

                <div style={styles.benefitsContainer}>
                  <div style={styles.detailRow}>
                    <Users color="#3b82f6" size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <p style={styles.detailText}>Partnership Benefits:</p>
                  </div>
                  <ul style={styles.benefitList}>
                    {partner.benefits && partner.benefits.map((benefit, index) => (
                      <li key={index} style={styles.benefitItem}>• {benefit}</li>
                    ))}
                  </ul>
                </div>

                <div style={styles.contactInfo}>
                  <a 
                    href={`mailto:${partner.contactEmail}`} 
                    style={styles.contactLink}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
                  >
                    <Mail size={16} />
                    <span style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>{partner.contactEmail}</span>
                  </a>
                  <a 
                    href={`tel:${partner.contactPhone}`} 
                    style={styles.contactLink}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
                  >
                    <Phone size={16} />
                    <span>{partner.contactPhone}</span>
                  </a>
                </div>

                <button 
                  style={styles.viewDetailsBtn}
                  onClick={() => handleOpenModal(partner)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(90deg, #1d4ed8 0%, #7e22ce 100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(90deg, #2563eb 0%, #9333ea 100%)';
                  }}
                >
                  Edit Partner
                </button>

                <button 
                  style={styles.deleteButton}
                  onClick={() => handleDelete(partner.id)}
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

        {filteredPartners.length === 0 && (
          <div style={styles.noResults}>
            No global partners found matching your criteria.
          </div>
        )}
      </div>

      {showModal && (
        <div style={styles.modal} onClick={handleCloseModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingPartner ? 'Edit Global Partner' : 'Add New Global Partner'}
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
                <label style={styles.label}>Institution Image</label>
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
                <label style={styles.label}>Institution Name *</label>
                <input
                  type="text"
                  name="institutionName"
                  value={formData.institutionName}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Stanford University"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Country *</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="United States"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Partnership Type</label>
                <input
                  type="text"
                  name="partnershipType"
                  value={formData.partnershipType}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Strategic Alliance"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Established Date</label>
                <input
                  type="date"
                  name="establishedDate"
                  value={formData.establishedDate}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Partnership Level</label>
                <select
                  name="partnershipLevel"
                  value={formData.partnershipLevel}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                >
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Platinum">Platinum</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Expired">Expired</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Focus Areas</label>
                <textarea
                  name="focusAreas"
                  value={formData.focusAreas}
                  onChange={handleInputChange}
                  style={styles.textarea}
                  placeholder="Technology, Business, Engineering"
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
                  placeholder="Student Exchange, Joint Research, Faculty Development"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Students Exchanged</label>
                <input
                  type="number"
                  name="studentsExchanged"
                  value={formData.studentsExchanged}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="245"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Joint Projects</label>
                <input
                  type="number"
                  name="jointProjects"
                  value={formData.jointProjects}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="47"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Contact Person</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Dr. Michael Chen"
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
                  placeholder="global.partners@stanford.edu"
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
                  placeholder="+1 (650) 123-4567"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button 
                style={styles.cancelButton}
                onClick={handleCloseModal}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
              >
                Cancel
              </button>
              <button 
                style={styles.saveButton}
                onClick={handleSave}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(90deg, #1d4ed8 0%, #7e22ce 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(90deg, #2563eb 0%, #9333ea 100%)';
                }}
              >
                {editingPartner ? 'Update' : 'Add'} Partner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalPartners;