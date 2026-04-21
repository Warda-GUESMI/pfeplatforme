import { useState } from 'react';
import { toast } from 'sonner';

export function AdminComptes() {
  const [activeTab, setActiveTab] = useState<'pending' | 'students' | 'supervisors'>('pending');
  const [pendingCount, setPendingCount] = useState(3);

  const handleValidate = () => {
    setPendingCount(pendingCount - 1);
    toast.success('Compte validé — email de confirmation envoyé');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-6 py-3 font-medium relative ${
              activeTab === 'pending' ? 'text-[#1F4E79] border-b-2 border-[#1F4E79]' : 'text-gray-600'
            }`}
          >
            En attente
            {pendingCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-amber-500 text-white text-xs rounded-full">
                {pendingCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'students' ? 'text-[#1F4E79] border-b-2 border-[#1F4E79]' : 'text-gray-600'
            }`}
          >
            Étudiants
          </button>
          <button
            onClick={() => setActiveTab('supervisors')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'supervisors' ? 'text-[#1F4E79] border-b-2 border-[#1F4E79]' : 'text-gray-600'
            }`}
          >
            Encadrants
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'pending' && (
            <div className="space-y-4">
              {pendingCount > 0 ? (
                Array.from({ length: pendingCount }).map((_, i) => (
                  <div key={i} className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold">Dr. Mohamed Benjmaa</h4>
                    <p className="text-sm text-gray-600 mt-1">m.benjmaa@univ.tn</p>
                    <p className="text-xs text-gray-500 mt-1">Inscrit le 18/01/2025 · Département Génie Informatique</p>
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={handleValidate}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      >
                        Valider
                      </button>
                      <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        Rejeter
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">Aucun compte en attente de validation</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'students' && (
            <div>
              <input
                type="text"
                placeholder="Rechercher un étudiant..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
              />
              <p className="text-gray-600">Liste des étudiants</p>
            </div>
          )}

          {activeTab === 'supervisors' && (
            <div>
              <p className="text-gray-600">Liste des encadrants</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
