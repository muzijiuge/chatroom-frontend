import { LoginForm, RegisterForm, User } from '@/types/auth';
import axios from './axios';

export const login = async (data: LoginForm): Promise<{ token: string; user: User }> => {
  return axios.post('/auth/login', data);
};

export const register = async (data: RegisterForm): Promise<{ token: string; user: User }> => {
  return axios.post('/auth/register', data);
};

export const getCurrentUser = async (): Promise<User> => {
  return axios.get('/auth/me');
}; 