import { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/Button';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-[#4A4A4A]">
            Entre na sua conta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-[#D0021B] text-[#D0021B] px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#4A4A4A]">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-[#4A90E2] sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#4A4A4A]">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-[#4A90E2] sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              fullWidth
            >
              Entrar
            </Button>
          </div>

          <div className="text-sm text-center">
            <Link
              to="/register"
              className="font-medium text-[#4A90E2] hover:text-[#357ABD]"
            >
              Não tem uma conta? Registre-se aqui
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}