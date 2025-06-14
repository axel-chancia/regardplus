"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Trash2, Pencil } from "lucide-react"
import { Checkbox } from "@/app/admin/emploi-du-temps/utilisateurscomponents/ui/checkbox"
import { Button } from "@/app/admin/emploi-du-temps/utilisateurscomponents/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/admin/emploi-du-temps/utilisateurscomponents/ui/dropdown-menu"
import { Badge } from "@/app/admin/emploi-du-temps/utilisateurscomponents/ui/badge"

// -----------------------------
// Type
// -----------------------------
export type GroupSchedule = {
  id: string
  nom: string
  periode: {
    debut: string // ISO 8601 date (YYYY-MM-DD)
    fin: string   // ISO 8601 date (YYYY-MM-DD)
  }
  nombre: number
  status: "encours" | "terminé" | "avenir"
  heure: "matin" | "soir"
}

// -----------------------------
// Helper to render status badge
// -----------------------------
const StatusBadge = ({ status }: { status: GroupSchedule["status"] }) => {
  const color =
    status === "encours"
      ? "bg-yellow-100 text-yellow-800"
      : status === "terminé"
      ? "bg-green-100 text-green-800"
      : "bg-blue-100 text-blue-800"

  return <Badge className={color + " capitalize"}>{status}</Badge>
}

// -----------------------------
// Columns definition
// -----------------------------
export const columns: ColumnDef<GroupSchedule>[] = [
  // Checkbox select column
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // ID
  {
    accessorKey: "id",
    header: "ID",
  },
  // Nom du groupe
  {
    accessorKey: "nom",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Nom du groupe<ArrowUpDown className="ml-2 h-4 w-4" /></Button>
    ),
  },
  // Période (début - fin)
  {
    id: "periode",
    header: "Période",
    accessorFn: row => `${row.periode.debut} → ${row.periode.fin}`,
  },
  // Nombre de personnes
  {
    accessorKey: "nombre",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}># Personnes<ArrowUpDown className="ml-2 h-4 w-4" /></Button>
    ),
  },
  // Status
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ cell }) => <StatusBadge status={cell.getValue() as GroupSchedule["status"]} />,
  },
  // Heure (matin/soir)
  {
    accessorKey: "heure",
    header: "Heure",
    cell: ({ cell }) => <span className="capitalize">{cell.getValue() as string}</span>,
  },
  // Actions
  {
    id: "actions",
    cell: ({ row }) => {
      const group = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(group.id)}>
              Copier l&aposID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log("MODIFY", group)}>
              <Pencil className="mr-2 h-4 w-4" /> Modifier
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600"
              onClick={() => console.log("DELETE", group)}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
