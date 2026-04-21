import { useState } from 'react';
import { Lock, Camera } from 'lucide-react';
import { toast } from 'sonner';

export function EtudiantProfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    nom: 'Ben Salem',
    prenom: 'Ahmed',
    telephone: '+216 20 123 456',
    email: 'ahmed.bensalem@univ.tn',
    departement: 'Génie Informatique',
    niveau: 'Master 2',
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profil mis à jour avec succès');
  };

  const handleChangePassword = () => {
    if (passwords.new === passwords.confirm) {
      toast.success('Mot de passe changé avec succès');
      setPasswords({ current: '', new: '', confirm: '' });
    } else {
      toast.error('Les mots de passe ne correspondent pas');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-start gap-6 mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-[#1F4E79] flex items-center justify-center text-white text-3xl">
              AS
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50">
              <Camera size={16} />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">
              {profile.prenom} {profile.nom}
            </h2>
            <p className="text-gray-600">{profile.niveau}</p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-[#1F4E79] text-white rounded-lg hover:bg-[#163A5C]"
            >
              Modifier
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#1F4E79] text-white rounded-lg hover:bg-[#163A5C]"
              >
                Sauvegarder
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Nom</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.nom}
                onChange={(e) => setProfile({ ...profile, nom: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-gray-800">{profile.nom}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Prénom</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.prenom}
                onChange={(e) => setProfile({ ...profile, prenom: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-gray-800">{profile.prenom}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Téléphone</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.telephone}
                onChange={(e) => setProfile({ ...profile, telephone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-gray-800">{profile.telephone}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
              Email
              <Lock size={14} className="text-gray-400" />
            </label>
            <p className="text-gray-800">{profile.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
              Département
              <Lock size={14} className="text-gray-400" />
            </label>
            <p className="text-gray-800">{profile.departement}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
              Niveau
              <Lock size={14} className="text-gray-400" />
            </label>
            <p className="text-gray-800">{profile.niveau}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Encadrant</h3>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="w-16 h-16 rounded-full bg-[#1F4E79] flex items-center justify-center text-white text-xl">
            ST
          </div>
          <div className="flex-1">
            <h4 className="font-medium">Dr. Sonia Trabelsi</h4>
            <p className="text-sm text-gray-600">Professeure, Génie Logiciel</p>
            <p className="text-xs text-gray-500 mt-1">Affecté le 02/10/2024</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">Code ENC</p>
            <p className="font-mono text-lg font-semibold blur-sm select-none">ENC-A7X3K</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Changer le mot de passe</h3>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Mot de passe actuel
            </label>
            <input
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              value={passwords.new}
              onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            onClick={handleChangePassword}
            disabled={!passwords.current || !passwords.new || !passwords.confirm}
            className="px-4 py-2 bg-[#1F4E79] text-white rounded-lg hover:bg-[#163A5C] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Changer le mot de passe
          </button>
        </div>
      </div>
    </div>
  );
}
