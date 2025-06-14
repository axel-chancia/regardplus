"use client"

import React from "react"
import { DataTable } from "@/app/admin/emploi-du-temps/data-table/data-table"        // adapte le chemin si besoin
import { columns, GroupSchedule } from "@/app/admin/emploi-du-temps/culumns/columns" // adapte le chemin si besoin

// Exemple de données statiques (à remplacer par ton fetch API ou autre)
const data: GroupSchedule[] = [
  {
    id: "1",
    nom: "Groupe Alpha",
    periode: { debut: "2025-01-01", fin: "2025-01-15" },
    nombre: 12,
    status: "encours",
    heure: "matin",
  },
  {
    id: "2",
    nom: "Groupe Beta",
    periode: { debut: "2025-02-01", fin: "2025-02-10" },
    nombre: 8,
    status: "terminé",
    heure: "soir",
  },
  {
    id: "3",
    nom: "Groupe Gamma",
    periode: { debut: "2025-03-05", fin: "2025-03-20" },
    nombre: 15,
    status: "avenir",
    heure: "matin",
  },
]

export default function AdminEmploiDuTempsPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Gestion des Groupes</h1>
      <DataTable columns={columns} data={data} />
    </main>
  )
}
