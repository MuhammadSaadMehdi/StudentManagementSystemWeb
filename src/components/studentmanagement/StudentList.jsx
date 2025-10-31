// src/components/StudentList.jsx
import React from 'react';
import './StudentList.css';

const StudentList = ({ students, onEdit, onDelete }) => {
  if (students.length === 0) {
    return (
      <div className="no-students">
        <p>No students found matching your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="student-list">
      <div className="list-header">
        <h2>Student Records</h2>
        <span className="count-badge">{students.length} students</span>
      </div>

      <div className="students-grid">
        {students.map(student => (
          <div key={student.id} className="student-card">
            <div className="student-info">
              <h3 className="student-name">{student.name}</h3>
              <p className="student-email">📧 {student.email}</p>
              <p className="student-phone">📞 {student.phone}</p>
            </div>
            
            <div className="student-actions">
              <button 
                className="btn btn-edit"
                onClick={() => onEdit(student)}
                aria-label={`Edit ${student.name}`}
              >
                ✏️ Edit
              </button>
              <button 
                className="btn btn-delete"
                onClick={() => onDelete(student.id)}
                aria-label={`Delete ${student.name}`}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;