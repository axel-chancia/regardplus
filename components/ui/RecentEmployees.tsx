"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function RecentEmployees() {
  const employees = [
    { name: "Awa Ndiaye", dept: "Marketing" },
    { name: "Mamadou Fall", dept: "Développement" },
    { name: "Binta Sow", dept: "Finance" },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="w-full">
      <Card className="w-full h-full">
        <CardContent className="p-6 w-full h-full">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Derniers employés ajoutés</h2>
          <ul className="divide-y divide-gray-200 text-sm text-gray-700">
            {employees.map((emp, idx) => (
              <li key={idx} className="py-3 flex justify-between">
                <span>👤 {emp.name}</span>
                <span className="text-gray-400">{emp.dept}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}
