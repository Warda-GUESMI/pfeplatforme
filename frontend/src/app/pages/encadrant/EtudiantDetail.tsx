export function EncadrantEtudiantDetail() {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-4">Ahmed Ben Salem</h2>
      <p className="text-gray-600">Détail du PFE et suivi étudiant</p>
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-sm text-gray-600">Progression globale</p>
          <p className="text-sm font-medium text-[#1D9E75]">67%</p>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#1D9E75] rounded-full" style={{ width: '67%' }}></div>
        </div>
      </div>
    </div>
  );
}
