// src/components/StudentForm.jsx
import React, { useState, useEffect } from 'react';
import './StudentForm.css';

const StudentForm = ({ onSubmit, editingStudent, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
    } else {
      setFormData({ name: '', email: '', phone: '' });
    }
    setErrors({});
  }, [editingStudent]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

  if (!formData.phone.trim()) {
  newErrors.phone = 'Phone number is required';
} else if (!/^03\d{9}$/.test(formData.phone)) {
  newErrors.phone = 'Phone format must be like 03XXXXXXXXX';
}

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (editingStudent) {
        onUpdate(formData);
      } else {
        onSubmit(formData);
        setFormData({ name: '', email: '', phone: '' });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="student-form">
      <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student's full name"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter Phone Number"
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-actions">
          {editingStudent ? (
            <>
              <button type="submit" className="btn btn-primary">
                ✅ Update Student
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={onCancel}
              >
                ❌ Cancel
              </button>
            </>
          ) : (
            <button type="submit" className="btn btn-primary">
              ➕ Add Student
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentForm;