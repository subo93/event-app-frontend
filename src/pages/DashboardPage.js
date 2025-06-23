// src/pages/DashboardPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DashboardPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/events');
        setEvents(response.data.content);
      } catch (err) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (loading) return <div>Loading events...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="dashboard-container">
      <button onClick={() => navigate('/events/create')}>Add Event</button>
      <table className="events-table">
        <thead>
          <tr>
            <th>Title</th><th>Date</th><th>Location</th><th>Visibility</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>{event.title || '-'}</td>
              <td>{event.startTime ? new Date(event.startTime).toLocaleDateString() : '-'}</td>
              <td>{event.location || '-'}</td>
              <td>{event.visibility || '-'}</td>
              <td>
                <button onClick={() => navigate(`/events/${event.id}`)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
