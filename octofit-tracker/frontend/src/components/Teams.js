import React, { useEffect, useState } from 'react';
import endpoints from '../api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    console.log('Fetching teams from:', endpoints.teams);
    fetch(endpoints.teams)
      .then((resp) => {
        if (!resp.ok) throw new Error('Network response was not ok');
        return resp.json();
      })
      .then((data) => {
        console.log('Teams fetched (raw):', data);
        const list = Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : [];
        console.log('Teams normalized list length:', list.length);
        setTeams(list);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading teams...</div>;
  if (error) return <div className="text-danger">Error loading teams: {error}</div>;

  return (
    <div>
      <h2>Teams</h2>
      {teams.length === 0 && <p>No teams found.</p>}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.name}</td>
                <td>{t.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
