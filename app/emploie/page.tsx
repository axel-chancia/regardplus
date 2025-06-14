'use client';

import { useState } from 'react';

export default function FormulaireEmploi() {
  const [formData, setFormData] = useState({
    teamName: '',
    morningTeam: '',
    eveningTeam: '',
    startDate: '',
    endDate: '',
    status: '',
    members: [] as string[],
  });
  const [newMember, setNewMember] = useState('');
  const [availableMembers, setAvailableMembers] = useState([
    'Membre 1',
    'Membre 2',
    'Membre 3',
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMemberSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions).map(opt => opt.value);
    setFormData(prev => ({ ...prev, members: options }));
  };

  const addMember = () => {
    if (newMember.trim() && !availableMembers.includes(newMember)) {
      setAvailableMembers([...availableMembers, newMember]);
      setNewMember('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Données du formulaire:', formData);
    // Ici vous pourriez ajouter la logique pour envoyer les données à votre API
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">Formulaire de Gestion d'Équipe</h1>      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nom de l'équipe */}
        <div>
          <label className="block mb-1">Nom de l'équipe*</label>
          <input
            type="text"
            name="teamName"
            value={formData.teamName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">L'équipe du jour*</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Sélectionnez...</option>
            <option value="en_cours">Matin</option>
            <option value="termine">Soir</option>
            <option value="a_venir">Nuit</option>
          </select>
        </div>
        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Date de début*</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Date de fin*</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Statut */}
        <div>
          <label className="block mb-1">Statut*</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Sélectionnez...</option>
            <option value="en_cours">En cours</option>
            <option value="termine">Terminé</option>
            <option value="a_venir">À venir</option>
          </select>
        </div>

        {/* Membres */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Membres</label>
            <select
              multiple
              size={5}
              value={formData.members}
              onChange={handleMemberSelect}
              className="w-full p-2 border rounded"
            >
              {availableMembers.map(member => (
                <option key={member} value={member}>{member}</option>
              ))}
            </select>
            <p className="text-sm text-gray-500">Maintenez Ctrl/Cmd pour sélection multiple</p>
          </div>
          <div>
            <label className="block mb-1">Ajouter un membre</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                className="flex-1 p-2 border rounded"
              />
              <button
                type="button"
                onClick={addMember}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-600"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}