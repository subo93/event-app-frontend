// src/pages/EventDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
//import '../styles/eventDetail.scss';


export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/events/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setEvent(response.data);
      } catch (err) {
        setError('Failed to load event');
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [id]);

  if (loading) return <div>Loading event...</div>;
  if (error) return <div style={{color: 'red'}}>{error}</div>;
  if (!event) return <div>No event found</div>;

  return (
    <div className="event-detail-container">
      <h2>{event.title || 'Untitled Event'}</h2>
      <p><strong>Description:</strong> {event.description || 'N/A'}</p>
      <p><strong>Location:</strong> {event.location || 'N/A'}</p>
      <p><strong>Start Time:</strong> {event.startTime ? new Date(event.startTime).toLocaleString() : 'N/A'}</p>
      <p><strong>End Time:</strong> {event.endTime ? new Date(event.endTime).toLocaleString() : 'N/A'}</p>
      <p><strong>Visibility:</strong> {event.visibility || 'N/A'}</p>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  );
}
