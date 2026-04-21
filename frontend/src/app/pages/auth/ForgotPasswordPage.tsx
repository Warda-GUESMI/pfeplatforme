import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle } from 'lucide-react';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#1F4E79] mb-2">Mot de passe oublié</h1>
        <p className="text-gray-600">Entrez votre email pour réinitialiser votre mot de passe</p>
      </div>

      {submitted ? (
        <div className="text-center">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-6">
            Si cet email existe, un lien de réinitialisation a été envoyé
          </p>
          <button
            onClick={() => navigate('/auth/login')}
            className="w-full bg-[#1F4E79] text-white py-2 rounded-lg hover:bg-[#163A5C] transition-colors"
          >
            Retour à la connexion
          </button>
        </div>
      ) : (
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

          <button
            type="submit"
            className="w-full bg-[#1F4E79] text-white py-2 rounded-lg hover:bg-[#163A5C] transition-colors"
          >
            Envoyer le lien
          </button>

          <div className="text-center pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/auth/login')}
              className="text-[#1F4E79] hover:underline text-sm"
            >
              Retour à la connexion
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
