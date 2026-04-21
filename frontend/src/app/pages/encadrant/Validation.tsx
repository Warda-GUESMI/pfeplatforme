import { useState } from 'react';
import { toast } from 'sonner';
import { ClipboardCheck } from 'lucide-react';

interface Task {
  id: number;
  student: string;
  task: string;
  jalon: string;
  submittedDate: string;
}

export function EncadrantValidation() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, student: 'Ahmed Ben Salem', task: 'Architecture système', jalon: 'Conception', submittedDate: 'Il y a 2h' },
    { id: 2, student: 'Fatma Riahi', task: 'Modèle ER', jalon: 'Conception', submittedDate: 'Il y a 5h' },
    { id: 3, student: 'Youssef Hamdi', task: 'Tests unitaires', jalon: 'Développement', submittedDate: 'Hier' },
  ]);

  const handleValidate = (taskId: number) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
    toast.success('Tâche validée');
  };

  const handleReject = (taskId: number) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
    toast.info('Correction demandée');
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg p-12 border border-gray-200 text-center">
        <ClipboardCheck size={64} className="mx-auto text-green-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Toutes les tâches sont validées</h3>
        <p className="text-gray-600">Aucune tâche en attente de validation</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">File de validation</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Étudiant</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Tâche</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Jalon</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Soumis le</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Fichier</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-800">{task.student}</td>
                <td className="py-3 px-4 text-gray-800">{task.task}</td>
                <td className="py-3 px-4 text-gray-600">{task.jalon}</td>
                <td className="py-3 px-4 text-gray-600">{task.submittedDate}</td>
                <td className="py-3 px-4">
                  <button className="text-[#1F4E79] hover:underline text-sm">Voir fichier</button>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleValidate(task.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                    >
                      Valider
                    </button>
                    <button
                      onClick={() => handleReject(task.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      À corriger
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
