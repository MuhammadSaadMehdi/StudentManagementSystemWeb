// src/App.jsx
import React, { useState } from 'react';
import StudentList from './components/studentmanagement/StudentList'
import StudentForm from './components/studentmanagement/StudentForm';
import SearchBar from './components/studentmanagement/SearchBar';
import './App.css';

const App = () => {
  // Preloaded students data
  const initialStudents = [
    { id: 1, name: 'Muhammad Saad Mehdi', email: 'muhammadsaadmehdi@gmail.com', phone: '03367712308' },
    { id: 2, name: 'Umar', email: 'umar@gmail.com', phone: '03300000000' },
    { id: 3, name: 'Ahmad', email: 'ahmad@gmail.com', phone: '03360000000' },
    { id: 4, name: 'Taleya', email: 'taleyaabbas@gmail.com', phone: '03350000000' },
    { id: 5, name: 'Zahra', email: 'zahrah@gmail.com', phone: '03110000000' }
  ];

  const [students, setStudents] = useState(initialStudents);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Add new student
  const addStudent = (student) => {
    const newStudent = {
      ...student,
      id: Math.max(...students.map(s => s.id), 0) + 1
    };
    setStudents([...students, newStudent]);
  };

  // Update existing student
  const updateStudent = (updatedStudent) => {
    setStudents(students.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    ));
    setEditingStudent(null);
  };

  // Delete student with confirmation
  const deleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  // Filter students based on search term
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎓 Student Management System</h1>
        <p>Manage your student records efficiently</p>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="sidebar">
            <StudentForm 
              onSubmit={addStudent}
              editingStudent={editingStudent}
              onUpdate={updateStudent}
              onCancel={() => setEditingStudent(null)}
            />
          </div>

          <div className="content">
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            
            <StudentList
              students={filteredStudents}
              onEdit={setEditingStudent}
              onDelete={deleteStudent}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;