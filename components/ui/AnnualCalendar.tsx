"use client"

import { useState } from "react"
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css'
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function AnnualCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  const handleDateChange = (value: Date | Date[]) => {
    if (value instanceof Date) setSelectedDate(value)
    else if (Array.isArray(value) && value[0] instanceof Date) setSelectedDate(value[0])
    else setSelectedDate(null)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="w-full">
      <Card className="w-full h-full">
        <CardContent className="p-6 w-full h-full">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Calendrier annuel</h2>
          <div className="w-full flex justify-center">
            <Calendar onChange={handleDateChange} value={selectedDate} className="rounded-lg p-2 shadow border" />
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Date sélectionnée : {selectedDate ? selectedDate.toLocaleDateString() : "Aucune"}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
