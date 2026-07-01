import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, PlusCircle, UserPlus } from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [teamName, setTeamName] = useState('');   // 👈 new state
  const [mode, setMode] = useState('create');    // 'create' or 'join'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(
        name,
        email,
        password,
        mode === 'join' ? secretKey.trim() : undefined,
        mode === 'create' ? teamName.trim() : undefined   // 👈 pass team name
      );
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register</h2>
        {error && <div className="error">{error}</div>}

        {/* Mode selection */}
        <div className="mode-selector">
          <button
            type="button"
            className={`mode-btn ${mode === 'create' ? 'active' : ''}`}
            onClick={() => setMode('create')}
          >
            <PlusCircle size={16} strokeWidth={2} />
            Create Team
          </button>
          <button
            type="button"
            className={`mode-btn ${mode === 'join' ? 'active' : ''}`}
            onClick={() => setMode('join')}
          >
            <UserPlus size={16} strokeWidth={2} />
            Join Team
          </button>
        </div>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        {/* Team name field – only for create mode */}
        {mode === 'create' && (
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            disabled={loading}
          />
        )}

        {/* Secret key – only for join mode */}
        {mode === 'join' && (
          <input
            type="text"
            placeholder="Team Secret Key"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            required
            disabled={loading}
          />
        )}

        <button type="submit" disabled={loading} className="btn btn-primary" style={{ opacity: loading ? 0.7 : 1 }}>
          {loading ? (
            <>
              <Loader2 size={18} strokeWidth={2} style={{ animation: 'spin 1s linear infinite', marginRight: '6px' }} />
              {mode === 'create' ? 'Creating Team...' : 'Joining Team...'}
            </>
          ) : (
            mode === 'create' ? 'Create Team & Register' : 'Join Team & Register'
          )}
        </button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;