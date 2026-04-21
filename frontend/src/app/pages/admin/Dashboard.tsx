import { Users, UserCog, Briefcase, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function AdminDashboard() {
  const pieData = [
    { name: 'En cours', value: 28, color: '#3B82F6' },
    { name: 'En retard', value: 6, color: '#EF4444' },
    { name: 'Terminé', value: 4, color: '#10B981' },
    { name: 'Non démarré', value: 8, color: '#9CA3AF' },
  ];

  const barData = [
    { name: 'Dr. Trabelsi', progression: 62 },
    { name: 'Dr. Mejri', progression: 45 },
    { name: 'Dr. Gharbi', progression: 78 },
    { name: 'Dr. Ben Ali', progression: 51 },
    { name: 'Dr. Sassi', progression: 68 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="text-amber-600" size={24} />
          <p className="text-amber-800">
            <span className="font-semibold">3 comptes encadrants</span> en attente de validation
          </p>
        </div>
        <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
          Valider maintenant
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600">Étudiants</h3>
            <Users className="text-[#1F4E79]" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-800">45</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600">Encadrants</h3>
            <UserCog className="text-[#1D9E75]" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-800">8</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600">PFE actifs</h3>
            <Briefcase className="text-blue-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-800">38</p>
        </div>

        <div className="bg-red-50 rounded-lg p-6 border border-red-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600">PFE en retard</h3>
            <AlertTriangle className="text-red-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-red-600">6</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Statut des PFE</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Progression moyenne par encadrant</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="progression" fill="#1F4E79" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-amber-200 border-2">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-amber-600 flex-shrink-0" size={24} />
          <div>
            <h3 className="font-semibold text-lg mb-2">Étudiants sans encadrant</h3>
            <p className="text-gray-600 mb-4">2 étudiants en attente d'affectation</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                <div>
                  <p className="font-medium">Karim Mansouri</p>
                  <p className="text-sm text-gray-600">depuis 5 jours</p>
                </div>
                <button className="px-4 py-2 bg-[#1F4E79] text-white rounded-lg hover:bg-[#163A5C]">
                  Affecter manuellement
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                <div>
                  <p className="font-medium">Leila Hamdi</p>
                  <p className="text-sm text-gray-600">depuis 12 jours</p>
                </div>
                <button className="px-4 py-2 bg-[#1F4E79] text-white rounded-lg hover:bg-[#163A5C]">
                  Affecter manuellement
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
