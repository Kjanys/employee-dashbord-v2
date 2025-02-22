'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import { Button, TextInput, Card, Text, Link } from '@gravity-ui/uikit';
import { login } from '../store/slices/userSlice';

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Моковая аутентификация
    const mockUser = {
      id: '1',
      name: 'Иван Иванов',
      email: email,
    };

    dispatch(login(mockUser)); // Логиним пользователя
    router.push('/'); // Перенаправляем на главную страницу
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="p-6 w-full max-w-md">
        <Text variant="header-1" className="mb-6 text-center">
          Вход
        </Text>
        <form onSubmit={handleLogin} className="space-y-4">
          <TextInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" view="action" className="w-full">
            Войти
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/">Вернуться на главную</Link>
        </div>
      </Card>
    </div>
  );
}