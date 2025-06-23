// src/pages/CreateEventPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//import '../styles/createEvent.scss';


export default function CreateEventPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    visibility: 'PUBLIC',
    startTime: '',
    endTime: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // change!
      await axios.post('http://localhost:8080/api/events', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-container">
      <h2>Create Event</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
        <select name="visibility" value={formData.visibility} onChange={handleChange}>
          <option value="PUBLIC">Public</option>
          <option value="PRIVATE">Private</option>
        </select>
        <label>Start Time:</label>
        <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} required />
        <label>End Time:</label>
        <input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} required />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
}
