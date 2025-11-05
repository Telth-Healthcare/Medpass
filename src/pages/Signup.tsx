import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../BASE_URL';
import { getInviteMail } from '../API/UserApi';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [error, setError] = useState('');
  const [phone, setphone] = useState()

  useEffect(() => {
    const fetchInviteData = async () => {
      const params = new URLSearchParams(window.location.search);
      const inviteToken = params.get('token');

      if (!inviteToken) {
        setError('Invalid or missing invitation token.');
        return;
      }

      setToken(inviteToken);
      setFetchingData(true);
      setError('');

      try {
        const response = await getInviteMail(inviteToken);

        if (response.email) setEmail(response.email);
        if (response.role) setRole(response.role);


        if (response.is_used) {
          setError('This invitation has already been used.');
          return;
        }

        if (response.expires_at) {
          const expiresAt = new Date(response.expires_at);
          if (expiresAt < new Date()) {
            setError('This invitation has expired.');
            return;
          }
        }
      } catch (err: any) {
        console.error('Error fetching invite data:', err);
        if (err.code === 'ECONNREFUSED') {
          setError('Cannot connect to server. Please check if the backend is running.');
        } else if (err.response?.status === 404) {
          setError('Invitation not found or invalid token.');
        } else {
          setError('Invalid or expired invitation link.');
        }
      } finally {
        setFetchingData(false);
      }
    };

    fetchInviteData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim() || !token || !role) {
      setError('All fields are required.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);

      const payload = { username, email, password, role: role.toUpperCase(), token, phone };

      const res = await axios.post(
        `${BASE_URL}users/`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          timeout: 30000,
        }
      );

      if (res.status === 200 || res.status === 201) {
        alert("Signup successful! Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      }

    } catch (err: any) {
      console.error("Signup error:", err);

      if (err.response && err.response.data) {
        const errors = err.response.data;

        // Collect all error messages into one string
        const messages = Object.entries(errors)
          .map(([field, msgs]) => `${field}: ${(msgs as string[]).join(", ")}`)
          .join(" | ");

        setError(messages || "Signup failed. Please try again.");
      } else {
        setError("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Verifying invitation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left side form */}
        <div className="col-md-6 d-flex justify-content-center align-items-center bg-light">
          <div className="card shadow p-4 mt-5 w-100" style={{ maxWidth: '400px' }}>
            <h3 className="text-center mb-4">Complete Your Signup</h3>

            {error && <div className="alert alert-danger py-2">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username *</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly={!!email}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password *</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Role *</label>
                <input
                  type="text"
                  className="form-control"
                  value={role}
                  readOnly   // or use disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Mobile Number</label>
                <input
                  type="number"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                  placeholder="Min. 10 characters"
                  required
                />
              </div>


              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading || !token || !role}
              >
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
            </form>
          </div>
        </div>

        {/* Right side banner */}
        <div className="col-md-6 d-none d-md-flex bg-primary text-white justify-content-center align-items-center">
          <div className="text-center px-5">
            <h1 className="mb-3">Welcome!</h1>
            <p className="lead">
              You've been invited to join us.
              Create your account and get started!
            </p>
            {email && (
              <div className="mt-4">
                <small className="opacity-75">
                  Invitation for: <strong>{email}</strong>
                </small>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
