"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"
import { motion } from "framer-motion"

const data = [
  { name: "Jan", employés: 5 },
  { name: "Fév", employés: 7 },
  { name: "Mar", employés: 9 },
  { name: "Avr", employés: 12 },
  { name: "Mai", employés: 15 },
]

export default function EmployeeChart() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="w-full">
      <Card className="w-full h-full">
        <CardContent className="p-6 w-full h-full">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Évolution des employés</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="employés" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}
