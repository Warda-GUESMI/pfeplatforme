import { useState } from 'react';
import { Calendar, Clock, Video, Download, Edit } from 'lucide-react';
import { toast } from 'sonner';

interface Meeting {
  id: number;
  title: string;
  studentName: string;
  date: string;
  time: string;
  duration: string;
  status: 'Confirmée' | 'En attente' | 'Annulée';
  agenda?: string[];
  compteRendu?: string;
  meetLink?: string;
}

export function EncadrantReunions() {
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: 1,
      title: 'Bilan Conception',
      studentName: 'Ahmed Ben Salem',
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
      title: 'Suivi Backend',
      studentName: 'Fatma Riahi',
      date: '2025-01-23',
      time: '14:00',
      duration: '30 min',
      status: 'Confirmée',
      meetLink: 'https://meet.google.com/xyz-wxyz-abc',
    },
    {
      id: 3,
      title: 'Point d\'avancement',
      studentName: 'Ahmed Ben Salem',
      date: '2025-01-08',
      time: '14:00',
      duration: '30 min',
      status: 'Confirmée',
      compteRendu: 'Bonne progression sur la phase de conception. Le diagramme de classes nécessite quelques ajustements. Prochaine réunion prévue pour valider l\'architecture globale.',
    },
    {
      id: 4,
      title: 'Validation Tests',
      studentName: 'Youssef Hamdi',
      date: '2025-01-10',
      time: '11:00',
      duration: '45 min',
      status: 'Confirmée',
      compteRendu: 'Tests unitaires bien implémentés. Couverture à 85%. Besoin d\'ajouter des tests d\'intégration.',
    },
  ]);

  const [showCompteRenduModal, setShowCompteRenduModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [compteRenduText, setCompteRenduText] = useState('');

  const upcomingMeetings = meetings.filter((m) => new Date(m.date) >= new Date());
  const pastMeetings = meetings.filter((m) => new Date(m.date) < new Date());

  const handleAddCompteRendu = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setCompteRenduText(meeting.compteRendu || '');
    setShowCompteRenduModal(true);
  };

  const handleSaveCompteRendu = () => {
    if (selectedMeeting) {
      setMeetings(
        meetings.map((m) =>
          m.id === selectedMeeting.id ? { ...m, compteRendu: compteRenduText } : m
        )
      );
      toast.success('Compte-rendu enregistré');
      setShowCompteRenduModal(false);
      setSelectedMeeting(null);
      setCompteRenduText('');
    }
  };

  const handleCancelMeeting = (meetingId: number) => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir annuler cette réunion ?');
    if (confirmed) {
      setMeetings(meetings.map((m) => (m.id === meetingId ? { ...m, status: 'Annulée' } : m)));
      toast.info('Réunion annulée — étudiant notifié');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="font-semibold mb-4">Calendrier - Janvier 2025</h3>
        <div className="grid grid-cols-7 gap-2">
          {['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }, (_, i) => {
            const day = i - 2;
            const hasMeeting = [8, 10, 22, 23].includes(day);
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

      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Réunions à venir</h3>
        {upcomingMeetings.map((meeting) => (
          <div key={meeting.id} className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">{meeting.title}</h3>
                <p className="text-sm text-gray-600 mb-2">Étudiant: {meeting.studentName}</p>
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
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    meeting.status === 'Confirmée'
                      ? 'bg-green-100 text-green-700'
                      : meeting.status === 'Annulée'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {meeting.status}
                </span>
                {meeting.status === 'Confirmée' && (
                  <button
                    onClick={() => handleCancelMeeting(meeting.id)}
                    className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                  >
                    Annuler
                  </button>
                )}
              </div>
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
              <div className="mb-4">
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

        <h3 className="text-lg font-semibold mt-8">Réunions passées</h3>
        {pastMeetings.map((meeting) => (
          <div key={meeting.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">{meeting.title}</h3>
                <p className="text-sm text-gray-600 mb-2">Étudiant: {meeting.studentName}</p>
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

            {meeting.compteRendu ? (
              <div className="bg-white p-4 rounded-lg mb-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Compte-rendu:</h4>
                  <button
                    onClick={() => handleAddCompteRendu(meeting)}
                    className="flex items-center gap-1 text-sm text-[#1F4E79] hover:underline"
                  >
                    <Edit size={14} />
                    Modifier
                  </button>
                </div>
                <p className="text-sm text-gray-700">{meeting.compteRendu}</p>
              </div>
            ) : (
              <button
                onClick={() => handleAddCompteRendu(meeting)}
                className="px-4 py-2 bg-[#1F4E79] text-white rounded-lg hover:bg-[#163A5C] mb-3"
              >
                Ajouter compte-rendu
              </button>
            )}

            <button className="flex items-center gap-2 text-sm text-[#1F4E79] hover:underline">
              <Download size={16} />
              Télécharger compte-rendu
            </button>
          </div>
        ))}
      </div>

      {showCompteRenduModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-xl font-semibold mb-4">
              {selectedMeeting?.compteRendu ? 'Modifier le' : 'Ajouter un'} compte-rendu
            </h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Réunion: {selectedMeeting?.title}</p>
              <p className="text-sm text-gray-600">Étudiant: {selectedMeeting?.studentName}</p>
            </div>
            <textarea
              value={compteRenduText}
              onChange={(e) => setCompteRenduText(e.target.value)}
              rows={8}
              placeholder="Saisissez le compte-rendu de la réunion..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79]"
            ></textarea>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowCompteRenduModal(false);
                  setSelectedMeeting(null);
                  setCompteRenduText('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveCompteRendu}
                className="flex-1 px-4 py-2 bg-[#1F4E79] text-white rounded-lg hover:bg-[#163A5C]"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
