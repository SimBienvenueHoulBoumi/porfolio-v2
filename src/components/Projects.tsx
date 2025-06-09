"use client";
import { FC } from "react";

const Projects: FC = () => (
  <section id="projects" className="py-16 px-4 bg-gradient-to-br from-gray-950 to-gray-900">
    <div className="max-w-5xl mx-auto fade-in">
      <h3 className="text-3xl font-bold mb-8 text-blue-400">Projets phares</h3>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="rounded-2xl bg-gray-800 shadow-lg p-6 hover:scale-105 transition-all duration-500 border border-gray-700">
          <h4 className="text-xl font-bold text-white mb-2">Plateforme SaaS de gestion RH</h4>
          <p className="text-gray-300 mb-3">Application de gestion du personnel avec authentification OAuth2, export PDF, tableaux dynamiques.</p>
          <div className="flex gap-2 flex-wrap mb-2">
            <span className="bg-blue-700 px-2 rounded text-xs">Spring Boot</span>
            <span className="bg-blue-500 px-2 rounded text-xs">React</span>
            <span className="bg-indigo-700 px-2 rounded text-xs">TailwindCSS</span>
            <span className="bg-gray-700 px-2 rounded text-xs">PostgreSQL</span>
          </div>
          <a href="#" className="text-blue-400 hover:underline text-sm">Voir le projet</a>
        </div>
        <div className="rounded-2xl bg-gray-800 shadow-lg p-6 hover:scale-105 transition-all duration-500 border border-gray-700">
          <h4 className="text-xl font-bold text-white mb-2">Marketplace d’objets connectés</h4>
          <p className="text-gray-300 mb-3">E-commerce de devices IoT avec backoffice, paiement sécurisé, tableaux d’administration.</p>
          <div className="flex gap-2 flex-wrap mb-2">
            <span className="bg-blue-700 px-2 rounded text-xs">Java</span>
            <span className="bg-blue-500 px-2 rounded text-xs">React</span>
            <span className="bg-pink-700 px-2 rounded text-xs">Stripe API</span>
            <span className="bg-gray-700 px-2 rounded text-xs">Docker</span>
          </div>
          <a href="#" className="text-blue-400 hover:underline text-sm">Voir le projet</a>
        </div>
      </div>
    </div>
  </section>
);

export default Projects;
