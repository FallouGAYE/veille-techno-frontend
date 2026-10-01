'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      if (!response.ok) {
        setMessage('Email ou mot de passe incorrect.');
        return;
      }

      const data = await response.json();

      if (!data.accessToken) {
        setMessage('Le serveur ne renvoie pas de jeton de connexion.');
        return;
      }

      localStorage.setItem('accessToken', data.accessToken);

      router.push('/board');
    } catch {
      setMessage('Impossible de contacter le serveur.');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Connexion</h1>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />

      <label htmlFor="password">Mot de passe</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />

      {message && <p role="alert">{message}</p>}

      <button type="submit">Se connecter</button>

      <p>
        Pas encore inscrit ? <Link href="/register">Créer un compte</Link>
      </p>
    </form>
  );
}