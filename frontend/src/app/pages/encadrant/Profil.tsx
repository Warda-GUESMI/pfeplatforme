import { useState } from 'react';
import { Copy, Send } from 'lucide-react';
import { toast } from 'sonner';

export function EncadrantProfil() {
  const [email, setEmail] = useState('');
  const [showCopiedTooltip, setShowCopiedTooltip] = useState(false);

  const encCode = 'ENC-A7X3K';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(encCode);
    setShowCopiedTooltip(true);
    setTimeout(() => setShowCopiedTooltip(false), 2000);
  };

  const handleSendInvitation = () => {
    if (email) {
      toast.success(`Invitation envoyée à ${email} — lien Google Meet de bienvenue généré`);
      setEmail('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Informations professionnelles</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Grade</p>
            <p className="font-medium">Professeure</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Spécialité</p>
            <p className="font-medium">Génie Logiciel</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Bureau</p>
            <p className="font-medium">B-305</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Code d'invitation</h3>
        <div className="bg-gradient-to-br from-[#1F4E79] to-[#163A5C] rounded-lg p-6 text-white mb-4">
          <p className="text-sm opacity-90 mb-2">Votre code d'invitation</p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-mono font-bold">{encCode}</p>
            <div className="relative">
              <button
                onClick={handleCopyCode}
                className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all"
              >
                <Copy size={20} />
              </button>
              {showCopiedTooltip && (
                <div className="absolute -top-8 right-0 bg-black text-white text-xs px-2 py-1 rounded">
                  Copié !
                </div>
              )}
            </div>
          </div>
          <p className="text-sm opacity-75 mt-3">
            Partagez ce code avec vos étudiants pour qu'ils puissent vous rejoindre
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Envoyer une invitation</h4>
          <div className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@univ.tn"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79]"
            />
            <button
              onClick={handleSendInvitation}
              className="flex items-center gap-2 px-4 py-2 bg-[#1F4E79] text-white rounded-lg hover:bg-[#163A5C]"
            >
              <Send size={18} />
              Envoyer
            </button>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-medium mb-3">Invitations envoyées</h4>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-700">Email</th>
                <th className="text-left py-2 text-sm font-medium text-gray-700">Date</th>
                <th className="text-left py-2 text-sm font-medium text-gray-700">Statut</th>
                <th className="text-left py-2 text-sm font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 text-sm">ahmed@univ.tn</td>
                <td className="py-3 text-sm text-gray-600">15/01/2025</td>
                <td className="py-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Accepté</span>
                </td>
                <td className="py-3">-</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 text-sm">fatma@univ.tn</td>
                <td className="py-3 text-sm text-gray-600">18/01/2025</td>
                <td className="py-3">
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">En attente</span>
                </td>
                <td className="py-3">
                  <button className="text-sm text-[#1F4E79] hover:underline">Renvoyer</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
