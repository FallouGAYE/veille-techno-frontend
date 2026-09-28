import { useState } from 'react';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

import {
  login,
} from '../services/auth.service';


function GoogleIcon() {
  return (
    <svg
      className="social-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.38Z"
      />

      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.97-.9 6.63-2.39l-3.24-2.51c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.59A10 10 0 0 0 12 22Z"
      />

      <path
        fill="#FBBC05"
        d="M6.39 13.93A6 6 0 0 1 6.08 12c0-.67.11-1.32.31-1.93V7.48H3.04A10 10 0 0 0 2 12c0 1.61.38 3.13 1.04 4.52l3.35-2.59Z"
      />

      <path
        fill="#EA4335"
        d="M12 5.94c1.47 0 2.79.5 3.83 1.5l2.87-2.87A9.63 9.63 0 0 0 12 2a10 10 0 0 0-8.96 5.48l3.35 2.59C7.18 7.7 9.39 5.94 12 5.94Z"
      />
    </svg>
  );
}


function GitHubIcon() {
  return (
    <svg
      className="social-icon github-svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.75.4-1.27.74-1.56-2.57-.29-5.27-1.28-5.27-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18A10.9 10.9 0 0 1 12 6.13c.98 0 1.95.13 2.87.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.71 5.38-5.29 5.67.42.36.79 1.07.79 2.16v3.24c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  );
}


function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [message, setMessage] =
    useState('');

  const [messageType, setMessageType] =
    useState('');

  const [loading, setLoading] =
    useState(false);


  /* =========================================
     LOGIN
  ========================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage('');
    setMessageType('');

    if (!email.trim() || !password) {
      setMessage(
        'Please fill in all fields.'
      );

      setMessageType('error');

      return;
    }

    setLoading(true);

    try {
      await login(
        email,
        password
      );

      setMessage(
        'Login successful!'
      );

      setMessageType('success');

      setTimeout(() => {
        navigate('/board');
      }, 700);

    } catch (error) {
      setMessage(
        error.message ||
          'Unable to log in.'
      );

      setMessageType('error');

    } finally {
      setLoading(false);
    }
  };


  return (
    <>

      {/* =====================================
          SIGN UP
      ===================================== */}

      <div className="signup">

        <span>
          Don't have an account?
        </span>

        <Link to="/register">
          Sign up
        </Link>

      </div>


      {/* =====================================
          LOGIN FORM
      ===================================== */}

      <form
        className="login-form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >

        {/* =================================
            MOBILE BRAND
        ================================= */}

        <div className="mobile-brand">

          <div className="mobile-brand-icon">
            <span />
            <span />
            <span />
          </div>

          <strong>
            TaskBoard
          </strong>

        </div>


        {/* =================================
            TITLE
        ================================= */}

        <div className="form-heading">

          <h1>
            Welcome back
          </h1>

          <p>
            Enter your details to access
            your workspace.
          </p>

        </div>


        {/* =================================
            EMAIL
        ================================= */}

        <div className="form-group">

          <label htmlFor="login-email">
            Email
          </label>

          <div className="input-container">

            <Mail
              className="input-icon"
              size={19}
              strokeWidth={1.8}
            />

            <input
              id="login-email"
              name="taskboard-login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              autoComplete="off"
              autoCapitalize="none"
              spellCheck="false"
              required
            />

          </div>

        </div>


        {/* =================================
            PASSWORD
        ================================= */}

        <div className="form-group">

          <label htmlFor="login-password">
            Password
          </label>

          <div className="input-container">

            <LockKeyhole
              className="input-icon"
              size={19}
              strokeWidth={1.8}
            />

            <input
              id="login-password"
              name="taskboard-login-password"
              type={
                showPassword
                  ? 'text'
                  : 'password'
              }
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              autoComplete="new-password"
              required
            />


            {/* SHOW / HIDE PASSWORD */}

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword(
                  (current) => !current
                )
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


          {/* FORGOT PASSWORD */}

          <a
            href="#"
            className="forgot"
            onClick={(event) =>
              event.preventDefault()
            }
          >
            Forgot password?
          </a>

        </div>


        {/* =================================
            MESSAGE
        ================================= */}

        {message && (

          <div
            className={
              `login-message ${messageType}`
            }
          >

            {messageType === 'success' && (

              <CheckCircle2
                size={16}
              />

            )}

            {message}

          </div>

        )}


        {/* =================================
            LOGIN BUTTON
        ================================= */}

        <button
          type="submit"
          className="login-button"
          disabled={loading}
        >

          {loading ? (

            <>

              <span className="spinner" />

              Signing in...

            </>

          ) : (

            <>

              Log in

              <ArrowRight
                size={18}
                strokeWidth={1.8}
              />

            </>

          )}

        </button>


        {/* =================================
            SEPARATOR
        ================================= */}

        <div className="separator">

          <span />

          <p>
            or continue with
          </p>

          <span />

        </div>


        {/* =================================
            SOCIAL BUTTONS
        ================================= */}

        <div className="social-buttons">

          <button
            type="button"
            className="social"
          >

            <GoogleIcon />

            Google

          </button>


          <button
            type="button"
            className="social"
          >

            <GitHubIcon />

            GitHub

          </button>

        </div>


        {/* =================================
            TERMS
        ================================= */}

        <p className="terms">

          By continuing, you agree to our{' '}

          <a
            href="#"
            onClick={(event) =>
              event.preventDefault()
            }
          >
            Terms of Service
          </a>

          {' '}and{' '}

          <a
            href="#"
            onClick={(event) =>
              event.preventDefault()
            }
          >
            Privacy Policy
          </a>.

        </p>

      </form>

    </>
  );
}


export default LoginForm;