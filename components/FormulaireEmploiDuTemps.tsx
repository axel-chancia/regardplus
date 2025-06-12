'use client';

import { useState } from 'react';

type DonneeEmploi = {
  nom: string;
  dateArrivee: string;
  dateDepart: string;
  jour: string;
  nbTravailleurs: number;
  fuseau: string;
  equipe: 'Matin' | 'Soir';
  duree: string;
};

export default function FormulaireEmploiDuTemps() {
  const [formData, setFormData] = useState<DonneeEmploi>({
    nom: 'Marie ,luca,richard',
    dateArrivee: '2025-06-12T08:00',
    dateDepart: '2025-06-12T15:00',
    jour: 'Lundi',
    nbTravailleurs: 3,
    fuseau: 'Africa/Libreville',
    equipe: 'Matin',
    duree: '6h 0min',
  });

  // Calcule la durée automatiquement
  const calculerDuree = (arrivee: string, depart: string) => {
    const debut = new Date(arrivee);
    const fin = new Date(depart);
    const diff = fin.getTime() - debut.getTime();

    if (isNaN(diff) || diff < 0) return '';

    const heures = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);

    return `${heures}h ${minutes > 0 ? minutes + 'min' : ''}`;
  };

  // Mise à jour des champs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };

    // Recalcul de la durée si dates changent
    if (name === 'dateArrivee' || name === 'dateDepart') {
      updatedData.duree = calculerDuree(updatedData.dateArrivee, updatedData.dateDepart);
    }

    setFormData(updatedData);
  };

  // Soumission (pour test ici : console log)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Données soumises :', formData);
    alert('Formulaire soumis ! Voir console pour les données.');
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-6 text-center">Formulaire d'emploi du temps</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={formData.nom}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="jour"
          placeholder="Jour de travail (ex: lundi)"
          value={formData.jour}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="datetime-local"
          name="dateArrivee"
          value={formData.dateArrivee}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="datetime-local"
          name="dateDepart"
          value={formData.dateDepart}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="nbTravailleurs"
          placeholder="Nombre de personnes"
          value={formData.nbTravailleurs}
          onChange={handleChange}
          min={1}
          required
          className="border p-2 rounded"
        />

        <select
          name="fuseau"
          value={formData.fuseau}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Africa/Libreville">Fuseau : Africa/Libreville (Gabon)</option>
          <option value="Europe/Paris">Fuseau : Europe/Paris</option>
          <option value="UTC">UTC</option>
          <option value="Africa/Algiers">Africa/Algiers</option>
          <option value="America/New_York">America/New_York</option>
        </select>

        <select
          name="equipe"
          value={formData.equipe}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Matin">Équipe du matin</option>
          <option value="Soir">Équipe du soir</option>
        </select>

        <input
          type="text"
          name="duree"
          placeholder="Durée"
          value={formData.duree}
          readOnly
          className="border p-2 rounded bg-gray-100"
        />

        <button
          type="submit"
          className="col-span-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
