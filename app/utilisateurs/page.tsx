"use client"

import { useEffect, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/ui/data-table"
import { useAppStore } from "@/store/useAppStore"
import { Admin } from "@/types"
import {
  UserPlus,
  Trash2,
  // Removed 'Mail' as it's not used in JSX
  // Removed 'User' as it's not used in JSX
  X,
  Shield,
  AlertTriangle
} from "lucide-react"

export default function UtilisateursPage() {
  const { admins, addAdmin, deleteAdmin, initializeData } = useAppStore()
  const [showAddForm, setShowAddForm] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  // Définir les rôles valides pour le formulaire d'ajout
  const validRolesForForm = ['admin', 'manager'] as const;
  type FormRoleType = typeof validRolesForForm[number]; // Type 'admin' | 'manager'

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    // Utiliser le type FormRoleType pour le rôle du formulaire
    role: 'admin' as FormRoleType
  })

  console.log('Admin users page rendering with', admins.length, 'admins');

  useEffect(() => {
    console.log('Initializing admin users data');
    initializeData()
  }, [initializeData])

  const columns: ColumnDef<Admin>[] = [
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
      accessorKey: "role",
      header: "Rôle",
      cell: ({ row }) => {
        const role = row.original.role;
        const colors = {
          super_admin: "bg-red-100 text-red-800",
          admin: "bg-blue-100 text-blue-800",
          manager: "bg-green-100 text-green-800"
        };
        const labels = {
          super_admin: "Super Admin",
          admin: "Administrateur",
          manager: "Manager"
        };
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[role]}`}>
            <Shield className="w-3 h-3 mr-1" />
            {labels[role]}
          </span>
        );
      },
    },
    {
      accessorKey: "statut",
      header: "Statut",
      cell: ({ row }) => {
        const statut = row.original.statut;
        const colors = {
          actif: "bg-green-100 text-green-800",
          inactif: "bg-red-100 text-red-800"
        };
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[statut]}`}>
            {statut}
          </span>
        );
      },
    },
    {
      accessorKey: "dateCreation",
      header: "Date de création",
      cell: ({ row }) => {
        const date = new Date(row.original.dateCreation);
        return date.toLocaleDateString('fr-FR');
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
            console.log('Deleting admin:', row.original.id);
            setShowDeleteConfirm(row.original.id);
          }}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
          disabled={row.original.role === 'super_admin'}
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Supprimer
        </Button>
      ),
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding new admin:', formData);

    addAdmin({
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      role: formData.role, // Ce rôle est déjà typé correctement maintenant
      statut: 'actif'
    });

    setFormData({
      nom: '',
      prenom: '',
      email: '',
      motDePasse: '',
      role: 'admin'
    });
    setShowAddForm(false);
  };

  const handleDelete = (adminId: string) => {
    console.log('Confirming admin deletion:', adminId);
    deleteAdmin(adminId);
    setShowDeleteConfirm(null);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Administrateurs</h1>
          <p className="text-gray-600">Gérez les comptes administrateurs de votre entreprise</p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Ajouter un administrateur
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <DataTable
          columns={columns}
          data={admins}
          searchPlaceholder="Rechercher un administrateur..."
        />
      </div>

      {/* Modal d'ajout d'administrateur */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Ajouter un administrateur</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom
                </label>
                <Input
                  type="text"
                  value={formData.prenom}
                  onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                  required
                  placeholder="Prénom"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <Input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData({...formData, nom: e.target.value})}
                  required
                  placeholder="Nom"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  placeholder="email@entreprise.ga"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <Input
                  type="password"
                  value={formData.motDePasse}
                  onChange={(e) => setFormData({...formData, motDePasse: e.target.value})}
                  required
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rôle
                </label>
                <select
                  value={formData.role}
                  // Correction de l'erreur 'any'
                  onChange={(e) => {
                    const newRole = e.target.value;
                    // Vérifier si la nouvelle valeur fait partie des rôles valides définis
                    if (validRolesForForm.includes(newRole as FormRoleType)) {
                      setFormData({...formData, role: newRole as FormRoleType});
                    } else {
                      // Gérer le cas où une valeur inattendue serait reçue (normalement impossible avec un select)
                      console.warn(`Rôle invalide sélectionné: ${newRole}`);
                      setFormData({...formData, role: 'admin'}); // Revenir à un rôle par défaut
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="admin">Administrateur</option>
                  <option value="manager">Manager</option>
                  {/* Ne pas inclure 'super_admin' ici car il n'est pas censé être assigné via ce formulaire */}
                </select>
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
                  Ajouter
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de confirmation de suppression */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Confirmer la suppression</h2>
            </div>

            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer cet administrateur ? Cette action est irréversible.
            </p>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}