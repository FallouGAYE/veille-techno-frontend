import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
} from 'lucide-react';

function GoogleIcon() {
  return (
    <svg
      className="social-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.91h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.4Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.97-.9 6.63-2.43l-3.24-2.54c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.62A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.39 13.86A6.02 6.02 0 0 1 6.08 12c0-.65.11-1.28.31-1.86V7.52H3.04A10 10 0 0 0 2 12c0 1.61.38 3.14 1.04 4.48l3.35-2.62Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.01c1.47 0 2.79.5 3.83 1.5l2.87-2.87A9.63 9.63 0 0 0 12 2a10 10 0 0 0-8.96 5.52l3.35 2.62C7.18 7.77 9.39 6.01 12 6.01Z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      className="social-icon github-svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.9-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.96a9.3 9.3 0 0 1 2.5.35c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.17 10.17 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  );
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // La connexion au backend sera ajoutée dans FRONT-04.
  };

  return (
    <>
      <div className="signup">
        <span>Don't have an account?</span>
        <Link to="/register">Sign up</Link>
      </div>

      <form
        className="login-form"
        onSubmit={handleSubmit}
      >
        <div className="form-heading">
          <div className="mobile-brand">
            <div className="mobile-brand-icon">
              <span />
              <span />
              <span />
            </div>

            <strong>TaskBoard</strong>
          </div>

          <h1>Welcome back</h1>

          <p>
            Log in to your account to continue
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email
          </label>

          <div className="input-container">
            <span className="input-icon">
              <Mail
                size={19}
                strokeWidth={1.8}
              />
            </span>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password">
            Password
          </label>

          <div className="input-container">
            <span className="input-icon">
              <LockKeyhole
                size={19}
                strokeWidth={1.8}
              />
            </span>

            <input
              id="password"
              type={
                showPassword
                  ? 'text'
                  : 'password'
              }
              placeholder="Your password"
              autoComplete="current-password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword((current) => !current)
              }
              aria-label={
                showPassword
                  ? 'Hide password'
                  : 'Show password'
              }
            >
              {showPassword ? (
                <EyeOff
                  size={19}
                  strokeWidth={1.8}
                />
              ) : (
                <Eye
                  size={19}
                  strokeWidth={1.8}
                />
              )}
            </button>
          </div>

          <a
            className="forgot"
            href="#"
            onClick={(event) =>
              event.preventDefault()
            }
          >
            Forgot password?
          </a>
        </div>

        <button
          className="login-button"
          type="submit"
        >
          <span>Log in</span>

          <ArrowRight
            size={18}
            strokeWidth={2}
          />
        </button>

        <div className="separator">
          <span />
          <p>or continue with</p>
          <span />
        </div>

        <div className="social-buttons">
          <button
            type="button"
            className="social"
          >
            <GoogleIcon />
            <span>Continue with Google</span>
          </button>

          <button
            type="button"
            className="social"
          >
            <GitHubIcon />
            <span>Continue with GitHub</span>
          </button>
        </div>

        <p className="terms">
          By continuing, you agree to our
          <a
            href="#"
            onClick={(event) =>
              event.preventDefault()
            }
          >
            {' '}Terms of Service{' '}
          </a>
          and
          <a
            href="#"
            onClick={(event) =>
              event.preventDefault()
            }
          >
            {' '}Privacy Policy
          </a>.
        </p>
      </form>
    </>
  );
}

export default LoginForm;