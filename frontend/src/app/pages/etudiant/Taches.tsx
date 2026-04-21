import { useState } from 'react';
import { Search } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  jalon: string;
  priority: 'Faible' | 'Normale' | 'Haute' | 'Critique';
  deadline: string;
  status: 'Non commencé' | 'En cours' | 'Soumis' | 'Validé';
}

const priorityColors = {
  Faible: 'bg-gray-500',
  Normale: 'bg-blue-500',
  Haute: 'bg-amber-500',
  Critique: 'bg-red-500',
};

const statusColors = {
  'Non commencé': 'bg-gray-100 text-gray-700',
  'En cours': 'bg-amber-100 text-amber-700',
  Soumis: 'bg-blue-100 text-blue-700',
  Validé: 'bg-green-100 text-green-700',
};

export function EtudiantTaches() {
  const [searchQuery, setSearchQuery] = useState('');
  const [jalonFilter, setJalonFilter] = useState('Tous');
  const [statutFilter, setStatutFilter] = useState('Tous');
  const [prioriteFilter, setPrioriteFilter] = useState('Tous');

  const allTasks: Task[] = [
    { id: 1, title: 'Diagramme de classes', jalon: 'Conception', priority: 'Haute', deadline: '2025-01-20', status: 'En cours' },
    { id: 2, title: 'Modèle ER', jalon: 'Conception', priority: 'Haute', deadline: '2025-01-22', status: 'En cours' },
    { id: 3, title: 'Architecture système', jalon: 'Conception', priority: 'Critique', deadline: '2025-01-19', status: 'Soumis' },
    { id: 4, title: 'Rapport d\'analyse', jalon: 'Conception', priority: 'Normale', deadline: '2025-01-15', status: 'Validé' },
    { id: 5, title: 'Backend API', jalon: 'Développement', priority: 'Haute', deadline: '2025-02-10', status: 'En cours' },
    { id: 6, title: 'Base de données', jalon: 'Développement', priority: 'Haute', deadline: '2025-02-05', status: 'En cours' },
    { id: 7, title: 'Frontend', jalon: 'Développement', priority: 'Normale', deadline: '2025-02-20', status: 'Non commencé' },
    { id: 8, title: 'Tests unitaires', jalon: 'Développement', priority: 'Normale', deadline: '2025-02-25', status: 'Non commencé' },
    { id: 9, title: 'Recherche bibliographique', jalon: 'État de l\'art', priority: 'Normale', deadline: '2025-01-10', status: 'Validé' },
    { id: 10, title: 'Analyse de l\'existant', jalon: 'État de l\'art', priority: 'Faible', deadline: '2025-01-12', status: 'Validé' },
    { id: 11, title: 'Cahier des charges', jalon: 'Conception', priority: 'Haute', deadline: '2025-01-14', status: 'Validé' },
    { id: 12, title: 'Wireframes', jalon: 'Conception', priority: 'Normale', deadline: '2025-01-25', status: 'Non commencé' },
  ];

  const tasks = allTasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesJalon = jalonFilter === 'Tous' || task.jalon === jalonFilter;
    const matchesStatut = statutFilter === 'Tous' || task.status === statutFilter;
    const matchesPriorite = prioriteFilter === 'Tous' || task.priority === prioriteFilter;
    return matchesSearch && matchesJalon && matchesStatut && matchesPriorite;
  });

  const isOverdue = (deadline: string, status: string) => {
    return new Date(deadline) < new Date() && status !== 'Validé';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher une tâche..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79]"
            />
          </div>
          <select
            value={jalonFilter}
            onChange={(e) => setJalonFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79]"
          >
            <option>Tous</option>
            <option>Conception</option>
            <option>Développement</option>
            <option>État de l'art</option>
          </select>
          <select
            value={statutFilter}
            onChange={(e) => setStatutFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79]"
          >
            <option>Tous</option>
            <option>Non commencé</option>
            <option>En cours</option>
            <option>Soumis</option>
            <option>Validé</option>
          </select>
          <select
            value={prioriteFilter}
            onChange={(e) => setPrioriteFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79]"
          >
            <option>Tous</option>
            <option>Faible</option>
            <option>Normale</option>
            <option>Haute</option>
            <option>Critique</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Tâche</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Jalon</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Priorité</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Deadline</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Statut</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className={`border-b border-gray-100 ${
                    isOverdue(task.deadline, task.status)
                      ? 'bg-red-50'
                      : task.status === 'Validé'
                      ? 'bg-green-50'
                      : ''
                  }`}
                >
                  <td className="py-3 px-4 text-gray-800">{task.title}</td>
                  <td className="py-3 px-4 text-gray-600">{task.jalon}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-white text-sm ${priorityColors[task.priority]}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className={`py-3 px-4 ${isOverdue(task.deadline, task.status) ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                    {new Date(task.deadline).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${statusColors[task.status]}`}>{task.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-[#1F4E79] text-white rounded hover:bg-[#163A5C] text-sm">
                        Voir
                      </button>
                      {task.status === 'En cours' && (
                        <button className="px-3 py-1 bg-[#1D9E75] text-white rounded hover:bg-[#177A5D] text-sm">
                          Soumettre
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
