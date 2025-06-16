"use client"

import Link from "next/link"
import { ArrowLeftCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Oups&nbsp;! Cette page n&apos;existe pas.</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition"
      >
        <ArrowLeftCircle className="w-5 h-5" />
        Retour &agrave; l&apos;accueil
      </Link>
    </div>
  )
}