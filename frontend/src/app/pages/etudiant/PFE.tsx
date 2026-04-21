import { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle, Download } from 'lucide-react';

interface Milestone {
  id: number;
  title: string;
  status: 'Terminé' | 'En cours' | 'Non commencé';
  progress: number;
  dates: string;
  tasks: { id: number; title: string; status: string }[];
  comment?: string;
}

export function EtudiantPFE() {
  const [expandedMilestone, setExpandedMilestone] = useState(3);

  const milestones: Milestone[] = [
    {
      id: 1,
      title: 'Définition du sujet',
      status: 'Terminé',
      progress: 100,
      dates: '01/10/24 - 10/10/24',
      tasks: [
        { id: 1, title: 'Fiche projet', status: 'Validé' },
        { id: 2, title: 'Objectifs', status: 'Validé' },
      ],
    },
    {
      id: 2,
      title: 'État de l\'art',
      status: 'Terminé',
      progress: 100,
      dates: '11/10/24 - 30/10/24',
      tasks: [
        { id: 3, title: 'Recherche bibliographique', status: 'Validé' },
        { id: 4, title: 'Analyse de l\'existant', status: 'Validé' },
      ],
    },
    {
      id: 3,
      title: 'Conception',
      status: 'En cours',
      progress: 85,
      dates: '01/11/24 - 15/01/25',
      tasks: [
        { id: 5, title: 'Diagramme de classes', status: 'En cours' },
        { id: 6, title: 'Modèle ER', status: 'En cours' },
        { id: 7, title: 'Architecture système', status: 'Soumis' },
        { id: 8, title: 'Cahier des charges', status: 'Validé' },
      ],
      comment: 'Bon travail sur l\'architecture. Attention aux détails du diagramme de classes.',
    },
    {
      id: 4,
      title: 'Développement',
      status: 'En cours',
      progress: 30,
      dates: '16/01/25 - 30/04/25',
      tasks: [
        { id: 9, title: 'Backend API', status: 'En cours' },
        { id: 10, title: 'Frontend', status: 'Non commencé' },
        { id: 11, title: 'Base de données', status: 'En cours' },
      ],
    },
    {
      id: 5,
      title: 'Tests et validation',
      status: 'Non commencé',
      progress: 0,
      dates: '01/05/25 - 30/05/25',
      tasks: [],
    },
    {
      id: 6,
      title: 'Rapport et soutenance',
      status: 'Non commencé',
      progress: 0,
      dates: '01/06/25 - 30/06/25',
      tasks: [],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Développement d'une plateforme e-learning avec IA
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-600">Étudiant</p>
            <p className="font-medium">Ahmed Ben Salem</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Encadrant</p>
            <p className="font-medium">Dr. Sonia Trabelsi</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Début</p>
            <p className="font-medium">01/10/2024</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Soutenance prévue</p>
            <p className="font-medium">30/06/2025</p>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Progression globale</p>
            <p className="text-sm font-medium text-[#1D9E75]">67%</p>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-[#1D9E75] rounded-full" style={{ width: '67%' }}></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-6">Timeline des jalons</h3>
        <div className="space-y-4">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="border-l-4 border-[#1F4E79] pl-6 relative">
              <div
                className={`absolute left-[-8px] top-2 w-4 h-4 rounded-full border-2 border-[#1F4E79] ${
                  milestone.status === 'Terminé' ? 'bg-green-500' : milestone.status === 'En cours' ? 'bg-amber-500' : 'bg-gray-300'
                }`}
              ></div>
              <div className="bg-gray-50 rounded-lg p-4">
                <button
                  onClick={() => setExpandedMilestone(expandedMilestone === milestone.id ? 0 : milestone.id)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {expandedMilestone === milestone.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-800">{milestone.title}</h4>
                      <p className="text-sm text-gray-500">{milestone.dates}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        milestone.status === 'Terminé'
                          ? 'bg-green-100 text-green-700'
                          : milestone.status === 'En cours'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {milestone.status}
                    </span>
                    {milestone.status !== 'Non commencé' && (
                      <div className="flex items-center gap-2">
                        <div className="relative w-12 h-12">
                          <svg className="transform -rotate-90 w-12 h-12">
                            <circle cx="24" cy="24" r="20" stroke="#E5E7EB" strokeWidth="4" fill="none" />
                            <circle
                              cx="24"
                              cy="24"
                              r="20"
                              stroke={milestone.status === 'Terminé' ? '#1D9E75' : '#BA7517'}
                              strokeWidth="4"
                              fill="none"
                              strokeDasharray={`${milestone.progress * 1.26} ${100 * 1.26}`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                            {milestone.progress}%
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </button>

                {expandedMilestone === milestone.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                    {milestone.comment && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-gray-600 mb-1">Commentaire de l'encadrant:</p>
                        <p className="text-sm text-gray-800">{milestone.comment}</p>
                      </div>
                    )}
                    {milestone.tasks.length > 0 ? (
                      <div className="space-y-2">
                        {milestone.tasks.map((task) => (
                          <div key={task.id} className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                            <span className="text-sm text-gray-800">{task.title}</span>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                task.status === 'Validé'
                                  ? 'bg-green-100 text-green-700'
                                  : task.status === 'Soumis'
                                  ? 'bg-blue-100 text-blue-700'
                                  : task.status === 'En cours'
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {task.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">Aucune tâche pour ce jalon</p>
                    )}
                    {milestone.status === 'Terminé' && (
                      <button className="flex items-center gap-2 text-sm text-[#1F4E79] hover:underline">
                        <Download size={16} />
                        Télécharger le livrable
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <button className="flex items-center justify-between w-full mb-4">
          <h3 className="text-lg font-semibold">Fiche Projet</h3>
          <ChevronRight size={20} />
        </button>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Modifié le 05/10/2024 — Validé par Dr. Trabelsi</p>
        </div>
      </div>
    </div>
  );
}
