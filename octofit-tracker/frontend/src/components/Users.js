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
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Username</th>
              <th scope="col">Full Name</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username || u.email || 'Unknown User'}</td>
                <td>{u.full_name}</td>
                <td>{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
