import { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: number;
  text: string;
  sender: 'student' | 'supervisor';
  time: string;
}

export function EtudiantMessagerie() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Bonjour Dr. Trabelsi, j\'ai terminé le diagramme de classes', sender: 'student', time: '10:30' },
    { id: 2, text: 'Très bien Ahmed. Pouvez-vous me l\'envoyer?', sender: 'supervisor', time: '10:32' },
    { id: 3, text: 'Oui, je l\'ai soumis dans les tâches', sender: 'student', time: '10:33' },
    { id: 4, text: 'Parfait, je vais le consulter maintenant', sender: 'supervisor', time: '10:35' },
    { id: 5, text: 'Merci!', sender: 'student', time: '10:36' },
    { id: 6, text: 'J\'ai une question sur l\'architecture système', sender: 'student', time: '14:20' },
    { id: 7, text: 'Oui, dites-moi', sender: 'supervisor', time: '14:22' },
    { id: 8, text: 'Pour la partie microservices, dois-je utiliser Docker?', sender: 'student', time: '14:23' },
    { id: 9, text: 'Oui, c\'est une bonne approche. Assurez-vous de bien documenter', sender: 'supervisor', time: '14:25' },
    { id: 10, text: 'D\'accord, je vais faire ça. Merci beaucoup!', sender: 'student', time: '14:27' },
    { id: 11, text: 'N\'oubliez pas notre réunion de demain à 10h', sender: 'supervisor', time: '16:45' },
    { id: 12, text: 'Oui, je serai là. À demain!', sender: 'student', time: '16:47' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: newMessage,
          sender: 'student',
          time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setNewMessage('');
    }
  };

  const handleAttachment = () => {
    toast.info('Fonctionnalité d\'attachement disponible: PDF, Image, Document');
  };

  return (
    <div className="grid grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
      <div className="col-span-1 bg-white rounded-lg border border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold">Conversations</h3>
        </div>
        <div className="p-2">
          <div className="p-3 bg-[#1F4E79] text-white rounded-lg cursor-pointer">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-full bg-white text-[#1F4E79] flex items-center justify-center font-medium">
                ST
              </div>
              <div className="flex-1">
                <p className="font-medium">Dr. Sonia Trabelsi</p>
                <p className="text-sm opacity-90 truncate">N'oubliez pas notre réunion...</p>
              </div>
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">2</span>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-3 bg-white rounded-lg border border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1F4E79] flex items-center justify-center text-white">
            ST
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Dr. Sonia Trabelsi</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-500">En ligne</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-md rounded-lg p-3 ${
                  message.sender === 'student' ? 'bg-[#1F4E79] text-white' : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p>{message.text}</p>
                <p
                  className={`text-xs mt-1 ${message.sender === 'student' ? 'text-blue-100' : 'text-gray-500'}`}
                >
                  {message.time}
                </p>
              </div>
            </div>
          ))}
          <div className="flex justify-start">
            <p className="text-sm text-gray-500 italic">En train d'écrire...</p>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <button
              onClick={handleAttachment}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tapez votre message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79]"
            />
            <button
              onClick={handleSend}
              className="p-2 bg-[#1F4E79] text-white rounded-lg hover:bg-[#163A5C]"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
