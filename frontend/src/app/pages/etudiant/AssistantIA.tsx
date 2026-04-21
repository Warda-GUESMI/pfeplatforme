import { useState } from 'react';
import { Sparkles, Wand2, FileText, CheckSquare, Users, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface GeneratedItem {
  id: number;
  type: string;
  content: string;
}

export function EtudiantAssistantIA() {
  const [prompt, setPrompt] = useState('');
  const [generationType, setGenerationType] = useState<'taches' | 'user-stories' | 'specifications'>('taches');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItems, setGeneratedItems] = useState<GeneratedItem[]>([]);
  const [projectContext] = useState({
    title: 'Développement d\'une plateforme e-learning avec IA',
    jalon: 'Conception',
    technologies: ['React', 'Node.js', 'MongoDB', 'TensorFlow'],
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Veuillez saisir une description');
      return;
    }

    setIsGenerating(true);
    setGeneratedItems([]);

    // Simulation d'appel API IA
    await new Promise((resolve) => setTimeout(resolve, 2000));

    let items: GeneratedItem[] = [];

    if (generationType === 'taches') {
      items = [
        { id: 1, type: 'Haute', content: 'Concevoir le schéma de base de données pour les cours et utilisateurs' },
        { id: 2, type: 'Haute', content: 'Développer l\'API REST pour la gestion des utilisateurs' },
        { id: 3, type: 'Normale', content: 'Implémenter le système d\'authentification JWT' },
        { id: 4, type: 'Normale', content: 'Créer les interfaces pour l\'inscription et connexion' },
        { id: 5, type: 'Faible', content: 'Ajouter la validation des formulaires côté client' },
        { id: 6, type: 'Haute', content: 'Intégrer le modèle IA pour les recommandations de cours' },
      ];
    } else if (generationType === 'user-stories') {
      items = [
        { id: 1, type: 'User Story', content: 'En tant qu\'étudiant, je veux pouvoir m\'inscrire sur la plateforme pour accéder aux cours' },
        { id: 2, type: 'User Story', content: 'En tant qu\'enseignant, je veux créer et gérer mes cours pour partager du contenu avec les étudiants' },
        { id: 3, type: 'User Story', content: 'En tant qu\'étudiant, je veux recevoir des recommandations de cours basées sur mon profil et mes intérêts' },
        { id: 4, type: 'User Story', content: 'En tant qu\'utilisateur, je veux pouvoir suivre ma progression dans chaque cours' },
        { id: 5, type: 'User Story', content: 'En tant qu\'enseignant, je veux analyser les performances de mes étudiants via des tableaux de bord' },
      ];
    } else {
      items = [
        { id: 1, type: 'Fonctionnelle', content: 'Le système doit permettre l\'authentification par email et mot de passe avec vérification en deux étapes' },
        { id: 2, type: 'Fonctionnelle', content: 'Le système doit recommander des cours en utilisant un algorithme de machine learning basé sur les préférences utilisateur' },
        { id: 3, type: 'Technique', content: 'L\'architecture backend doit être développée en Node.js avec Express et MongoDB' },
        { id: 4, type: 'Performance', content: 'Le temps de réponse de l\'API ne doit pas dépasser 200ms pour 95% des requêtes' },
        { id: 5, type: 'Sécurité', content: 'Toutes les données sensibles doivent être chiffrées en transit (HTTPS) et au repos (AES-256)' },
      ];
    }

    setGeneratedItems(items);
    setIsGenerating(false);
    toast.success('Génération terminée avec succès');
  };

  const getTypeColor = (type: string) => {
    if (type === 'Haute' || type === 'Critique') return 'bg-red-100 text-red-700';
    if (type === 'Normale') return 'bg-blue-100 text-blue-700';
    if (type === 'Faible') return 'bg-gray-100 text-gray-700';
    if (type === 'User Story') return 'bg-purple-100 text-purple-700';
    if (type === 'Fonctionnelle') return 'bg-green-100 text-green-700';
    if (type === 'Technique') return 'bg-indigo-100 text-indigo-700';
    if (type === 'Performance') return 'bg-orange-100 text-orange-700';
    if (type === 'Sécurité') return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#1F4E79] to-[#1D9E75] rounded-lg p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles size={32} />
          <h2 className="text-2xl font-bold">Assistant IA pour votre PFE</h2>
        </div>
        <p className="text-blue-100">
          Générez automatiquement des tâches, user stories et spécifications pour accélérer votre projet
        </p>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="font-semibold mb-3">Contexte du projet</h3>
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <p className="font-medium text-gray-800">{projectContext.title}</p>
          <p className="text-sm text-gray-600 mt-1">Jalon actuel: {projectContext.jalon}</p>
          <div className="flex gap-2 mt-2">
            {projectContext.technologies.map((tech) => (
              <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="font-semibold mb-4">Générer avec l'IA</h3>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            onClick={() => setGenerationType('taches')}
            className={`p-4 rounded-lg border-2 transition-all ${
              generationType === 'taches'
                ? 'border-[#1F4E79] bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <CheckSquare size={24} className={generationType === 'taches' ? 'text-[#1F4E79]' : 'text-gray-600'} />
            <p className="font-medium mt-2">Tâches</p>
            <p className="text-xs text-gray-500">Générer des tâches détaillées</p>
          </button>

          <button
            onClick={() => setGenerationType('user-stories')}
            className={`p-4 rounded-lg border-2 transition-all ${
              generationType === 'user-stories'
                ? 'border-[#1F4E79] bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Users size={24} className={generationType === 'user-stories' ? 'text-[#1F4E79]' : 'text-gray-600'} />
            <p className="font-medium mt-2">User Stories</p>
            <p className="text-xs text-gray-500">Créer des user stories</p>
          </button>

          <button
            onClick={() => setGenerationType('specifications')}
            className={`p-4 rounded-lg border-2 transition-all ${
              generationType === 'specifications'
                ? 'border-[#1F4E79] bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <FileText size={24} className={generationType === 'specifications' ? 'text-[#1F4E79]' : 'text-gray-600'} />
            <p className="font-medium mt-2">Spécifications</p>
            <p className="text-xs text-gray-500">Rédiger des specs techniques</p>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Décrivez ce que vous voulez générer
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              placeholder={
                generationType === 'taches'
                  ? 'Ex: Générer les tâches pour créer un système d\'authentification avec email et mot de passe'
                  : generationType === 'user-stories'
                  ? 'Ex: Créer des user stories pour un système de gestion de cours en ligne'
                  : 'Ex: Rédiger les spécifications pour une API REST de gestion des utilisateurs'
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79]"
            ></textarea>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#1F4E79] text-white rounded-lg hover:bg-[#163A5C] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Génération en cours...
              </>
            ) : (
              <>
                <Wand2 size={20} />
                Générer avec l'IA
              </>
            )}
          </button>
        </div>
      </div>

      {generatedItems.length > 0 && (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">
              Résultats générés ({generatedItems.length}{' '}
              {generationType === 'taches'
                ? 'tâches'
                : generationType === 'user-stories'
                ? 'user stories'
                : 'spécifications'}
              )
            </h3>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Ajouter toutes au projet
            </button>
          </div>

          <div className="space-y-3">
            {generatedItems.map((item) => (
              <div key={item.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(item.type)}`}>
                        {item.type}
                      </span>
                    </div>
                    <p className="text-gray-800">{item.content}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                      Modifier
                    </button>
                    <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200">
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">💡 Conseils pour de meilleurs résultats</h4>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Soyez précis dans votre description</li>
          <li>Mentionnez les technologies utilisées si pertinent</li>
          <li>Indiquez le niveau de détail souhaité</li>
          <li>Relisez et adaptez les résultats à votre projet</li>
        </ul>
      </div>
    </div>
  );
}
