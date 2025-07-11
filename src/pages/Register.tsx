import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { register } from '@/services/auth';
import type { RegisterForm } from '@/types/auth';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<RegisterForm>({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      const { token, user } = await register(form);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/chat');
    } catch (err: any) {
      setError(err.response?.data?.message || '注册失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100/50">
      <div className="w-full max-w-7xl px-4 py-8 mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* 左侧 Logo 和标题 */}
          <div className="w-full lg:w-5/12 text-center lg:text-left lg:pl-8">
            <div className="logo-container mx-auto lg:mx-0 w-28 h-28 mb-10">
              <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-lg">
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <path
                    d="M16,2 C23.7319865,2 30,8.26801346 30,16 C30,23.7319865 23.7319865,30 16,30 C13.8155365,30 11.7543367,29.4641463 9.90397012,28.5159041 L4,30 L5.48396373,24.0960299 C4.53585366,22.2456633 4,20.1844635 4,18 C4,10.2680135 10.2680135,4 16,4 Z M16,6 C11.581722,6 8,9.581722 8,14 C8,18.418278 11.581722,22 16,22 C20.418278,22 24,18.418278 24,14 C24,9.581722 20.418278,6 16,6 Z M16,8 C19.3137085,8 22,10.6862915 22,14 C22,17.3137085 19.3137085,20 16,20 C12.6862915,20 10,17.3137085 10,14 C10,10.6862915 12.6862915,8 16,8 Z"
                    fill="url(#logoGradient)"
                    fillRule="nonzero"
                    className="drop-shadow-md"
                  />
                </g>
              </svg>
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm">
              注册新账号
            </h2>
            <p className="mt-6 text-xl text-gray-500/90 font-medium max-w-md mx-auto lg:mx-0">
              创建一个账号开始聊天
            </p>
          </div>

          {/* 右侧注册表单 */}
          <div className="w-full lg:w-7/12 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-gray-200/80 p-8 lg:p-14">
            <form className="space-y-8 max-w-xl mx-auto" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Input
                    name="username"
                    type="text"
                    required
                    value={form.username}
                    onChange={handleChange}
                    placeholder="请输入用户名"
                    icon={<UserIcon />}
                  />
                </div>
                <div>
                  <Input
                    name="password"
                    type="password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    placeholder="请输入密码"
                    icon={<LockClosedIcon />}
                  />
                </div>
                <div>
                  <Input
                    name="confirmPassword"
                    type="password"
                    required
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="请再次输入密码"
                    icon={<LockClosedIcon />}
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-xl bg-red-50/80 backdrop-blur-sm p-3 border border-red-100">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">{error}</h3>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Button
                  type="submit"
                  className="w-full text-lg h-14"
                  isLoading={isLoading}
                >
                  注册
                </Button>
              </div>

              <div className="text-center">
                <Link
                  to="/login"
                  className="text-base font-medium text-primary hover:text-primary-dark transition-colors"
                >
                  已有账号？立即登录
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 