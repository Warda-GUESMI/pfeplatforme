import { useState } from 'react';
import { Calendar, Clock, Download, Video } from 'lucide-react';
import { toast } from 'sonner';

interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  status: 'Confirmée' | 'En attente' | 'Annulée';
  agenda?: string[];
  compteRendu?: string;
  meetLink?: string;
}

export function EtudiantReunions() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '',
    duration: '45min',
    agenda: '',
  });

  const meetings: Meeting[] = [
    {
      id: 1,
      title: 'Bilan Conception',
      date: '2025-01-22',
      time: '10:00',
      duration: '45 min',
      status: 'Confirmée',
      agenda: [
        'Revue du diagramme de classes',
        'Discussion sur l\'architecture',
        'Prochaines étapes du développement',
      ],
      meetLink: 'https://meet.google.com/abc-defg-hij',
    },
    {
      id: 2,
      title: 'Point d\'avancement',
      date: '2025-01-08',
      time: '14:00',
      duration: '30 min',
      status: 'Confirmée',
      compteRendu:
        'Bonne progression sur la phase de conception. Le diagramme de classes nécessite quelques ajustements. Prochaine réunion prévue pour valider l\'architecture globale.',
    },
  ];

  const handleCreateMeeting = () => {
    if (newMeeting.title && newMeeting.date && newMeeting.time) {
      toast.success('Demande de réunion envoyée à Dr. Trabelsi — lien Meet généré');
      setShowCreateModal(false);
      setNewMeeting({ title: '', date: '', time: '', duration: '45min', agenda: '' });
    }
  };

  const upcomingMeetings = meetings.filter((m) => new Date(m.date) >= new Date());
  const pastMeetings = meetings.filter((m) => new Date(m.date) < new Date());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Réunions</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-[#1F4E79] text-white rounded-lg hover:bg-[#163A5C]"
        >
          Proposer une réunion
        </button>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="font-semibold mb-4">Janvier 2025</h3>
        <div className="grid grid-cols-7 gap-2">
          {['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }, (_, i) => {
            const day = i - 2;
            const hasMeeting = day === 8 || day === 22;
            return (
              <div
                key={i}
                className={`text-center py-3 rounded ${
                  day > 0 && day <= 31
                    ? hasMeeting
                      ? 'bg-[#1F4E79] text-white font-semibold cursor-pointer'
                      : 'hover:bg-gray-100 cursor-pointer'
                    : 'text-gray-300'
                }`}
              >
                {day > 0 && day <= 31 ? day : ''}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        {upcomingMeetings.map((meeting) => (
          <div key={meeting.id} className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">{meeting.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    {new Date(meeting.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    {meeting.time} · {meeting.duration}
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                {meeting.status}
              </span>
            </div>

            {meeting.meetLink && (
              <a
                href={meeting.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mb-4"
              >
                <Video size={18} />
                Rejoindre Google Meet
              </a>
            )}

            {meeting.agenda && (
              <div>
                <h4 className="font-medium mb-2">Ordre du jour:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {meeting.agenda.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        {pastMeetings.map((meeting) => (
          <div key={meeting.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">{meeting.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    {new Date(meeting.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </div>
            </div>

            {meeting.compteRendu && (
              <div className="bg-white p-4 rounded-lg mb-3">
                <h4 className="font-medium mb-2">Compte-rendu:</h4>
                <p className="text-sm text-gray-700">{meeting.compteRendu}</p>
              </div>
            )}

            <button className="flex items-center gap-2 text-sm text-[#1F4E79] hover:underline">
              <Download size={16} />
              Télécharger compte-rendu
            </button>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Proposer une réunion</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Titre</label>
                <input
                  type="text"
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Heure</label>
                  <input
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Durée</label>
                <select
                  value={newMeeting.duration}
                  onChange={(e) => setNewMeeting({ ...newMeeting, duration: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option>30min</option>
                  <option>45min</option>
                  <option>1h</option>
                  <option>1h30</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ordre du jour</label>
                <textarea
                  value={newMeeting.agenda}
                  onChange={(e) => setNewMeeting({ ...newMeeting, agenda: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                ></textarea>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  Un lien Google Meet sera généré automatiquement
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleCreateMeeting}
                className="flex-1 px-4 py-2 bg-[#1F4E79] text-white rounded-lg hover:bg-[#163A5C]"
              >
                Proposer la réunion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
