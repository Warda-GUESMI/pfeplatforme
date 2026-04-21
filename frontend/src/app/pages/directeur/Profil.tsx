import { useState } from 'react';
import { Lock, Camera, Mail, Phone, Building } from 'lucide-react';
import { toast } from 'sonner';

export function DirecteurProfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    nom: 'Hamdi',
    prenom: 'Salah',
    telephone: '+216 71 123 456',
    email: 'salah.hamdi@univ.tn',
    grade: 'Professeur',
    bureau: 'Direction - A-101',
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

  const stats = [
    { label: 'Départements supervisés', value: '3', icon: <Building size={24} className="text-[#1F4E79]" /> },
    { label: 'Total PFE actifs', value: '95', icon: <Building size={24} className="text-[#1D9E75]" /> },
    { label: 'Encadrants', value: '19', icon: <Building size={24} className="text-blue-600" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-start gap-6 mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-[#1F4E79] flex items-center justify-center text-white text-3xl">
              SH
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50">
              <Camera size={16} />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">
              {profile.prenom} {profile.nom}
            </h2>
            <p className="text-gray-600 mb-1">Directeur des Stages et PFE</p>
            <p className="text-sm text-gray-500">{profile.grade}</p>
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
            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
              <Mail size={14} />
              Email
              <Lock size={14} className="text-gray-400" />
            </label>
            <p className="text-gray-800">{profile.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
              <Phone size={14} />
              Téléphone
            </label>
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
            <label className="block text-sm font-medium text-gray-600 mb-1">Grade</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.grade}
                onChange={(e) => setProfile({ ...profile, grade: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-gray-800">{profile.grade}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Bureau</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.bureau}
                onChange={(e) => setProfile({ ...profile, bureau: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-gray-800">{profile.bureau}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">{stat.label}</p>
              {stat.icon}
            </div>
            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Départements sous supervision</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-semibold mb-2">Génie Informatique</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>38 PFE actifs</p>
              <p>8 encadrants</p>
              <p className="text-green-600 font-medium">Progression: 65%</p>
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-semibold mb-2">Génie électrique</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>32 PFE actifs</p>
              <p>6 encadrants</p>
              <p className="text-amber-600 font-medium">Progression: 58%</p>
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-semibold mb-2">Génie industriel</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>25 PFE actifs</p>
              <p>5 encadrants</p>
              <p className="text-green-600 font-medium">Progression: 71%</p>
            </div>
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
