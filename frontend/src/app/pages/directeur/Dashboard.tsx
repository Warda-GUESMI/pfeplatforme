import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { AlertTriangle, Download } from 'lucide-react';
import { toast } from 'sonner';

export function DirecteurDashboard() {
  const [activeDept, setActiveDept] = useState('Génie Informatique');

  const departments = ['Génie Informatique', 'Génie électrique', 'Génie industriel'];

  const comparisonData = [
    { dept: 'G. Info', progression: 65, retards: 12, encadrement: 85 },
    { dept: 'G. Élec', progression: 58, retards: 28, encadrement: 72 },
    { dept: 'G. Indus', progression: 71, retards: 8, encadrement: 90 },
  ];

  const monthlyData = [
    { month: 'Sep', 'G. Info': 35, 'G. Élec': 28, 'G. Indus': 22 },
    { month: 'Oct', 'G. Info': 36, 'G. Élec': 30, 'G. Indus': 23 },
    { month: 'Nov', 'G. Info': 37, 'G. Élec': 31, 'G. Indus': 24 },
    { month: 'Déc', 'G. Info': 38, 'G. Élec': 32, 'G. Indus': 25 },
    { month: 'Jan', 'G. Info': 38, 'G. Élec': 32, 'G. Indus': 25 },
  ];

  const radarData = [
    { axis: 'Progression', 'Génie Informatique': 65, 'Génie électrique': 58, 'Génie industriel': 71 },
    { axis: 'Retards', 'Génie Informatique': 12, 'Génie électrique': 28, 'Génie industriel': 8 },
    { axis: 'Encadrement', 'Génie Informatique': 85, 'Génie électrique': 72, 'Génie industriel': 90 },
  ];

  const deptStats = {
    'Génie Informatique': { actifs: 38, progression: 65, retards: 12, encadrants: 8 },
    'Génie électrique': { actifs: 32, progression: 58, retards: 28, encadrants: 6 },
    'Génie industriel': { actifs: 25, progression: 71, retards: 8, encadrants: 5 },
  };

  const currentStats = deptStats[activeDept as keyof typeof deptStats];

  const handleExport = () => {
    toast.info('Rapport en cours de génération...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeDept === dept
                  ? 'bg-[#1F4E79] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-[#1F4E79] text-white rounded-lg hover:bg-[#163A5C]"
        >
          <Download size={18} />
          Exporter rapport PDF
        </button>
      </div>

      {activeDept === 'Génie électrique' && (
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="text-red-600 flex-shrink-0" size={24} />
          <div>
            <p className="font-semibold text-red-800">Alerte critique</p>
            <p className="text-red-700 text-sm">
              Département Génie électrique — 28% de PFE en retard — au-dessus du seuil critique de 20%
            </p>
          </div>
          <button className="ml-auto text-red-600 hover:text-red-800">✕</button>
        </div>
      )}

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-gray-600 mb-2">PFE actifs</h3>
          <p className="text-3xl font-bold text-gray-800">{currentStats.actifs}</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-gray-600 mb-2">Progression moyenne</h3>
          <p className="text-3xl font-bold text-[#1D9E75]">{currentStats.progression}%</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-gray-600 mb-2">Taux de retard</h3>
          <p className={`text-3xl font-bold ${currentStats.retards > 20 ? 'text-red-600' : 'text-gray-800'}`}>
            {currentStats.retards}%
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-gray-600 mb-2">Encadrants actifs</h3>
          <p className="text-3xl font-bold text-gray-800">{currentStats.encadrants}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Comparaison départements</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={comparisonData}>
              <XAxis dataKey="dept" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="progression" fill="#1D9E75" name="Progression" />
              <Bar dataKey="retards" fill="#EF4444" name="Retards" />
              <Bar dataKey="encadrement" fill="#3B82F6" name="Encadrement" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Évolution mensuelle des PFE actifs</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Informatique" stroke="#1F4E79" />
              <Line type="monotone" dataKey="Réseaux" stroke="#EF4444" />
              <Line type="monotone" dataKey="Logiciel" stroke="#1D9E75" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Vue radar - Comparaison globale</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="axis" />
            <PolarRadiusAxis />
            <Radar name="Génie Informatique" dataKey="Génie Informatique" stroke="#1F4E79" fill="#1F4E79" fillOpacity={0.6} />
            <Radar name="Génie électrique" dataKey="Génie électrique" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
            <Radar name="Génie industriel" dataKey="Génie industriel" stroke="#1D9E75" fill="#1D9E75" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Performance par département</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Génie Informatique</span>
                <span className="text-sm text-gray-600">38 PFE actifs</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="bg-green-50 p-2 rounded text-center">
                  <p className="text-gray-600">Progression</p>
                  <p className="font-bold text-green-700">65%</p>
                </div>
                <div className="bg-amber-50 p-2 rounded text-center">
                  <p className="text-gray-600">En retard</p>
                  <p className="font-bold text-amber-700">12%</p>
                </div>
                <div className="bg-blue-50 p-2 rounded text-center">
                  <p className="text-gray-600">Encadrement</p>
                  <p className="font-bold text-blue-700">85%</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Génie électrique</span>
                <span className="text-sm text-gray-600">32 PFE actifs</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="bg-green-50 p-2 rounded text-center">
                  <p className="text-gray-600">Progression</p>
                  <p className="font-bold text-green-700">58%</p>
                </div>
                <div className="bg-red-50 p-2 rounded text-center">
                  <p className="text-gray-600">En retard</p>
                  <p className="font-bold text-red-700">28%</p>
                </div>
                <div className="bg-blue-50 p-2 rounded text-center">
                  <p className="text-gray-600">Encadrement</p>
                  <p className="font-bold text-blue-700">72%</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Génie industriel</span>
                <span className="text-sm text-gray-600">25 PFE actifs</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="bg-green-50 p-2 rounded text-center">
                  <p className="text-gray-600">Progression</p>
                  <p className="font-bold text-green-700">71%</p>
                </div>
                <div className="bg-green-50 p-2 rounded text-center">
                  <p className="text-gray-600">En retard</p>
                  <p className="font-bold text-green-700">8%</p>
                </div>
                <div className="bg-blue-50 p-2 rounded text-center">
                  <p className="text-gray-600">Encadrement</p>
                  <p className="font-bold text-blue-700">90%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Indicateurs clés globaux</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Total PFE actifs</p>
                <p className="text-2xl font-bold text-gray-800">95</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-green-600">+5% vs mois dernier</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Taux de réussite moyen</p>
                <p className="text-2xl font-bold text-green-600">64.7%</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-green-600">+2.3% vs année dernière</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Encadrants actifs</p>
                <p className="text-2xl font-bold text-gray-800">19</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600">Charge moy: 5 PFE</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div>
                <p className="text-sm text-gray-600">PFE en retard critique</p>
                <p className="text-2xl font-bold text-amber-700">16%</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-amber-700">Action requise</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Recommandations</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertTriangle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <div className="flex-1">
              <p className="font-medium text-red-800">Intervention urgente - Génie électrique</p>
              <p className="text-sm text-red-700 mt-1">
                28% de PFE en retard. Recommandation: organiser une réunion avec les encadrants du département pour identifier les blocages.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="w-5 h-5 rounded-full bg-blue-500 flex-shrink-0 mt-0.5"></div>
            <div className="flex-1">
              <p className="font-medium text-blue-800">Optimisation - Génie industriel</p>
              <p className="text-sm text-blue-700 mt-1">
                Excellent taux de progression (71%). Recommandation: documenter et partager les bonnes pratiques avec les autres départements.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="w-5 h-5 rounded-full bg-green-500 flex-shrink-0 mt-0.5"></div>
            <div className="flex-1">
              <p className="font-medium text-green-800">Amélioration continue - Génie Informatique</p>
              <p className="text-sm text-green-700 mt-1">
                Performance stable avec 65% de progression. Recommandation: maintenir le rythme actuel et surveiller les PFE à risque.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
