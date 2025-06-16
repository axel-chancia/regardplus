"use client"

import { useEffect, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { CustomBarChart } from "@/components/ui/bar-chart"
import { useAppStore } from "@/store/useAppStore"
import { Employee } from "@/types"
import { 
  Eye, 
  UserPlus, 
  Mail, 
  Phone, 
  Calendar,
  X,
  Badge
} from "lucide-react"

export default function EmploiesPage() {
  const { employees, selectedEmployee, setSelectedEmployee, initializeData } = useAppStore()
  const [showAddForm, setShowAddForm] = useState(false)

  console.log('Employees page rendering with', employees.length, 'employees');

  useEffect(() => {
    console.log('Initializing employees data');
    initializeData()
  }, [initializeData])

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "nom",
      header: "Nom",
      cell: ({ row }) => (
        <div className="font-medium">
          {row.original.prenom} {row.original.nom}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "poste",
      header: "Poste",
    },
    {
      accessorKey: "departement",
      header: "Département",
      cell: ({ row }) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {row.original.departement}
        </span>
      ),
    },
    {
      accessorKey: "statut",
      header: "Statut",
      cell: ({ row }) => {
        const statut = row.original.statut;
        const colors = {
          actif: "bg-green-100 text-green-800",
          inactif: "bg-red-100 text-red-800",
          conge: "bg-yellow-100 text-yellow-800"
        };
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[statut]}`}>
            {statut}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            console.log('Viewing employee details:', row.original);
            setSelectedEmployee(row.original);
          }}
        >
          <Eye className="w-4 h-4 mr-1" />
          Voir
        </Button>
      ),
    },
  ]

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Employés</h1>
          <p className="text-gray-600">Gérez et consultez les informations de vos employés</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Ajouter un employé
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <DataTable 
          columns={columns} 
          data={employees}
          searchPlaceholder="Rechercher un employé..."
        />
      </div>

      {/* Modal de détails d'employé */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedEmployee.prenom} {selectedEmployee.nom}
              </h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedEmployee(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Informations personnelles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Informations personnelles</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900">{selectedEmployee.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900">{selectedEmployee.telephone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900">{selectedEmployee.poste}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900">Embauché le {selectedEmployee.dateEmbauche}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Horaires de travail</h3>
                  <div className="space-y-2">
                    {selectedEmployee.horaires.map((horaire, index) => (
                      <div key={index} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
                        <span className="font-medium text-gray-900">{horaire.jour}</span>
                        <span className="text-gray-600">{horaire.heureDebut} - {horaire.heureFin}</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Groupe {horaire.groupe}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Graphique des performances */}
              <div>
                <CustomBarChart 
                  data={selectedEmployee.performances}
                  title="Performances mensuelles"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'ajout d'employé (placeholder) */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Ajouter un employé</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-gray-600 text-center py-8">
              Formulaire d&rsquoajout d&rsquoemployé à implémenter
            </p>
            <Button onClick={() => setShowAddForm(false)} className="w-full">
              Fermer
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}