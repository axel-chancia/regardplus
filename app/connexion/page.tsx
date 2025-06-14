'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Connexion() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // Ici, ajoute ta logique de connexion (API, etc.)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    alert("Connexion simulée réussie !");
  };

  return (
    <main className="flex items-center justify-center min-h-screen w-full bg-gray-50 font-sans antialiased px-4 py-6 sm:px-6 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-3xl xl:max-w-4xl rounded-2xl border border-gray-200 shadow-2xl bg-white overflow-hidden">
        {/* Formulaire */}
        <div className="flex flex-col items-center justify-center px-8 py-10">
          <div className="w-full max-w-sm">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Connectez-vous</h1>
              <p className="text-base text-gray-500 mt-2">
                Entrez vos informations pour valider votre arriv&eacute;/d&eacute;part.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                <input
                  id="id"
                  type="text"
                  placeholder="Votre ID unique"
                  required
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-gray-900 placeholder-gray-400"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="votre.email@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-gray-900 placeholder-gray-400"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                  <Link href="#" className="text-sm text-blue-600 hover:underline hover:text-blue-700 transition-colors duration-200">
                    Mot de passe oubli&eacute; ?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-gray-900 placeholder-gray-400"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">R&ocirc;le (admin/employ&eacute;)</label>
                <input
                  id="role"
                  type="text"
                  placeholder="admin ou employ&eacute;"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-gray-900 placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion...
                  </span>
                ) : (
                  "Se connecter"
                )}
              </button>
              <button
                type="button"
                className="w-full bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.24 10.27v2.44h6.66c-.24 1.48-1.54 4.08-6.66 4.08-4.04 0-7.33-3.32-7.33-7.44s3.29-7.44 7.33-7.44c2.2 0 3.63.94 4.47 1.73l2.09-2.09c-1.4-1.29-3.23-2.08-6.56-2.08-5.5 0-9.98 4.48-9.98 10s4.48 10 9.98 10c5.7 0 9.53-4.14 9.53-9.82 0-.68-.09-1.25-.21-1.8z" />
                </svg>
                Connectez-vous avec Google
              </button>
              <p className="text-sm text-center text-gray-600 mt-2">
                Vous n&rsquo;avez pas de compte ?{" "}
                <Link href="#" className="text-blue-600 hover:underline font-semibold hover:text-blue-700 transition-colors duration-200">S&apos;inscrire</Link>
              </p>
            </form>
          </div>
        </div>
        {/* Illustration */}
        <div className="hidden md:flex items-center justify-center bg-gray-100 px-6 py-8">
          <Image
           src="/case.jpeg"
           alt="Illustration de connexion"
           width={340}
           height={430}
           className="object-cover rounded-2xl shadow-xl transition-all duration-300 hover:scale-105"
           />
        </div>
      </div>
    </main>
  );
}