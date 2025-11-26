import React, { useEffect, useState } from 'react';
import endpoints from '../api';

export default function Leaderboard() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    console.log('Fetching leaderboard from:', endpoints.leaderboard);
    fetch(endpoints.leaderboard)
      .then((resp) => {
        if (!resp.ok) throw new Error('Network response was not ok');
        return resp.json();
      })
      .then((data) => {
        console.log('Leaderboard fetched (raw):', data);
        const list = Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : [];
        console.log('Leaderboard normalized list length:', list.length);
        setRows(list);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading leaderboard...</div>;
  if (error) return <div className="text-danger">Error loading leaderboard: {error}</div>;

  return (
    <div>
      <h2>Leaderboard</h2>
      {rows.length === 0 && <p>No leaderboard entries.</p>}
      <ol className="list-group list-group-numbered">
        {rows.map((r) => (
          <li key={r.id} className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">{r.user || r.name || 'Unknown'}</div>
              <div>{r.points !== undefined ? `${r.points} pts` : r.score}</div>
            </div>
            <span className="badge bg-primary rounded-pill">#{r.rank || r.position || r.id}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
