import { useNavigate } from 'react-router';

export function EncadrantEtudiants() {
  const navigate = useNavigate();

  const students = [
    { id: 1, name: 'Ahmed Ben Salem', pfeTitle: 'Plateforme e-learning avec IA', progress: 67 },
    { id: 2, name: 'Fatma Riahi', pfeTitle: 'Application mobile de gestion', progress: 23 },
    { id: 3, name: 'Youssef Hamdi', pfeTitle: 'Système de recommandation', progress: 91 },
    { id: 4, name: 'Leila Mansouri', pfeTitle: 'Dashboard analytique temps réel', progress: 45 },
    { id: 5, name: 'Karim Bouzid', pfeTitle: 'Blockchain pour IoT', progress: 82 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="grid gap-4">
          {students.map((student) => (
            <div key={student.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{student.name}</h3>
                  <p className="text-gray-600 mt-1">{student.pfeTitle}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden max-w-xs">
                      <div
                        className={`h-full rounded-full ${
                          student.progress < 40
                            ? 'bg-red-500'
                            : student.progress < 70
                            ? 'bg-amber-500'
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{student.progress}%</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/encadrant/etudiants/${student.id}`)}
                  className="px-4 py-2 bg-[#1F4E79] text-white rounded-lg hover:bg-[#163A5C]"
                >
                  Voir détails
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
