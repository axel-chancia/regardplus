import { DataTable } from "./data-table/data-table"
import { ColumnDef } from "@tanstack/react-table"

// Définition du type User
type User = {
  id: string;
  noms: string;
  poste: string;
  email: string;
};

// Colonnes du tableau
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "noms",
    header: "Noms",
  },
  {
    accessorKey: "poste",
    header: "Poste",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];

// Fonction pour récupérer les données
async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      noms: "Moussavou Jean Pierre",
      poste: "Directeur",
      email: "m@example.com",
    },
    // ...
  ]
}

// Composant principal
export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}