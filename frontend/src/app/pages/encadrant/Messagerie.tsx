import { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: number;
  text: string;
  sender: 'student' | 'supervisor';
  time: string;
}

interface Conversation {
  id: number;
  studentName: string;
  studentInitials: string;
  lastMessage: string;
  unreadCount: number;
  messages: Message[];
}

export function EncadrantMessagerie() {
  const [conversations] = useState<Conversation[]>([
    {
      id: 1,
      studentName: 'Ahmed Ben Salem',
      studentInitials: 'AB',
      lastMessage: 'Oui, je serai là. À demain!',
      unreadCount: 0,
      messages: [
        { id: 1, text: 'Bonjour Dr. Trabelsi, j\'ai terminé le diagramme de classes', sender: 'student', time: '10:30' },
        { id: 2, text: 'Très bien Ahmed. Pouvez-vous me l\'envoyer?', sender: 'supervisor', time: '10:32' },
        { id: 3, text: 'Oui, je l\'ai soumis dans les tâches', sender: 'student', time: '10:33' },
        { id: 4, text: 'Parfait, je vais le consulter maintenant', sender: 'supervisor', time: '10:35' },
        { id: 5, text: 'J\'ai une question sur l\'architecture système', sender: 'student', time: '14:20' },
        { id: 6, text: 'Oui, dites-moi', sender: 'supervisor', time: '14:22' },
        { id: 7, text: 'Pour la partie microservices, dois-je utiliser Docker?', sender: 'student', time: '14:23' },
        { id: 8, text: 'Oui, c\'est une bonne approche. Assurez-vous de bien documenter', sender: 'supervisor', time: '14:25' },
        { id: 9, text: 'D\'accord, je vais faire ça. Merci beaucoup!', sender: 'student', time: '14:27' },
        { id: 10, text: 'N\'oubliez pas notre réunion de demain à 10h', sender: 'supervisor', time: '16:45' },
        { id: 11, text: 'Oui, je serai là. À demain!', sender: 'student', time: '16:47' },
      ],
    },
    {
      id: 2,
      studentName: 'Fatma Riahi',
      studentInitials: 'FR',
      lastMessage: 'D\'accord, merci pour votre aide',
      unreadCount: 2,
      messages: [
        { id: 1, text: 'Bonjour, j\'ai besoin d\'aide pour le modèle ER', sender: 'student', time: '09:15' },
        { id: 2, text: 'Bonjour Fatma, quelles sont vos questions?', sender: 'supervisor', time: '09:30' },
        { id: 3, text: 'Je ne sais pas comment représenter la relation many-to-many', sender: 'student', time: '09:32' },
        { id: 4, text: 'Il faut créer une table intermédiaire. Je vous envoie un exemple', sender: 'supervisor', time: '09:35' },
        { id: 5, text: 'D\'accord, merci pour votre aide', sender: 'student', time: '09:40' },
      ],
    },
    {
      id: 3,
      studentName: 'Youssef Hamdi',
      studentInitials: 'YH',
      lastMessage: 'Les tests sont prêts',
      unreadCount: 1,
      messages: [
        { id: 1, text: 'Les tests sont prêts', sender: 'student', time: '11:20' },
      ],
    },
    {
      id: 4,
      studentName: 'Leila Mansouri',
      studentInitials: 'LM',
      lastMessage: 'Merci pour les retours',
      unreadCount: 0,
      messages: [
        { id: 1, text: 'J\'ai envoyé le dashboard', sender: 'student', time: 'Hier' },
        { id: 2, text: 'C\'est bien fait, quelques ajustements nécessaires', sender: 'supervisor', time: 'Hier' },
        { id: 3, text: 'Merci pour les retours', sender: 'student', time: 'Hier' },
      ],
    },
    {
      id: 5,
      studentName: 'Karim Bouzid',
      studentInitials: 'KB',
      lastMessage: 'Parfait, je continue',
      unreadCount: 0,
      messages: [
        { id: 1, text: 'Blockchain implémentée', sender: 'student', time: 'Il y a 2 jours' },
        { id: 2, text: 'Excellent travail!', sender: 'supervisor', time: 'Il y a 2 jours' },
        { id: 3, text: 'Parfait, je continue', sender: 'student', time: 'Il y a 2 jours' },
      ],
    },
  ]);

  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [messages, setMessages] = useState(activeConversation.messages);
  const [newMessage, setNewMessage] = useState('');

  const handleConversationClick = (conversation: Conversation) => {
    setActiveConversation(conversation);
    setMessages(conversation.messages);
  };

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: newMessage,
          sender: 'supervisor',
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
          <h3 className="font-semibold">Conversations ({conversations.length})</h3>
        </div>
        <div className="p-2">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => handleConversationClick(conv)}
              className={`p-3 rounded-lg cursor-pointer mb-2 ${
                activeConversation.id === conv.id
                  ? 'bg-[#1F4E79] text-white'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3 mb-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                    activeConversation.id === conv.id
                      ? 'bg-white text-[#1F4E79]'
                      : 'bg-[#1F4E79] text-white'
                  }`}
                >
                  {conv.studentInitials}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{conv.studentName}</p>
                  <p
                    className={`text-sm truncate ${
                      activeConversation.id === conv.id ? 'opacity-90' : 'text-gray-600'
                    }`}
                  >
                    {conv.lastMessage}
                  </p>
                </div>
                {conv.unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {conv.unreadCount}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-3 bg-white rounded-lg border border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1F4E79] flex items-center justify-center text-white">
            {activeConversation.studentInitials}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{activeConversation.studentName}</h3>
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
              className={`flex ${message.sender === 'supervisor' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-md rounded-lg p-3 ${
                  message.sender === 'supervisor' ? 'bg-[#1F4E79] text-white' : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p>{message.text}</p>
                <p
                  className={`text-xs mt-1 ${message.sender === 'supervisor' ? 'text-blue-100' : 'text-gray-500'}`}
                >
                  {message.time}
                </p>
              </div>
            </div>
          ))}
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
