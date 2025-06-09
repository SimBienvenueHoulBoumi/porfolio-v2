"use client";
import { FC } from "react";

const Skills: FC = () => (
  <section id="skills" className="py-16 px-4 bg-gray-950">
    <div className="max-w-5xl mx-auto fade-in">
      <h3 className="text-3xl font-bold mb-8 text-blue-400">Compétences</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <span className="text-5xl mb-2 inline-block">☕</span>
          <p className="font-semibold text-lg">Java / Spring Boot</p>
        </div>
        <div>
          <span className="text-5xl mb-2 inline-block">⚛️</span>
          <p className="font-semibold text-lg">React / JS</p>
        </div>
        <div>
          <span className="text-5xl mb-2 inline-block">🐘</span>
          <p className="font-semibold text-lg">PostgreSQL / MySQL</p>
        </div>
        <div>
          <span className="text-5xl mb-2 inline-block">☁️</span>
          <p className="font-semibold text-lg">Docker / CI/CD</p>
        </div>
        <div>
          <span className="text-5xl mb-2 inline-block">🤖</span>
          <p className="font-semibold text-lg">Ansible</p>
        </div>
        <div>
          <span className="text-5xl mb-2 inline-block">🛠️</span>
          <p className="font-semibold text-lg">Jenkins</p>
        </div>
        <div>
          <span className="text-5xl mb-2 inline-block opacity-60">⏳</span>
          <p className="font-semibold text-lg text-gray-400">
            Kubernetes
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gradient-to-r from-sky-700 via-sky-500 to-sky-300 text-white opacity-70">
              bientôt
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-10 gap-4">
        <span className="px-4 py-1 bg-blue-800 rounded-full text-sm">API REST</span>
        <span className="px-4 py-1 bg-gray-800 rounded-full text-sm">Redux</span>
        <span className="px-4 py-1 bg-indigo-700 rounded-full text-sm">TailwindCSS</span>
        <span className="px-4 py-1 bg-gray-700 rounded-full text-sm">Git / GitHub</span>
        <span className="px-4 py-1 bg-pink-800 rounded-full text-sm">Test Unitaire</span>
        <span className="px-4 py-1 bg-blue-600 rounded-full text-sm">TypeScript</span>
        <span className="px-4 py-1 bg-gray-600 rounded-full text-sm">Linux</span>
        <span className="px-4 py-1 bg-orange-600 rounded-full text-sm">Ansible</span>
        <span className="px-4 py-1 bg-gray-800 rounded-full text-sm">Jenkins</span>
        <span className="px-4 py-1 bg-sky-800 rounded-full text-sm opacity-60">Kubernetes (à venir)</span>
      </div>
    </div>
  </section>
);

export default Skills;
