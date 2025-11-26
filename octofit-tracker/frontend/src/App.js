import './App.css';

function App() {
  return (
    <div className="container py-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <a className="navbar-brand" href="/">OctoFit Tracker</a>
      </nav>

      <div className="text-center">
        <img src="/octofitapp-small.png" alt="OctoFit" className="img-fluid mb-3" style={{ maxWidth: '180px' }} />
        <h1>Welcome to OctoFit Tracker</h1>
        <p className="lead">Track activity, join teams, and compete with friends.</p>
      </div>
    </div>
  );
}

export default App;
