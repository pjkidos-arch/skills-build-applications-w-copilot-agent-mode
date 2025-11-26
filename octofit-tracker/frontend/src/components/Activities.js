import React, { useEffect, useState } from 'react';
import endpoints from '../api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(endpoints.activities)
      .then((resp) => {
        if (!resp.ok) throw new Error('Network response was not ok');
        return resp.json();
      })
      .then((data) => {
        console.log('Activities fetched:', data);
        // support paginated responses with `.results` as well as plain array responses
        const list = Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : [];
        setActivities(list);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading activities...</div>;
  if (error) return <div className="text-danger">Error loading activities: {error}</div>;

  return (
    <div>
      <h2>Activities</h2>
      {activities.length === 0 && <p>No activities found.</p>}
      <ul className="list-group">
        {activities.map((a) => (
          <li key={a.id} className="list-group-item">
            <strong>{a.title || a.name || 'Unnamed Activity'}</strong>
            <div>{a.description}</div>
            <small className="text-muted">ID: {a.id}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
