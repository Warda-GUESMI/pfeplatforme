import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle } from 'lucide-react';

export function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Étudiant' | 'Encadrant'>('Étudiant');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Compte créé avec succès</h2>
          <p className="text-gray-600 mb-6">
            Un mot de passe a été envoyé à votre adresse email
          </p>
          <button
            onClick={() => navigate('/auth/login')}
            className="w-full bg-[#1F4E79] text-white py-2 rounded-lg hover:bg-[#163A5C] transition-colors"
          >
            Aller à la connexion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#1F4E79] mb-2">PFETracker</h1>
        <p className="text-gray-600">Créez votre compte</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@univ.tn"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rôle</label>
          <div className="space-y-2">
            <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="role"
                value="Étudiant"
                checked={role === 'Étudiant'}
                onChange={(e) => setRole(e.target.value as 'Étudiant')}
                className="mr-3"
              />
              <span>Étudiant</span>
            </label>
            <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="role"
                value="Encadrant"
                checked={role === 'Encadrant'}
                onChange={(e) => setRole(e.target.value as 'Encadrant')}
                className="mr-3"
              />
              <span>Encadrant</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#1F4E79] text-white py-2 rounded-lg hover:bg-[#163A5C] transition-colors"
        >
          Créer mon compte
        </button>

        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Déjà un compte ?{' '}
            <button
              type="button"
              onClick={() => navigate('/auth/login')}
              className="text-[#1F4E79] hover:underline"
            >
              Se connecter
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
