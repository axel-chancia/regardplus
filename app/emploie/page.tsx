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
  heure: string;
};

export default function EmploiDuTempsFormulaire() {
  const [formData, setFormData] = useState<DonneeEmploi>({
    nom: '',
    dateArrivee: '',
    dateDepart: '',
    jour: '',
    nbTravailleurs: 1,
    fuseau: 'Africa/Libreville',
    equipe: 'Matin',
    duree: '',
    heure: '',
  });

  const calculerDuree = (arrivee: string, depart: string) => {
    const debut = new Date(arrivee);
    const fin = new Date(depart);
    const diff = fin.getTime() - debut.getTime();
    if (isNaN(diff) || diff < 0) return '';
    const heures = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    return `${heures}h ${minutes > 0 ? minutes + 'min' : ''}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    if (name === 'dateArrivee' || name === 'dateDepart') {
      updatedData.duree = calculerDuree(updatedData.dateArrivee, updatedData.dateDepart);
    }
    setFormData(updatedData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const debut = new Date(formData.dateArrivee);
    const fin = new Date(formData.dateDepart);
    const diffMs = fin.getTime() - debut.getTime();
    const heures = diffMs / 1000 / 60 / 60;

    if (isNaN(heures) || heures < 0) {
      alert("Dates invalides. Vérifie l'heure d'arrivée et de départ.");
      return;
    }

    if (heures < 4) {
      alert(`Durée de travail insuffisante : ${Math.floor(heures)}h. Minimum requis : 4h.`);
      return;
    }

    console.log('Données soumises :', formData);
    alert('Formulaire soumis ! Durée de travail respectée.');
  };

  const heuresDisponibles = Array.from({ length: 33 }, (_, i) => {
    const heures = Math.floor(i / 2) + 8;
    const minutes = i % 2 === 0 ? '00' : '30';
    return `${heures.toString().padStart(2, '0')}:${minutes}`;
  });

  return (
    <div className="w-[800px] min-h-[400px] p-6 border-4 border-blue-500 rounded-lg bg-gray-50 text-gray-800 mx-auto">
      <h2 className="text-xl text-blue-500 font-bold mb-6 text-center">Formulaire d'emploi du temps</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-11">
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
          <option value="Africa/Libreville">Africa/Libreville (Gabon)</option>
          <option value="Europe/Paris">Europe/Paris</option>
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

        <select
          name="heure"
          value={formData.heure}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="">-- Heure de début --</option>
          {heuresDisponibles.map((heure) => (
            <option key={heure} value={heure}>
              {heure}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="col-span-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}