export function AdminAffectations() {
  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <h3 className="font-semibold mb-4">Étudiants sans encadrant</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <p className="font-medium">Karim Mansouri</p>
            <button className="px-4 py-2 bg-[#1F4E79] text-white rounded-lg hover:bg-[#163A5C]">
              Affecter
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <p className="font-medium">Leila Hamdi</p>
            <button className="px-4 py-2 bg-[#1F4E79] text-white rounded-lg hover:bg-[#163A5C]">
              Affecter
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Affectations actuelles</h3>
        <div className="space-y-3">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Dr. Sonia Trabelsi</p>
                <div className="flex gap-2 mt-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Ahmed Ben Salem</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Fatma Riahi</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">+2 autres</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Charge</p>
                <p className="font-medium">4/5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
