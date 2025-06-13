import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function StatCard({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon: React.ReactNode
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-full h-full"
    >
      <Card className="w-full h-full">
        <CardContent className="flex justify-between items-center p-5 w-full h-full">
          <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-xl font-semibold text-gray-800">{value}</p>
          </div>
          {icon}
        </CardContent>
      </Card>
    </motion.div>
  )
}
