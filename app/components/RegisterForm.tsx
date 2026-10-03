'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { register } from '../services/auth.service';

export default function RegisterForm() {
  const router = useRouter();

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setMessage('');

    try {
      await register({
        name: `${firstName.trim()} ${lastName.trim()}`,
        email: email.trim(),
        password,
      });

      router.push('/login');
    } catch {
      setMessage("L'inscription a échoué.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Créer un compte</h1>

      <label htmlFor="lastName">Nom</label>
      <input
        id="lastName"
        type="text"
        value={lastName}
        onChange={(event) =>
          setLastName(event.target.value)
        }
        required
      />

      <label htmlFor="firstName">Prénom</label>
      <input
        id="firstName"
        type="text"
        value={firstName}
        onChange={(event) =>
          setFirstName(event.target.value)
        }
        required
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) =>
          setEmail(event.target.value)
        }
        required
      />

      <label htmlFor="password">
        Mot de passe
      </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(event) =>
          setPassword(event.target.value)
        }
        minLength={8}
        required
      />

      {message && (
        <p role="alert">{message}</p>
      )}

      <button type="submit">
        S'inscrire
      </button>

      <p>
        Déjà inscrit ?{' '}
        <Link href="/login">
          Se connecter
        </Link>
      </p>
    </form>
  );
}