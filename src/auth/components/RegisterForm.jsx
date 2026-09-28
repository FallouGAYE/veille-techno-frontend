import { useState } from 'react';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

import {
  User,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  Check,
  ArrowRight,
} from 'lucide-react';

import {
  register,
} from '../services/auth.service';


function RegisterForm() {
  const navigate = useNavigate();

  const [firstName, setFirstName] =
    useState('');

  const [lastName, setLastName] =
    useState('');

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
     PASSWORD VALIDATION
  ========================================= */

  const hasEightCharacters =
    password.length >= 8;

  const hasNumber =
    /\d/.test(password);

  const hasSpecialCharacter =
    /[!@#$%^&*(),.?":{}|<>]/.test(password);


  /* =========================================
     REGISTER
  ========================================= */

  const handleRegister = async (event) => {
    event.preventDefault();

    setMessage('');
    setMessageType('');


    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password
    ) {
      setMessage(
        'Please fill in all fields.'
      );

      setMessageType('error');

      return;
    }


    if (
      !hasEightCharacters ||
      !hasNumber ||
      !hasSpecialCharacter
    ) {
      setMessage(
        'Please choose a stronger password.'
      );

      setMessageType('error');

      return;
    }


    setLoading(true);


    try {
      await register(
        firstName,
        lastName,
        email,
        password
      );


      setMessage(
        'Account created successfully!'
      );

      setMessageType('success');


      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');


      setTimeout(() => {
        navigate('/login');
      }, 1200);

    } catch (error) {
      console.error(
        'Register error:',
        error
      );

      setMessage(
        error.message ||
          'Unable to create your account.'
      );

      setMessageType('error');

    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      {/* =====================================
          SIGN IN
      ===================================== */}

      <div className="register-signin">

        <span>
          Already have an account?
        </span>

        <Link
          to="/login"
          className="register-signin-link"
        >
          Sign in
        </Link>

      </div>


      {/* =====================================
          FORM
      ===================================== */}

      <form
        className="register-form"
        onSubmit={handleRegister}
      >

        {/* =================================
            TITRE
        ================================= */}

        <div className="register-heading">

          <h1>
            Create your account
          </h1>

          <p>
            Join TaskBoard and start organizing
            your work today.
          </p>

        </div>


        {/* =================================
            FIRST NAME + LAST NAME
        ================================= */}

        <div className="register-name-row">


          {/* FIRST NAME */}

          <div className="register-form-group">

            <label htmlFor="firstName">
              First name
            </label>

            <div className="register-input-container">

              <User
                className="register-input-icon"
                size={18}
                strokeWidth={1.8}
              />

              <input
                id="firstName"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(event) =>
                  setFirstName(
                    event.target.value
                  )
                }
                autoComplete="given-name"
                required
              />

            </div>

          </div>


          {/* LAST NAME */}

          <div className="register-form-group">

            <label htmlFor="lastName">
              Last name
            </label>

            <div className="register-input-container">

              <User
                className="register-input-icon"
                size={18}
                strokeWidth={1.8}
              />

              <input
                id="lastName"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(event) =>
                  setLastName(
                    event.target.value
                  )
                }
                autoComplete="family-name"
                required
              />

            </div>

          </div>

        </div>


        {/* =================================
            EMAIL
        ================================= */}

        <div className="register-form-group">

          <label htmlFor="register-email">
            Email
          </label>

          <div className="register-input-container">

            <Mail
              className="register-input-icon"
              size={18}
              strokeWidth={1.8}
            />

            <input
              id="register-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              autoComplete="email"
              required
            />

          </div>

        </div>


        {/* =================================
            PASSWORD
        ================================= */}

        <div className="register-form-group">

          <label htmlFor="register-password">
            Password
          </label>

          <div className="register-input-container">

            <LockKeyhole
              className="register-input-icon"
              size={18}
              strokeWidth={1.8}
            />

            <input
              id="register-password"
              type={
                showPassword
                  ? 'text'
                  : 'password'
              }
              placeholder="Create a password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              autoComplete="new-password"
              required
            />


            <button
              type="button"
              className="register-password-toggle"
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

        </div>


        {/* =================================
            PASSWORD RULES
        ================================= */}

        <div className="password-requirements">


          <div
            className={
              hasEightCharacters
                ? 'requirement valid'
                : 'requirement'
            }
          >

            <span className="requirement-check">
              <Check size={13} />
            </span>

            At least 8 characters

          </div>


          <div
            className={
              hasNumber
                ? 'requirement valid'
                : 'requirement'
            }
          >

            <span className="requirement-check">
              <Check size={13} />
            </span>

            Include a number

          </div>


          <div
            className={
              hasSpecialCharacter
                ? 'requirement valid'
                : 'requirement'
            }
          >

            <span className="requirement-check">
              <Check size={13} />
            </span>

            Include a special character

          </div>

        </div>


        {/* =================================
            MESSAGE
        ================================= */}

        {message && (

          <div
            className={
              `register-message ${messageType}`
            }
          >
            {message}
          </div>

        )}


        {/* =================================
            CREATE ACCOUNT
        ================================= */}

        <button
          type="submit"
          className="register-button"
          disabled={loading}
        >

          {loading ? (

            <>

              <span
                className="register-spinner"
              />

              Creating account...

            </>

          ) : (

            <>

              Create account

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

        <div className="register-separator">

          <span />

          <p>
            or sign up with
          </p>

          <span />

        </div>


        {/* =================================
            SOCIAL
        ================================= */}

        <div className="register-social-buttons">

          <button
            type="button"
            className="register-social"
          >

            <span className="register-google-logo">
              G
            </span>

            Continue with Google

          </button>


          <button
            type="button"
            className="register-social"
          >

            <span className="register-github-logo">
              GH
            </span>

            Continue with GitHub

          </button>

        </div>


        {/* =================================
            TERMS
        ================================= */}

        <p className="register-terms">

          By creating an account,
          you agree to our{' '}

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


export default RegisterForm;