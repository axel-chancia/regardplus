"use client"

import { motion } from "framer-motion"

export default function DashboardHeader() {
  return (
    <div className="w-full flex flex-col space-y-2">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-gray-800"
      >
        Tableau de bord
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-sm text-gray-500"
      >
        Vue d'ensemble des activités de l’entreprise
      </motion.p>
    </div>
  )
}
