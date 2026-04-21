import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Users, ClipboardCheck, Calendar, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface Student {
  id: number;
  name: string;
  pfeTitle: string;
  progress: number;
  status: string;
  lastActivity: string;
}

interface TaskToValidate {
  id: number;
  studentName: string;
  taskTitle: string;
  submittedDate: string;
}

export function EncadrantDashboard() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Tous');
  const [tasksToValidate, setTasksToValidate] = useState<TaskToValidate[]>([
    { id: 1, studentName: 'Ahmed Ben Salem', taskTitle: 'Architecture système', submittedDate: 'Il y a 2h' },
    { id: 2, studentName: 'Fatma Riahi', taskTitle: 'Modèle ER', submittedDate: 'Il y a 5h' },
    { id: 3, studentName: 'Youssef Hamdi', taskTitle: 'Tests unitaires', submittedDate: 'Hier' },
  ]);

  const students: Student[] = [
    {
      id: 1,
      name: 'Ahmed Ben Salem',
      pfeTitle: 'Plateforme e-learning avec IA',
      progress: 67,
      status: 'Sur la bonne trajectoire',
      lastActivity: 'Il y a 2h',
    },
    {
      id: 2,
      name: 'Fatma Riahi',
      pfeTitle: 'Application mobile de gestion',
      progress: 23,
      status: 'En retard',
      lastActivity: 'Il y a 5 jours',
    },
    {
      id: 3,
      name: 'Youssef Hamdi',
      pfeTitle: 'Système de recommandation',
      progress: 91,
      status: 'Sur la bonne trajectoire',
      lastActivity: 'Il y a 1h',
    },
    {
      id: 4,
      name: 'Leila Mansouri',
      pfeTitle: 'Dashboard analytique temps réel',
      progress: 45,
      status: 'Sur la bonne trajectoire',
      lastActivity: 'Il y a 1 jour',
    },
    {
      id: 5,
      name: 'Karim Bouzid',
      pfeTitle: 'Blockchain pour IoT',
      progress: 82,
      status: 'Sur la bonne trajectoire',
      lastActivity: 'Il y a 3h',
    },
  ];

  const filteredStudents = students.filter((s) => {
    if (filter === 'Tous') return true;
    if (filter === 'En retard') return s.status === 'En retard';
    if (filter === 'Inactifs') return s.lastActivity.includes('jours');
    if (filter === 'Sur la bonne trajectoire') return s.status === 'Sur la bonne trajectoire';
    if (filter === 'Terminés') return s.progress === 100;
    return true;
  });

  const handleValidate = (taskId: number) => {
    setTasksToValidate(tasksToValidate.filter((t) => t.id !== taskId));
    toast.success('Tâche validée');
  };

  const handleReject = (taskId: number) => {
    setTasksToValidate(tasksToValidate.filter((t) => t.id !== taskId));
    toast.info('Correction demandée');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600">Étudiants encadrés</h3>
            <Users className="text-[#1F4E79]" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-800">5</p>
        </div>

        <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600">Tâches à valider</h3>
            <ClipboardCheck className="text-amber-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-amber-600">{tasksToValidate.length}</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600">Réunion aujourd'hui</h3>
            <Calendar className="text-[#1D9E75]" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-800">1</p>
        </div>

        <div className="bg-red-50 rounded-lg p-6 border border-red-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600">Étudiants en retard</h3>
            <AlertTriangle className="text-red-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-red-600">
            {students.filter((s) => s.status === 'En retard').length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Mes étudiants</h3>
            <div className="flex gap-2">
              {['Tous', 'En retard', 'Inactifs', 'Sur la bonne trajectoire', 'Terminés'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filter === f
                      ? 'bg-[#1F4E79] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Étudiant</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Titre PFE</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Progression</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Statut</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Dernière activité</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b border-gray-100">
                    <td className="py-3 px-2 text-gray-800">{student.name}</td>
                    <td className="py-3 px-2 text-gray-600">{student.pfeTitle}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
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
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          student.status === 'En retard'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-gray-600 text-sm">{student.lastActivity}</td>
                    <td className="py-3 px-2">
                      <button
                        onClick={() => navigate(`/encadrant/etudiants/${student.id}`)}
                        className="px-3 py-1 bg-[#1F4E79] text-white rounded hover:bg-[#163A5C] text-sm"
                      >
                        Voir PFE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">File de validation</h3>
              <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                {tasksToValidate.length}
              </span>
            </div>
            <div className="space-y-3">
              {tasksToValidate.map((task) => (
                <div key={task.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="font-medium text-sm text-gray-800">{task.studentName}</p>
                  <p className="text-sm text-gray-600 mt-1">{task.taskTitle}</p>
                  <p className="text-xs text-gray-500 mt-1">{task.submittedDate}</p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleValidate(task.id)}
                      className="flex-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                    >
                      Valider
                    </button>
                    <button
                      onClick={() => handleReject(task.id)}
                      className="flex-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      À corriger
                    </button>
                  </div>
                </div>
              ))}
              {tasksToValidate.length === 0 && (
                <div className="text-center py-8">
                  <ClipboardCheck size={48} className="mx-auto text-green-500 mb-2" />
                  <p className="text-sm text-gray-600">Toutes les tâches ont été validées</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold mb-4">Réunions à venir</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-medium text-sm">Bilan Conception</p>
                <p className="text-sm text-gray-600 mt-1">Ahmed Ben Salem</p>
                <p className="text-xs text-gray-500 mt-1">22 Jan, 10h00</p>
                <a
                  href="https://meet.google.com/abc-defg-hij"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-sm text-blue-600 hover:underline"
                >
                  Lien Google Meet
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
