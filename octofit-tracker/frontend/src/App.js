import './App.css';
import { Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Teams from './components/Teams';
import Leaderboard from './components/Leaderboard';
import Users from './components/Users';

function Home() {
  return (
    <div className="text-center">
      <img src="/octofitapp-small.png" alt="OctoFit" className="img-fluid mb-3" style={{ maxWidth: '180px' }} />
      <h1>Welcome to OctoFit Tracker</h1>
      <p className="lead">Track activity, join teams, and compete with friends.</p>
    </div>
  );
}

function App() {
  return (
    <div className="container py-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <NavLink to="/" className={({ isActive }) => 'navbar-brand' + (isActive ? ' active' : '')}>OctoFit Tracker</NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/activities" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
                Activities
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/teams" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
                Teams
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/leaderboard" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
                Leaderboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/users" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
                Users
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
