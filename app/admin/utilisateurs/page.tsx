import { columns, User } from "@/app/admin/emploi-du-temps/culumns/columns"
import { DataTable } from "./data-table/data-table"

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

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}