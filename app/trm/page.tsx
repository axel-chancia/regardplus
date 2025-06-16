"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAppStore } from "@/store/useAppStore"
import { Evenement } from "@/types"
import { 
  Calendar, 
  Plus, 
  Users,
  Clock,
  X,
  Filter
} from "lucide-react"

export default function PlanningPage() {
  const { events, employees, addEvent, initializeData } = useAppStore()
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedWeek, setSelectedWeek] = useState(new Date())
  const [filterGroup, setFilterGroup] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    date: '',
    heureDebut: '',
    heureFin: '',
    type: 'reunion' as 'reunion' | 'formation' | 'evenement' | 'conge',
    participants: [] as string[],
    couleur: '#2563EB'
  })

  console.log('Planning page rendering');

  useEffect(() => {
    console.log('Initializing planning data');
    initializeData()
  }, [initializeData])

  // Générer les jours de la semaine
  const getWeekDays = (date: Date): Date[] => {
    const week: Date[] = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Start from Monday

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDays = getWeekDays(selectedWeek);
  const dayNames = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  // Grouper les employés par groupe
  const employeeGroups = employees.reduce((groups, employee) => {
    const groupNumber = employee.horaires[0]?.groupe || 1;
    if (!groups[groupNumber]) groups[groupNumber] = [];
    groups[groupNumber].push(employee);
    return groups;
  }, {} as Record<number, Array<typeof employees[0]>>);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding new event:', formData);
    
    addEvent({
      titre: formData.titre,
      description: formData.description,
      date: formData.date,
      heureDebut: formData.heureDebut,
      heureFin: formData.heureFin,
      type: formData.type,
      participants: formData.participants,
      couleur: formData.couleur
    });

    setFormData({
      titre: '',
      description: '',
      date: '',
      heureDebut: '',
      heureFin: '',
      type: 'reunion',
      participants: [],
      couleur: '#2563EB'
    });
    setShowAddForm(false);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Planning & Calendrier</h1>
          <p className="text-gray-600">Gérez les horaires et événements de vos équipes</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={filterGroup || ''}
            onChange={(e) => setFilterGroup(e.target.value ? parseInt(e.target.value) : null)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tous les groupes</option>
            {Object.keys(employeeGroups).map(group => (
              <option key={group} value={group}>Groupe {group}</option>
            ))}
          </select>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvel événement
          </Button>
        </div>
      </div>

      {/* Navigation de semaine */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <Button
          variant="outline"
          onClick={() => {
            const newDate = new Date(selectedWeek);
            newDate.setDate(selectedWeek.getDate() - 7);
            setSelectedWeek(newDate);
          }}
        >
          ← Semaine précédente
        </Button>
        <h2 className="text-lg font-semibold text-gray-900">
          Semaine du {weekDays[0].toLocaleDateString('fr-FR')} au {weekDays[6].toLocaleDateString('fr-FR')}
        </h2>
        <Button
          variant="outline"
          onClick={() => {
            const newDate = new Date(selectedWeek);
            newDate.setDate(selectedWeek.getDate() + 7);
            setSelectedWeek(newDate);
          }}
        >
          Semaine suivante →
        </Button>
      </div>

      {/* Grille de planning par groupe */}
      <div className="space-y-6">
        {Object.entries(employeeGroups).map(([groupNumber, groupEmployees]) => {
          if (filterGroup && parseInt(groupNumber) !== filterGroup) return null;
          
          return (
            <div key={groupNumber} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Users className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Groupe {groupNumber} ({groupEmployees.length} employés)
                </h3>
              </div>
              
              <div className="grid grid-cols-8 gap-2">
                {/* En-tête */}
                <div className="font-medium text-gray-700 text-sm p-2">Employé</div>
                {dayNames.map((day, index) => (
                  <div key={day} className="font-medium text-gray-700 text-sm p-2 text-center">
                    {day}
                    <div className="text-xs text-gray-500">
                      {weekDays[index].getDate()}/{weekDays[index].getMonth() + 1}
                    </div>
                  </div>
                ))}
                
                {/* Lignes d'employés */}
                {groupEmployees.map(employee => (
                  <div key={employee.id} className="contents">
                    <div className="p-2 text-sm font-medium text-gray-900 border-t border-gray-100">
                      {employee.prenom} {employee.nom}
                    </div>
                    {employee.horaires.map((horaire, index) => (
                      <div key={index} className="p-2 border-t border-gray-100">
                        {horaire.jour !== 'Samedi' && horaire.jour !== 'Dimanche' ? (
                          <div className="text-xs bg-blue-50 text-blue-800 p-1 rounded text-center">
                            <div className="font-medium">{horaire.heureDebut}</div>
                            <div>-</div>
                            <div className="font-medium">{horaire.heureFin}</div>
                          </div>
                        ) : (
                          <div className="text-xs text-gray-400 text-center">Repos</div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Liste des événements */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Événements de la semaine</h3>
        {events.length > 0 ? (
          <div className="space-y-3">
            {events.map(event => (
              <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: event.couleur }}
                ></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{event.titre}</div>
                  <div className="text-sm text-gray-600">
                    {new Date(event.date).toLocaleDateString('fr-FR')} • {event.heureDebut} - {event.heureFin}
                  </div>
                </div>
                <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded">
                  {event.type}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">Aucun événement programmé pour cette semaine</p>
        )}
      </div>

      {/* Modal d'ajout d'événement */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Nouvel événement</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre
                </label>
                <Input
                  type="text"
                  value={formData.titre}
                  onChange={(e) => setFormData({...formData, titre: e.target.value})}
                  required
                  placeholder="Titre de l'événement"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Description de l'événement"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="reunion">Réunion</option>
                    <option value="formation">Formation</option>
                    <option value="evenement">Événement</option>
                    <option value="conge">Congé</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heure de début
                  </label>
                  <Input
                    type="time"
                    value={formData.heureDebut}
                    onChange={(e) => setFormData({...formData, heureDebut: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heure de fin
                  </label>
                  <Input
                    type="time"
                    value={formData.heureFin}
                    onChange={(e) => setFormData({...formData, heureFin: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Créer
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}