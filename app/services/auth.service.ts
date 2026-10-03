import api from './api.service';

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
};

export async function login(data: LoginData) {
  const response = await api.post<LoginResponse>(
    '/auth/login',
    data,
  );

  return response.data;
}

export async function register(data: RegisterData) {
  const response = await api.post(
    '/auth/register',
    data,
  );

  return response.data;
}