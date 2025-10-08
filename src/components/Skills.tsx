"use client";
import { FC } from "react";
import { FaJava, FaReact, FaDatabase, FaDocker, FaGitAlt, FaLinux } from "react-icons/fa";
import { SiJenkins, SiAnsible, SiKubernetes, SiTypescript, SiTailwindcss, SiRedux } from "react-icons/si";

const Skills: FC = () => (
  <section id="skills" className="py-20 px-4 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-950 relative overflow-hidden">
    {/* Background grid */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />
    </div>

    <div className="max-w-6xl mx-auto relative z-10">
      {/* Title */}
      <div className="text-center mb-12">
        <h3 className="text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Compétences
        </h3>
        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
      </div>

      {/* Main Skills Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {/* Java / Spring Boot */}
        <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-orange-500/20 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <FaJava className="text-5xl mb-3 text-orange-500 group-hover:scale-110 transition-transform" />
            <p className="font-semibold text-lg text-white">Java / Spring Boot</p>
          </div>
        </div>

        {/* React / JS */}
        <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <FaReact className="text-5xl mb-3 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
            <p className="font-semibold text-lg text-white">React / JS</p>
          </div>
        </div>

        {/* PostgreSQL / MySQL */}
        <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <FaDatabase className="text-5xl mb-3 text-blue-400 group-hover:scale-110 transition-transform" />
            <p className="font-semibold text-lg text-white">PostgreSQL / MySQL</p>
          </div>
        </div>

        {/* Docker / CI/CD */}
        <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-blue-400/20 rounded-xl p-6 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-400/20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <FaDocker className="text-5xl mb-3 text-blue-400 group-hover:scale-110 transition-transform" />
            <p className="font-semibold text-lg text-white">Docker / CI/CD</p>
          </div>
        </div>

        {/* Ansible */}
        <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <SiAnsible className="text-5xl mb-3 text-red-500 group-hover:scale-110 transition-transform" />
            <p className="font-semibold text-lg text-white">Ansible</p>
          </div>
        </div>

        {/* Jenkins */}
        <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-red-400/20 rounded-xl p-6 hover:border-red-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-400/20">
          <div className="absolute inset-0 bg-gradient-to-br from-red-400/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <SiJenkins className="text-5xl mb-3 text-red-400 group-hover:scale-110 transition-transform" />
            <p className="font-semibold text-lg text-white">Jenkins</p>
          </div>
        </div>

        {/* Kubernetes */}
        <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 col-span-2 md:col-span-2">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <SiKubernetes className="text-5xl mb-3 text-blue-500 group-hover:rotate-180 transition-transform duration-700" />
            <p className="font-semibold text-lg text-white">Kubernetes</p>
          </div>
        </div>
      </div>

      {/* Secondary Skills Tags */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent blur-xl"></div>
        <div className="relative bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8">
          <h4 className="text-center text-lg font-semibold text-cyan-400 mb-6">Technologies & Outils</h4>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="group px-4 py-2 bg-gradient-to-r from-blue-800/50 to-blue-900/50 border border-blue-500/30 rounded-full text-sm text-blue-200 hover:border-blue-400 hover:scale-105 transition-all duration-200 cursor-default flex items-center gap-2">
              <FaDatabase className="text-blue-400" />
              API REST
            </span>
            <span className="group px-4 py-2 bg-gradient-to-r from-purple-800/50 to-purple-900/50 border border-purple-500/30 rounded-full text-sm text-purple-200 hover:border-purple-400 hover:scale-105 transition-all duration-200 cursor-default flex items-center gap-2">
              <SiRedux className="text-purple-400" />
              Redux
            </span>
            <span className="group px-4 py-2 bg-gradient-to-r from-cyan-800/50 to-cyan-900/50 border border-cyan-500/30 rounded-full text-sm text-cyan-200 hover:border-cyan-400 hover:scale-105 transition-all duration-200 cursor-default flex items-center gap-2">
              <SiTailwindcss className="text-cyan-400" />
              TailwindCSS
            </span>
            <span className="group px-4 py-2 bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-gray-500/30 rounded-full text-sm text-gray-200 hover:border-gray-400 hover:scale-105 transition-all duration-200 cursor-default flex items-center gap-2">
              <FaGitAlt className="text-orange-400" />
              Git / GitHub
            </span>
            <span className="group px-4 py-2 bg-gradient-to-r from-pink-800/50 to-pink-900/50 border border-pink-500/30 rounded-full text-sm text-pink-200 hover:border-pink-400 hover:scale-105 transition-all duration-200 cursor-default">
              Test Unitaire
            </span>
            <span className="group px-4 py-2 bg-gradient-to-r from-blue-600/50 to-blue-700/50 border border-blue-500/30 rounded-full text-sm text-blue-200 hover:border-blue-400 hover:scale-105 transition-all duration-200 cursor-default flex items-center gap-2">
              <SiTypescript className="text-blue-400" />
              TypeScript
            </span>
            <span className="group px-4 py-2 bg-gradient-to-r from-gray-600/50 to-gray-700/50 border border-gray-500/30 rounded-full text-sm text-gray-200 hover:border-gray-400 hover:scale-105 transition-all duration-200 cursor-default flex items-center gap-2">
              <FaLinux className="text-yellow-400" />
              Linux
            </span>
            <span className="group px-4 py-2 bg-gradient-to-r from-orange-600/50 to-orange-700/50 border border-orange-500/30 rounded-full text-sm text-orange-200 hover:border-orange-400 hover:scale-105 transition-all duration-200 cursor-default flex items-center gap-2">
              <SiAnsible className="text-red-400" />
              Ansible
            </span>
            <span className="group px-4 py-2 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-500/30 rounded-full text-sm text-gray-200 hover:border-gray-400 hover:scale-105 transition-all duration-200 cursor-default flex items-center gap-2">
              <SiJenkins className="text-red-400" />
              Jenkins
            </span>
            <span className="group px-4 py-2 bg-gradient-to-r from-sky-800/50 to-sky-900/50 border border-sky-500/30 rounded-full text-sm text-sky-200 hover:border-sky-400 hover:scale-105 transition-all duration-200 cursor-default flex items-center gap-2">
              <SiKubernetes className="text-blue-400" />
              Kubernetes
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Skills;
