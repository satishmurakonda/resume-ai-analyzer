import { useState } from 'react';
import Sidebar from './screens/Components/Sidebar.jsx';
import Dashboard from './screens/Dashboard/Dashboard.jsx';
import History from './screens/History/History.jsx';
import Admin from './screens/Admin/Admin.jsx';
import './App.css';

export default function App() {
  const [activePage, setActivePage] = useState('Dashboard');
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleNavigate = (page) => {
    if (page === 'Logout') {
      setShowLogoutDialog(true);
      return;
    }
    setActivePage(page);
  };

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={handleNavigate} />
      <main className="app-main">
        <header className="mobile-header">
          <span className="material-icons" aria-hidden="true">view_headline</span>
          <span>Resume Screening</span>
        </header>

        <div className="app-content">
          {activePage === 'Dashboard' && <Dashboard />}
          {activePage === 'History' && <History />}
          {activePage === 'Admin' && <Admin />}
        </div>
      </main>

      {showLogoutDialog && (
        <div className="app-modal-backdrop" onClick={() => setShowLogoutDialog(false)}>
          <section
            className="app-logout-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-heading"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="material-icons app-logout-icon" aria-hidden="true">logout</span>
            <h2 id="logout-heading">Logout</h2>
            <p>Authentication is not connected yet. You can return to the dashboard for now.</p>
            <div className="app-dialog-actions">
              <button className="app-cancel-button" onClick={() => setShowLogoutDialog(false)}>Cancel</button>
              <button className="app-confirm-button" onClick={() => {
                setShowLogoutDialog(false);
                setActivePage('Dashboard');
              }}>Back to Dashboard</button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
