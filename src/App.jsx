import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import { auth } from './utils/firebase/Firebase.js';
import Login from './screens/Login/Login.jsx'
import Sidebar from './screens/Components/Sidebar.jsx';
import Dashboard from './screens/Dashboard/Dashboard.jsx';
import History from './screens/History/History.jsx';
import Admin from './screens/Admin/Admin.jsx';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activePage, setActivePage] = useState('Dashboard');
  const [logoutError, setLogoutError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);

      if (!currentUser) {
        setActivePage('Dashboard');
      }
    });

    return unsubscribe;
  }, []);

  async function handleNavigate(page) {
    setLogoutError('');

    if (page === 'Logout') {
      try {
        await signOut(auth);
        // The auth observer returns the app to Login.
      } catch (error) {
        console.error('Logout failed:', error);
        setLogoutError('Unable to log out. Please try again.');
      }
      return;
    }

    setActivePage(page);
  }

  if (authLoading) {
    return (
      <div className="auth-loading">
        <p>Checking authentication...</p>
      </div>
    );
  }

  // Protect all application screens.
  if (!user) {
    return <Login />;
  }

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      <main className="app-main">
        <header className="mobile-header">
          <span className="material-icons" aria-hidden="true">
            article
          </span>
          <span>Resume Screening</span>
        </header>

        {logoutError && (
          <p className="auth-error" role="alert">
            {logoutError}
          </p>
        )}

        <div className="app-content">
          {activePage === 'Dashboard' && (
            <Dashboard user={user} />
          )}

          {activePage === 'History' && <History />}

          {activePage === 'Admin' && <Admin />}
        </div>
      </main>
    </div>
  );
}