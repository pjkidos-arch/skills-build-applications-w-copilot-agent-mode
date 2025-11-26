import React, { useEffect, useState } from 'react';
import endpoints from '../api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    console.log('Fetching activities from:', endpoints.activities);
    fetch(endpoints.activities)
      .then((resp) => {
        if (!resp.ok) throw new Error('Network response was not ok');
        return resp.json();
      })
      .then((data) => {
        console.log('Activities fetched (raw):', data);
        // support paginated responses with `.results` as well as plain array responses
        const list = Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : [];
        console.log('Activities normalized list length:', list.length);
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
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.title || a.name || 'Unnamed Activity'}</td>
                <td>{a.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
