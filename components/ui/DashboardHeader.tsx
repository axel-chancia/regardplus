"use client"

import { motion } from "framer-motion"

export default function DashboardHeader() {
  return (
    <div className="w-full">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-gray-800"
      >
        Tableau de bord
      </motion.h1>
      <p className="text-sm text-gray-500">Vue d&apos;ensemble des activit&eacute;s de l&rsquo;entreprise</p>
    </div>
  )
}