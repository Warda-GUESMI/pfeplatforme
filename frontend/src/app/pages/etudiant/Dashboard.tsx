import { useState } from 'react';
import { Target, AlertTriangle, Calendar, Flag } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  priority: 'Faible' | 'Normale' | 'Haute' | 'Critique';
  deadline: string;
  status: 'À faire' | 'En cours' | 'Soumis' | 'Validé';
}

interface Activity {
  id: number;
  message: string;
  time: string;
}

const priorityColors = {
  Faible: 'bg-gray-500',
  Normale: 'bg-blue-500',
  Haute: 'bg-amber-500',
  Critique: 'bg-red-500',
};

export function EtudiantDashboard() {
  const [tasks] = useState<Task[]>([
    { id: 1, title: 'Diagramme de classes', priority: 'Haute', deadline: '2025-01-20', status: 'À faire' },
    { id: 2, title: 'Modèle ER', priority: 'Haute', deadline: '2025-01-22', status: 'À faire' },
    { id: 3, title: 'Wireframes', priority: 'Normale', deadline: '2025-01-25', status: 'À faire' },
    { id: 4, title: 'Spécifications techniques', priority: 'Normale', deadline: '2025-01-23', status: 'En cours' },
    { id: 5, title: 'Maquettes UI', priority: 'Faible', deadline: '2025-01-24', status: 'En cours' },
    { id: 6, title: 'Architecture système', priority: 'Critique', deadline: '2025-01-19', status: 'Soumis' },
    { id: 7, title: 'Recherche bibliographique', priority: 'Normale', deadline: '2025-01-10', status: 'Validé' },
    { id: 8, title: 'État de l\'art', priority: 'Normale', deadline: '2025-01-12', status: 'Validé' },
    { id: 9, title: 'Cahier des charges', priority: 'Haute', deadline: '2025-01-14', status: 'Validé' },
    { id: 10, title: 'Définition du projet', priority: 'Normale', deadline: '2025-01-08', status: 'Validé' },
  ]);

  const activities: Activity[] = [
    { id: 1, message: 'Tâche validée par Dr. Trabelsi', time: 'Il y a 2h' },
    { id: 2, message: 'Nouveau commentaire sur Conception DB', time: 'Il y a 5h' },
    { id: 3, message: 'Réunion confirmée pour le 22 Jan', time: 'Hier' },
    { id: 4, message: 'Tâche "État de l\'art" validée', time: 'Il y a 2 jours' },
    { id: 5, message: 'Message de Dr. Trabelsi', time: 'Il y a 3 jours' },
    { id: 6, message: 'Jalon "Définition" terminé', time: 'Il y a 4 jours' },
    { id: 7, message: 'PFE créé et validé', time: 'Il y a 5 jours' },
    { id: 8, message: 'Affecté à Dr. Trabelsi', time: 'Il y a 6 jours' },
  ];

  const tasksByStatus = {
    'À faire': tasks.filter((t) => t.status === 'À faire'),
    'En cours': tasks.filter((t) => t.status === 'En cours'),
    Soumis: tasks.filter((t) => t.status === 'Soumis'),
    Validé: tasks.filter((t) => t.status === 'Validé'),
  };

  const overdueTasks = tasks.filter((t) => new Date(t.deadline) < new Date() && t.status !== 'Validé');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600">Progression globale</h3>
            <Target className="text-[#1D9E75]" size={24} />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <svg className="transform -rotate-90 w-20 h-20">
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="#1D9E75"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${67 * 2} ${100 * 2}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-[#1D9E75]">
                67%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-6 border border-red-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600">Tâches en retard</h3>
            <AlertTriangle className="text-red-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-red-600">{overdueTasks.length}</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600">Prochaine réunion</h3>
            <Calendar className="text-[#1F4E79]" size={24} />
          </div>
          <p className="text-xl font-bold text-gray-800">Dans 2 jours</p>
          <p className="text-sm text-gray-500 mt-1">22 Jan 2025, 10h00</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600">Jalon actuel</h3>
            <Flag className="text-amber-500" size={24} />
          </div>
          <p className="text-xl font-bold text-gray-800">Conception</p>
          <p className="text-sm text-gray-500 mt-1">85% complété</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Sprint en cours — Semaine du 13 au 20 Jan</h3>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
                <div key={status} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-700">{status}</h4>
                    <span className="text-sm text-gray-500">({statusTasks.length})</span>
                  </div>
                  <div className="space-y-2">
                    {statusTasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-gray-50 rounded-lg p-3 border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                      >
                        <p className="text-sm font-medium text-gray-800 mb-2">{task.title}</p>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs px-2 py-0.5 rounded-full text-white ${priorityColors[task.priority]}`}>
                            {task.priority}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(task.deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Prochaines deadlines</h3>
            <div className="space-y-3">
              {tasks
                .filter((t) => t.status !== 'Validé')
                .slice(0, 5)
                .map((task) => {
                  const isOverdue = new Date(task.deadline) < new Date();
                  return (
                    <div key={task.id} className={`p-3 rounded-lg ${isOverdue ? 'bg-red-50 border border-red-200' : 'bg-gray-50'}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{task.title}</p>
                          <p className="text-xs text-gray-500 mt-1">Conception</p>
                        </div>
                        {isOverdue && <span className="text-xs px-2 py-0.5 bg-red-500 text-white rounded-full">EN RETARD</span>}
                      </div>
                      <p className={`text-xs mt-2 ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
                        {new Date(task.deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Activité récente</h3>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-[#1F4E79] rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">{activity.message}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
