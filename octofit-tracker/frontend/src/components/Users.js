import React, { useEffect, useState } from 'react';
import endpoints from '../api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    console.log('Fetching users from:', endpoints.users);
    fetch(endpoints.users)
      .then((resp) => {
        if (!resp.ok) throw new Error('Network response was not ok');
        return resp.json();
      })
      .then((data) => {
        console.log('Users fetched (raw):', data);
        const list = Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : [];
        console.log('Users normalized list length:', list.length);
        setUsers(list);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div className="text-danger">Error loading users: {error}</div>;

  return (
    <div>
      <h2>Users</h2>
      {users.length === 0 && <p>No users found.</p>}
      <ul className="list-group">
        {users.map((u) => (
          <li key={u.id} className="list-group-item">
            <strong>{u.username || u.email || 'Unknown User'}</strong>
            <div>{u.full_name}</div>
            <small className="text-muted">ID: {u.id}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
