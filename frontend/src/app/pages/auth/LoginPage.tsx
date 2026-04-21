import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useRole } from '../../contexts/RoleContext';
import { Eye, EyeOff } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, role } = useRole();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { email: '', password: '' };
    if (!email) newErrors.email = 'Email requis';
    if (!password) newErrors.password = 'Mot de passe requis';

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    login();
    switch (role) {
      case 'Étudiant':
        navigate('/etudiant/dashboard');
        break;
      case 'Encadrant':
        navigate('/encadrant/dashboard');
        break;
      case 'Responsable':
        navigate('/admin/dashboard');
        break;
      case 'Directeur':
        navigate('/directeur/dashboard');
        break;
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#1F4E79] mb-2">PFETracker</h1>
        <p className="text-gray-600">Connectez-vous à votre compte</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: '' });
            }}
            placeholder="votre@univ.tn"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-500' : 'border-gray-300 focus:ring-[#1F4E79]'
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: '' });
              }}
              placeholder="••••••••"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 pr-10 ${
                errors.password ? 'border-red-500' : 'border-gray-300 focus:ring-[#1F4E79]'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-[#1F4E79] text-white py-2 rounded-lg hover:bg-[#163A5C] transition-colors"
        >
          Se connecter
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate('/auth/forgot-password')}
            className="text-[#1F4E79] hover:underline text-sm"
          >
            Mot de passe oublié ?
          </button>
        </div>

        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Pas de compte ?{' '}
            <button
              type="button"
              onClick={() => navigate('/auth/register')}
              className="text-[#1F4E79] hover:underline"
            >
              Créer un compte
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
