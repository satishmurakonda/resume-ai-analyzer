
import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import GoogleIcon from '@mui/icons-material/Google';
import { auth, googleProvider } from '../../utils/firebase/Firebase';
import './Login.css';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleGoogleSignIn() {
    setLoading(true);
    setError('');

    try {
      await signInWithPopup(auth, googleProvider);
      // App.jsx observes the authentication state.
    } catch (err) {
      console.error('Google sign-in failed:', err);
      setError('Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">

        <p className="login-eyebrow">SMARTER HIRING, SIMPLIFIED</p>
        <h1>Welcome to Resume AI</h1>
        <p className="login-description">
          Sign in to analyze resumes and manage your screening activity.
        </p>

        <button
          type="button"
          className="google-signin-button"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <GoogleIcon  sx = {{fontSize: 50 ,color : "#F27A22" }}/>
          <span>
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </span>
        </button>

        {error && (
          <p className="login-error" role="alert">
            {error}
          </p>
        )}

        <p className="login-footer">
          Secure sign-in powered by Firebase Authentication
        </p>
      </section>
    </main>
  );
}
