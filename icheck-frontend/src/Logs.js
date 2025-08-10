import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Logs({ token }) {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://icheck.onrender.com/api/logs/my', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setLogs(res.data))
      .catch(() => setError('Failed to fetch logs'));
  }, [token]);

  if (error) return <div style={{color:'red'}}>{error}</div>;

  return (
    <div>
      <h2>Your Logs</h2>
      <ul>
        {logs.map(log => (
          <li key={log._id}>
            <b>{log.eventType}</b> | Player: {log.playerId} | Game: {log.game} | Amount: {log.amount} | Time: {new Date(log.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}