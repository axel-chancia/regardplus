"use client"

import React from "react"
import { DataTable } from "@/app/admin/ajout-admin/data-table/data-table"   // adapte le chemin si besoin
import { adminColumns, Admin } from "@/app/admin/ajout-admin/culumns/columns" // adapte le chemin si besoin

const admins: Admin[] = [
  { id: "a1", email: "alice@example.com", nom: "Alice Dupont" },
  { id: "b2", email: "bob@example.com", nom: "Bob Martin" },
  { id: "c3", email: "charlie@example.com", nom: "Charlie Durand" },
]

export default function AdminEmploiDuTempsPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Gestion des Administrateurs</h1>
      <DataTable columns={adminColumns} data={admins} />
    </main>
  )
}
