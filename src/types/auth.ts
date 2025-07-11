export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterForm extends LoginForm {
  confirmPassword: string;
}

export interface User {
  id: number;
  username: string;
  avatar?: string;
  createdAt: string;
} 